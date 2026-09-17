$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
[System.Windows.Forms.Application]::EnableVisualStyles()

$repoRoot = Split-Path -Parent $PSScriptRoot
$workflowScript = Join-Path $PSScriptRoot "publish-private-data.mjs"
$exceljsPath = Join-Path $repoRoot "node_modules\exceljs\package.json"

$form = New-Object System.Windows.Forms.Form
$form.Text = "Private Data Publisher"
$form.StartPosition = "CenterScreen"
$form.Size = New-Object System.Drawing.Size(760, 590)
$form.MinimumSize = New-Object System.Drawing.Size(700, 500)
$form.AutoScaleMode = [System.Windows.Forms.AutoScaleMode]::Font

$layout = New-Object System.Windows.Forms.TableLayoutPanel
$layout.Dock = [System.Windows.Forms.DockStyle]::Fill
$layout.Padding = New-Object System.Windows.Forms.Padding(14)
$layout.ColumnCount = 3
$layout.RowCount = 9
$layout.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Absolute, 155)))
$layout.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$layout.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Absolute, 105)))
foreach ($height in @(42, 42, 42, 38, 34, 42, 42, 34, 100)) {
  $layout.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Absolute, $height)))
}
$form.Controls.Add($layout)

function New-Label([string]$text) {
  $label = New-Object System.Windows.Forms.Label
  $label.Text = $text
  $label.Dock = [System.Windows.Forms.DockStyle]::Fill
  $label.TextAlign = [System.Drawing.ContentAlignment]::MiddleLeft
  return $label
}

$title = New-Object System.Windows.Forms.Label
$title.Text = "Publish encrypted private client data"
$title.Font = New-Object System.Drawing.Font($form.Font, [System.Drawing.FontStyle]::Bold)
$title.Dock = [System.Windows.Forms.DockStyle]::Fill
$title.TextAlign = [System.Drawing.ContentAlignment]::MiddleLeft
$layout.Controls.Add($title, 0, 0)
$layout.SetColumnSpan($title, 3)

$layout.Controls.Add((New-Label "Excel workbook"), 0, 1)
$inputBox = New-Object System.Windows.Forms.TextBox
$inputBox.Text = Join-Path $repoRoot "private\data.xlsx"
$inputBox.Dock = [System.Windows.Forms.DockStyle]::Fill
$layout.Controls.Add($inputBox, 1, 1)
$browseButton = New-Object System.Windows.Forms.Button
$browseButton.Text = "&Browse..."
$browseButton.Dock = [System.Windows.Forms.DockStyle]::Fill
$layout.Controls.Add($browseButton, 2, 1)

$layout.Controls.Add((New-Label "Worksheet (optional)"), 0, 2)
$sheetBox = New-Object System.Windows.Forms.TextBox
$sheetBox.Dock = [System.Windows.Forms.DockStyle]::Fill
$layout.Controls.Add($sheetBox, 1, 2)
$firstSheetButton = New-Object System.Windows.Forms.Button
$firstSheetButton.Text = "Use first sheet"
$firstSheetButton.Dock = [System.Windows.Forms.DockStyle]::Fill
$layout.Controls.Add($firstSheetButton, 2, 2)

$layout.Controls.Add((New-Label "Commit message"), 0, 3)
$messageBox = New-Object System.Windows.Forms.TextBox
$messageBox.Text = "Update encrypted client data"
$messageBox.Dock = [System.Windows.Forms.DockStyle]::Fill
$layout.Controls.Add($messageBox, 1, 3)
$layout.SetColumnSpan($messageBox, 2)

$replaceBox = New-Object System.Windows.Forms.CheckBox
$replaceBox.Text = "Replace existing private content"
$replaceBox.AutoSize = $true
$layout.Controls.Add($replaceBox, 0, 4)
$layout.SetColumnSpan($replaceBox, 2)

$statusLabel = New-Object System.Windows.Forms.Label
$statusLabel.Text = "Checking setup..."
$statusLabel.Dock = [System.Windows.Forms.DockStyle]::Fill
$statusLabel.TextAlign = [System.Drawing.ContentAlignment]::MiddleLeft
$layout.Controls.Add($statusLabel, 0, 5)
$layout.SetColumnSpan($statusLabel, 2)
$installButton = New-Object System.Windows.Forms.Button
$installButton.Text = "Install dependencies"
$installButton.Dock = [System.Windows.Forms.DockStyle]::Fill
$layout.Controls.Add($installButton, 2, 5)

$logBox = New-Object System.Windows.Forms.RichTextBox
$logBox.ReadOnly = $true
$logBox.BackColor = [System.Drawing.SystemColors]::Window
$logBox.Dock = [System.Windows.Forms.DockStyle]::Fill
$logBox.ScrollBars = [System.Windows.Forms.RichTextBoxScrollBars]::Vertical
$layout.Controls.Add($logBox, 0, 6)
$layout.SetColumnSpan($logBox, 3)

$progress = New-Object System.Windows.Forms.ProgressBar
$progress.Dock = [System.Windows.Forms.DockStyle]::Fill
$layout.Controls.Add($progress, 0, 7)
$layout.SetColumnSpan($progress, 3)

$buttonPanel = New-Object System.Windows.Forms.FlowLayoutPanel
$buttonPanel.FlowDirection = [System.Windows.Forms.FlowDirection]::RightToLeft
$buttonPanel.Dock = [System.Windows.Forms.DockStyle]::Fill
$encryptButton = New-Object System.Windows.Forms.Button
$encryptButton.Text = "E&ncrypt only"
$encryptButton.Width = 130
$publishButton = New-Object System.Windows.Forms.Button
$publishButton.Text = "&Commit && Push"
$publishButton.Width = 130
$buttonPanel.Controls.Add($encryptButton)
$buttonPanel.Controls.Add($publishButton)
$layout.Controls.Add($buttonPanel, 0, 8)
$layout.SetColumnSpan($buttonPanel, 3)

$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 200
$script:activeProcess = $null
$script:standardOutputPath = $null
$script:standardErrorPath = $null
$script:activeOperation = $null

function Add-Log([string]$line) {
  $logBox.AppendText($line + [Environment]::NewLine)
  $logBox.SelectionStart = $logBox.TextLength
  $logBox.ScrollToCaret()
}

function Set-Running([bool]$running) {
  $publishButton.Enabled = -not $running
  $encryptButton.Enabled = -not $running
  $browseButton.Enabled = -not $running
  $firstSheetButton.Enabled = -not $running
  $installButton.Enabled = -not $running
  $replaceBox.Enabled = -not $running
  $inputBox.Enabled = -not $running
  $sheetBox.Enabled = -not $running
  $messageBox.Enabled = -not $running
  if ($running) {
    $progress.Style = [System.Windows.Forms.ProgressBarStyle]::Marquee
    $statusLabel.Text = "Working..."
  } else {
    $progress.Style = [System.Windows.Forms.ProgressBarStyle]::Continuous
  }
}

function ConvertTo-CommandLineArgument([string]$value) {
  if ($value.Length -eq 0) { return '""' }
  if ($value -notmatch '[\s"]') { return $value }
  $escaped = [regex]::Replace($value, '(\\*)"', '$1$1\"')
  $escaped = [regex]::Replace($escaped, '(\\+)$', '$1$1')
  return '"' + $escaped + '"'
}

function Refresh-ProcessLog {
  $text = ""
  foreach ($path in @($script:standardOutputPath, $script:standardErrorPath)) {
    if ($path -and (Test-Path -LiteralPath $path)) {
      try { $text += [System.IO.File]::ReadAllText($path) } catch { }
    }
  }
  if ($logBox.Text -ne $text) {
    $logBox.Text = $text
    $logBox.SelectionStart = $logBox.TextLength
    $logBox.ScrollToCaret()
  }
}

function Complete-Process {
  Refresh-ProcessLog
  $timer.Stop()
  $exitCode = $script:activeProcess.ExitCode
  $operation = $script:activeOperation
  $script:activeProcess.Dispose()
  $script:activeProcess = $null
  foreach ($path in @($script:standardOutputPath, $script:standardErrorPath)) {
    if ($path -and (Test-Path -LiteralPath $path)) { Remove-Item -LiteralPath $path -Force }
  }
  $script:standardOutputPath = $null
  $script:standardErrorPath = $null
  Set-Running $false

  if ($exitCode -eq 0) {
    $statusLabel.Text = "Complete"
    $progress.Value = 100
    if ($operation -eq "install") { Add-Log "Dependencies installed. You can now publish." }
    [System.Windows.Forms.MessageBox]::Show($form, "Workflow completed successfully.", "Complete", "OK", "Information")
  } else {
    $statusLabel.Text = "Failed"
    if (-not $logBox.Text.Trim()) { Add-Log "The command failed without output. Confirm that Node.js and Git are installed and available on PATH." }
    [System.Windows.Forms.MessageBox]::Show($form, "The workflow failed. The log now shows the command output.", "Publishing failed", "OK", "Error")
  }
}

function Start-ExternalProcess([string]$fileName, [string[]]$commandArgs, [string]$operation) {
  $script:standardOutputPath = [System.IO.Path]::GetTempFileName()
  $script:standardErrorPath = [System.IO.Path]::GetTempFileName()
  $argumentLine = (($commandArgs | ForEach-Object { ConvertTo-CommandLineArgument $_ }) -join " ")
  $logBox.Clear()
  Set-Running $true
  try {
    $script:activeProcess = Start-Process -FilePath $fileName -ArgumentList $argumentLine -WorkingDirectory $repoRoot -RedirectStandardOutput $script:standardOutputPath -RedirectStandardError $script:standardErrorPath -WindowStyle Hidden -PassThru
    $script:activeOperation = $operation
    $timer.Start()
  } catch {
    Set-Running $false
    Add-Log "ERROR: $($_.Exception.Message)"
    [System.Windows.Forms.MessageBox]::Show($form, $_.Exception.Message, "Could not start command", "OK", "Error")
  }
}

function Start-Workflow([bool]$commitAndPush) {
  if (-not (Test-Path -LiteralPath $inputBox.Text -PathType Leaf)) {
    [System.Windows.Forms.MessageBox]::Show($form, "Select an existing .xlsx workbook first.", "Input file not found", "OK", "Warning")
    return
  }
  if (-not (Test-Path -LiteralPath $exceljsPath -PathType Leaf)) {
    [System.Windows.Forms.MessageBox]::Show($form, "Click 'Install dependencies' before publishing.", "Dependencies missing", "OK", "Warning")
    return
  }
  $contentPath = Join-Path $repoRoot "private\client-content.json"
  if ((Test-Path -LiteralPath $contentPath -PathType Leaf) -and -not $replaceBox.Checked) {
    $replace = [System.Windows.Forms.MessageBox]::Show($form, "Private content already exists. Replace it with this workbook before encrypting?", "Replace existing private content", "YesNo", "Warning")
    if ($replace -ne [System.Windows.Forms.DialogResult]::Yes) { return }
    $replaceBox.Checked = $true
  }
  if ($commitAndPush) {
    $confirmation = [System.Windows.Forms.MessageBox]::Show($form, "This will import the workbook, encrypt all client records, commit the public project files and encrypted data, and push to origin. Continue?", "Confirm publish", "YesNo", "Question")
    if ($confirmation -ne [System.Windows.Forms.DialogResult]::Yes) { return }
  }

  $workflowArgs = @($workflowScript, "--input", [System.IO.Path]::GetFullPath($inputBox.Text))
  if ($sheetBox.Text.Trim()) { $workflowArgs += @("--sheet", $sheetBox.Text.Trim()) }
  if ($replaceBox.Checked) { $workflowArgs += "--force" }
  if ($messageBox.Text.Trim()) { $workflowArgs += @("--message", $messageBox.Text.Trim()) }
  if (-not $commitAndPush) { $workflowArgs += @("--no-commit", "--no-push") }
  Start-ExternalProcess "node.exe" $workflowArgs "publish"
}

$timer.Add_Tick({
  if (-not $script:activeProcess) {
    $timer.Stop()
    return
  }
  Refresh-ProcessLog
  if ($script:activeProcess.HasExited) { Complete-Process }
})

$browseButton.Add_Click({
  $dialog = New-Object System.Windows.Forms.OpenFileDialog
  $dialog.Filter = "Excel workbooks (*.xlsx)|*.xlsx|All files (*.*)|*.*"
  $dialog.InitialDirectory = Join-Path $repoRoot "private"
  if ($dialog.ShowDialog($form) -eq [System.Windows.Forms.DialogResult]::OK) { $inputBox.Text = $dialog.FileName }
})

$firstSheetButton.Add_Click({
  $sheetBox.Clear()
  Add-Log "The first worksheet will be used."
})

$installButton.Add_Click({
  if (-not (Test-Path (Join-Path $repoRoot "package-lock.json"))) {
    [System.Windows.Forms.MessageBox]::Show($form, "package-lock.json was not found.", "Cannot install", "OK", "Error")
    return
  }
  Start-ExternalProcess "npm.cmd" @("ci") "install"
})

$encryptButton.Add_Click({ Start-Workflow $false })
$publishButton.Add_Click({ Start-Workflow $true })

$form.Add_FormClosing({
  param($sender, $event)
  if ($script:activeProcess -and -not $script:activeProcess.HasExited) {
    [System.Windows.Forms.MessageBox]::Show($form, "Wait for the current operation to finish before closing this window.", "Operation in progress", "OK", "Information")
    $event.Cancel = $true
  }
})

$form.Add_Shown({
  if (Test-Path $exceljsPath) {
    $statusLabel.Text = "Ready"
    Add-Log "Ready. Select a workbook, then choose Encrypt only or Commit & Push."
  } else {
    $statusLabel.Text = "Dependencies missing"
    Add-Log "Click Install dependencies to run npm ci."
  }
})

[void]$form.ShowDialog()
