const OFFICE_KEY='last-shift-office-save-v1';
const officeStages=[
  {
    name:'接待大廳',english:'THE LOBBY',location:'一樓 · 訪客門禁',subtitle:'門禁密碼被改成今晚的訪客順序。',objective:'打開夜班電梯',description:'讀懂訪客紀錄的篩選方式，組成四位數。',prompt:'哪四位訪客的卡號，按什麼順序輸入？',type:'code',
    hints:['先找出哪些簽到單屬於今晚的稽核訪客。','只取藍色簽名；依離開時間排序，與抵達順序無關。','離開順序是周、陳、何、吳；抄下各自的卡號。'],
    objects:[
      {id:'notice',name:'保全便條',icon:'▤',x:20,y:27,note:'夜班電梯：只接受藍筆簽名的訪客卡；依離開時間，由早到晚讀卡號。',body:'保全在門禁板上留字：「今夜稽核團用<strong>藍筆</strong>簽名。夜班電梯要的不是抵達順序，而是這四人<strong>離開的先後</strong>。輸入每張訪客卡右上角的一位數。」'},
      {id:'log',name:'訪客簽到簿',icon:'▦',x:50,y:59,note:'藍筆：陳 21:40、周 21:10、吳 22:05、何 21:55；紅筆：林、黃。',body:'簽到簿上有六行：<blockquote>陳｜藍筆｜18:04 入｜21:40 離<br>林｜紅筆｜18:12 入｜22:30 離<br>周｜藍筆｜18:20 入｜21:10 離<br>吳｜藍筆｜18:27 入｜22:05 離<br>何｜藍筆｜18:35 入｜21:55 離<br>黃｜紅筆｜18:48 入｜21:20 離</blockquote>'},
      {id:'cards',name:'訪客卡抽屜',icon:'◇',x:79,y:34,note:'卡號：陳4、林1、周7、吳9、何2、黃6。',body:'抽屜裡的卡片右上角各有一位數：<blockquote>陳 ④　林 ①　周 ⑦<br>吳 ⑨　何 ②　黃 ⑥</blockquote>卡號是門禁鍵盤使用的數字。'}
    ],reward:{name:'電梯開啟',icon:'↟',note:'訪客卡背面有出口校驗數字 6。',body:'電梯門打開。門邊遺落一張訪客卡，背面印著「緊急出口校驗：<strong>訪客 6</strong>」。先把它記下。'}
  },
  {
    name:'開放辦公區',english:'THE DESKS',location:'五樓 · A 至 D 座位',subtitle:'四張桌子都有人使用，但名牌被刻意拿走。',objective:'重建今晚座位',description:'根據四張相互制約的便條，找出每人的固定座位。',prompt:'由左至右，A、B、C、D 各是誰的座位？',type:'desks',
    hints:['把 A 到 D 畫成一排，先決定林可能的位置。','周緊接在林右邊；陳在林左側，吳又不能與陳相鄰。','林只能在 B；因此 A 是陳、C 是周、D 是吳。'],
    objects:[
      {id:'floor',name:'座位平面圖',icon:'▥',x:29,y:30,note:'由左到右是 A、B、C、D；每人只坐一桌。',body:'平面圖把四張桌子畫成一排：<blockquote>A　｜　B　｜　C　｜　D</blockquote>今晚的固定座位分給陳、林、周、吳四人，每人一桌。'},
      {id:'memo',name:'組長交接紙',icon:'✎',x:73,y:38,note:'林不在兩端；周正好坐在林的右邊。',body:'交接紙寫著：「<strong>林不坐兩端</strong>。為了讓周幫忙核對報告，<strong>周坐在林右邊緊鄰的一桌</strong>。」'},
      {id:'photo',name:'茶水間合照背面',icon:'▧',x:52,y:70,note:'陳在林左邊；吳不與陳相鄰。',body:'合照背面兩行塗改仍可辨認：「<strong>陳的桌位在林左方</strong>；<strong>吳的桌位不與陳相鄰</strong>。」這裡的左、右與平面圖相同。'}
    ],reward:{name:'座位已還原',icon:'▥',note:'周坐 C；林坐 B。C 座的列印與網路紀錄值得查。',body:'名牌回到原位：<strong>A 陳、B 林、C 周、D 吳</strong>。周的 C 座電腦仍亮著，共用印表機的工作記錄還在。'}
  },
  {
    name:'影印室',english:'THE PRINTER',location:'五樓 · 共用印表機',subtitle:'托盤裡有兩份同名報告，頁數卻不同。',objective:'辨認被替換的列印工作',description:'把原件的特徵、座位與時間對上列印佇列。',prompt:'哪一筆工作印出了替換版本？',type:'job',
    hints:['同名不代表同一版本；先確定原件與替換件的頁數。','替換件是十頁，而且在簽收後、保全封鎖電梯前列印。','符合的工作由 C 座送出，編號為 P33。'],
    objects:[
      {id:'original',name:'原稿簽收條',icon:'▤',x:23,y:30,note:'林在 21:24 簽收原稿；原稿是 12 頁。',body:'簽收條記錄：「林於 <strong>21:24</strong> 收到經簽名的稽核原稿，<strong>共 12 頁</strong>，第十二頁有手寫紅圈。」'},
      {id:'queue',name:'列印佇列',icon:'▦',x:75,y:29,note:'P31 B座 12頁 21:18；P32 A座 10頁 21:29；P33 C座 10頁 21:37；P34 D座 12頁 21:50。',body:'印表機紀錄：<blockquote>P31｜21:18｜B 座｜稽核報告｜12 頁<br>P32｜21:29｜A 座｜費用明細｜10 頁<br>P33｜21:37｜C 座｜稽核報告｜10 頁<br>P34｜21:50｜D 座｜稽核報告｜12 頁</blockquote>'},
      {id:'tray',name:'托盤與封鎖告示',icon:'▣',x:52,y:66,note:'托盤中被替換的報告只有 10 頁；電梯於 21:40 封鎖。',body:'托盤裡的清白版本名為「稽核報告」，卻<strong>只有 10 頁</strong>，沒有第十二頁紅圈。保全告示顯示電梯在 <strong>21:40</strong> 因斷電演習封鎖。'}
    ],reward:{name:'找到替換件',icon:'▣',note:'替換列印工作 P33，出口校驗數字是列印 3。',body:'你取下 P33 工作單。它由<strong>C 座</strong>在 21:37 送出，印的是十頁替換件。單據右下有「緊急出口校驗：<strong>列印 3</strong>」。'}
  },
  {
    name:'會議室走廊',english:'THE MEETING ROOMS',location:'五樓 · 會議區',subtitle:'C 座送出工作時，周卻離開了辦公桌。',objective:'找出遠端送印的位置',description:'比對門禁與無線網路紀錄，確認工作從哪裡、用何種帳號送出。',prompt:'21:37 的遠端工作在哪間房、使用哪種帳號？',type:'meeting',
    hints:['21:37 是 P33 送印時間；先找當時仍在房間的人。','周 21:36 進灰室；網路紀錄也顯示灰室的訊號節點。','灰室終端當晚只有「會議公用」登入；選灰室與公用帳號。'],
    objects:[
      {id:'doors',name:'門禁刷卡紀錄',icon:'▥',x:24,y:33,note:'周 21:36 進灰室；吳 21:35 進白室；林 21:33 離開藍室。',body:'走廊門禁列出：<blockquote>21:33　林離開藍室<br>21:35　吳進入白室<br>21:36　周進入灰室<br>21:42　周離開灰室</blockquote>送印時間為 21:37。'},
      {id:'wifi',name:'無線節點紀錄',icon:'⌁',x:71,y:30,note:'21:37，P33 的遠端請求連在 AP-GREY。',body:'網路櫃顯示 P33 的遠端列印請求於 <strong>21:37</strong> 經過 <strong>AP-GREY</strong>。節點標籤表：AP-BLUE 藍室、AP-GREY 灰室、AP-WHITE 白室。'},
      {id:'terminal',name:'會議終端登錄',icon:'▣',x:51,y:69,note:'灰室終端 21:30 至 21:45 只用「會議公用」帳號。',body:'三間會議室各有一台終端。灰室終端的登入表只有一行：「<strong>21:30—21:45｜會議公用</strong>」。私人帳號若登入會另列一行。'}
    ],reward:{name:'確定遠端送印',icon:'⌁',note:'P33 由灰室終端的會議公用帳號送出；周當時在灰室。',body:'21:37，周人在灰室，P33 經灰室節點使用<strong>會議公用帳號</strong>遠端送印。C 座是原始來源，但工作經過了另一台終端。'}
  },
  {
    name:'伺服器間',english:'THE SERVER ROOM',location:'五樓 · 網路櫃',subtitle:'備份庫還留著一條未清除的傳輸路徑。',objective:'重建檔案傳輸路線',description:'把四個節點按傳輸順序連起來，排除訪客網路與印表機。',prompt:'從 C 座出發，哪條路能到達備份庫？',type:'route',
    hints:['路徑以 C 座為起點、備份庫為終點，一共四個節點。','備份庫只接受代理伺服器；代理只接受灰室或印表機，但列印鏈路不存檔。','依序選 C 座、灰室、代理、備份庫。'],
    objects:[
      {id:'diagram',name:'網路拓樸圖',icon:'⌘',x:24,y:28,note:'連線：C—灰室、C—訪客；灰室—代理、灰室—印表；訪客—印表；代理—備份；印表—備份。',body:'機櫃圖上的連線：<blockquote>C 座 ↔ 灰室 / 訪客網路<br>灰室 ↔ 代理 / 印表機<br>訪客網路 ↔ 印表機<br>代理 ↔ 備份庫<br>印表機 ↔ 備份庫</blockquote>單有線路並不代表允許存檔。'},
      {id:'firewall',name:'防火牆規則',icon:'▤',x:76,y:32,note:'備份庫只允許代理的 8 號埠寫入；印表機僅可列印，不可存檔。',body:'防火牆便條：「備份庫的<strong>寫入</strong>只接受代理伺服器的<strong>8 號埠</strong>。印表機雖有備援線，但權限只有讀取，不能存檔。」'},
      {id:'trace',name:'未清除的封包標籤',icon:'◇',x:52,y:67,note:'起點 C 座；21:37 經 AP-GREY；目的地備份庫；共四個節點。',body:'封包片段仍可辨識：「<strong>來源 C 座</strong>／21:37 <strong>AP-GREY</strong>／目的地 <strong>備份庫</strong>／TTL 顯示經過四個節點（含起終點）。」'}
    ],reward:{name:'找到備份路徑',icon:'⌘',note:'檔案經 C 座→灰室→代理→備份庫；出口校驗數字是網路 8。',body:'代理的 <strong>8 號埠</strong>確實寫入一份檔案。機櫃旁的出口卡寫著「緊急出口校驗：<strong>網路 8</strong>」。'}
  },
  {
    name:'封存檔案室',english:'THE ARCHIVE',location:'五樓 · 文件封存',subtitle:'三個箱子都貼著「稽核」，只有一個能裝下原稿。',objective:'找回真正的報告',description:'使用簽收時間、頁數和封箱時間辨認原件。',prompt:'真正的簽名原稿在哪個箱子？',type:'box',
    hints:['原稿有十二頁，並在 21:24 才由林簽收。','封箱時間必須晚於 21:24；21:37 替換件列印時，原稿已被藏起。','只有 1 號箱在 21:29 封存十二頁文件。'],
    objects:[
      {id:'ledger',name:'封箱登記簿',icon:'▦',x:27,y:28,note:'1號 21:29 12頁；2號 21:54 10頁；3號 21:15 12頁。',body:'登記簿列出：<blockquote>1 號｜21:29 封箱｜稽核｜12 頁<br>2 號｜21:54 封箱｜稽核｜10 頁<br>3 號｜21:15 封箱｜稽核｜12 頁</blockquote>'},
      {id:'signature',name:'手寫簽收影本',icon:'✎',x:74,y:36,note:'林 21:24 才取得十二頁的已簽名原稿，第十二頁有紅圈。',body:'影本再次確認：林在 <strong>21:24</strong> 簽收<strong>十二頁</strong>已簽名原稿；第十二頁有審查員的手寫紅圈。早於此時間封好的箱子不可能有它。'},
      {id:'camera',name:'走廊監視器摘要',icon:'◉',x:54,y:69,note:'21:32 周推一個箱子進內庫；21:37 後沒有箱子再進內庫。',body:'保全摘要：「<strong>21:32</strong>，周推一只已封好的箱子進內庫；<strong>21:37</strong> 印表機響後，到封鎖前再無箱子進入。」真正的原稿在替換件出現前已藏好。'}
    ],reward:{name:'找到原稿',icon:'▧',note:'真正報告在 1 號箱；出口校驗數字是封存 1。',body:'1 號箱裡有十二頁簽名原稿，最後一頁的紅圈指出被隱瞞的款項。封箱標籤另一面印著「緊急出口校驗：<strong>封存 1</strong>」。'}
  },
  {
    name:'緊急出口',english:'THE EXIT',location:'五樓 · 逃生門',subtitle:'出口要求你留下完整的證據鏈，才能解除封鎖。',objective:'提交調查結論',description:'用前六個場景的紀錄確認操作者、手法與原稿，並讀出校驗碼。',prompt:'四個出口數字的順序是「列印 → 網路 → 封存 → 訪客」。',type:'final',
    hints:['人是 C 座使用者；手法要解釋他離開座位卻送出 P33。','真正原稿在替換件出現前封箱；傳輸路徑經灰室與代理。','周岱、會議公用帳號、1 號箱；校驗數字依告示順序為 3、8、1、6。'],
    objects:[
      {id:'placard',name:'出口校驗牌',icon:'▤',x:25,y:30,note:'校驗數字順序：列印 → 網路 → 封存 → 訪客。',body:'緊急出口的牌子說：「依證據鏈輸入四個校驗數字，順序是<strong>列印 → 網路 → 封存 → 訪客</strong>。數字在每道機關解開後的記錄裡。」'},
      {id:'report',name:'保全結案表',icon:'▦',x:73,y:37,note:'需要提交：操作者、替換手法、原稿所在、校驗碼。',body:'結案表要求四欄：「操作者」「遠端送印使用方式」「已簽名原稿所在」「出口校驗碼」。四欄都必須與調查紀錄一致。'},
      {id:'note',name:'匿名訊息尾段',icon:'✉',x:53,y:67,note:'匿名人提醒：不要只看電腦座位，還要看送印當時人在哪裡。',body:'訊息尾段寫著：「有人會拿 C 座的機器當不在場證明，但<strong>送印位置</strong>比座位更能說明手法。請把原稿交給真正能重啟調查的人。」'}
    ],reward:{name:'封鎖解除',icon:'↗',note:'完整證據鏈已提交，報告得以保全。',body:'出口打開了。保全保存 P33 單據、代理傳輸紀錄與 1 號箱的簽名原稿；替換報告再也無法冒充真正的稽核結果。'}
  }
];

const o=id=>document.getElementById(id);
const oPad=n=>String(n).padStart(2,'0');
const oTime=()=>`${oPad(Math.floor(officeState.seconds/60))}:${oPad(officeState.seconds%60)}`;
const oSeen=(i,id)=>`${i}:${id}`;
const oFresh=()=>({started:false,complete:false,chapter:0,unlocked:0,solved:[],seen:[],seconds:0,hints:Array(7).fill(0),code:'',desks:{A:'',B:'',C:'',D:''},job:'',meeting:{room:'',account:''},route:[],box:'',final:{actor:'',method:'',archive:'',code:''}});
function oLoad(){
  try{
    const data=JSON.parse(localStorage.getItem(OFFICE_KEY));if(!data||!Array.isArray(data.solved))return oFresh();
    const fresh=oFresh();return {...fresh,...data,hints:Array.isArray(data.hints)?data.hints:fresh.hints,desks:{...fresh.desks,...data.desks},meeting:{...fresh.meeting,...data.meeting},final:{...fresh.final,...data.final},route:Array.isArray(data.route)?data.route:[]};
  }catch{return oFresh();}
}
let officeState=oLoad(),oModalAction=null,oPriorFocus=null;
function oSave(){try{localStorage.setItem(OFFICE_KEY,JSON.stringify(officeState));}catch{}}
const deskNames=[['chen','陳'],['lin','林'],['zhou','周'],['wu','吳']];
const jobNames=[['P31','21:18 · B座 · 報告12頁'],['P32','21:29 · A座 · 明細10頁'],['P33','21:37 · C座 · 報告10頁'],['P34','21:50 · D座 · 報告12頁']];
const routeNodes=[['desk','C 座','C'],['grey','灰室','G'],['proxy','代理','P'],['backup','備份庫','B'],['guest','訪客網路','V'],['printer','印表機','I']];
const boxNames=[['1','1 號箱','21:29 · 12頁'],['2','2 號箱','21:54 · 10頁'],['3','3 號箱','21:15 · 12頁']];
function oArt(i){
  const shapes=[
    '<rect x="110" y="130" width="210" height="310" fill="#193340" stroke="#9fc1c8" stroke-width="6"/><path d="M135 175 H295 M135 255 H295 M135 335 H295" stroke="#8db1bd" stroke-width="3"/><rect x="450" y="175" width="235" height="230" fill="#173240" stroke="#a4c9cf" stroke-width="8"/><path d="M490 225 H650 M490 275 H650 M490 325 H650" stroke="#a4c9cf" stroke-width="4"/>',
    '<rect x="120" y="300" width="560" height="120" fill="#214450" stroke="#8ab4bf" stroke-width="7"/><path d="M260 300 V420 M400 300 V420 M540 300 V420" stroke="#a0c9d0" stroke-width="5"/><rect x="250" y="175" width="130" height="90" fill="#0f2836" stroke="#a3ccd3" stroke-width="6"/><rect x="475" y="155" width="130" height="90" fill="#0f2836" stroke="#a3ccd3" stroke-width="6"/>',
    '<rect x="190" y="130" width="420" height="340" rx="15" fill="#193b49" stroke="#b2d1d3" stroke-width="9"/><rect x="245" y="190" width="310" height="130" fill="#0d2734" stroke="#79a8b7" stroke-width="6"/><rect x="295" y="340" width="215" height="85" fill="#bed0c8" stroke="#6e8d94" stroke-width="7"/><path d="M320 365 H485 M320 385 H485" stroke="#64818b" stroke-width="3"/>',
    '<path d="M105 140 H695 V440 H105 Z" fill="#1b3642" stroke="#8eb4bd" stroke-width="7"/><path d="M300 140 V440 M500 140 V440" stroke="#a2c6ca" stroke-width="8"/><rect x="145" y="220" width="120" height="155" fill="#0e2834"/><rect x="340" y="220" width="120" height="155" fill="#0e2834"/><rect x="540" y="220" width="120" height="155" fill="#0e2834"/>',
    '<rect x="155" y="105" width="490" height="365" fill="#173541" stroke="#89b7c2" stroke-width="7"/><path d="M250 125 V450 M360 125 V450 M470 125 V450 M580 125 V450 M165 240 H635 M165 350 H635" stroke="#6f9dac" stroke-width="5"/><circle cx="305" cy="290" r="22" fill="#afd4d7"/><circle cx="525" cy="185" r="22" fill="#afd4d7"/>',
    '<rect x="175" y="160" width="450" height="270" fill="#1a3c49" stroke="#afd0cf" stroke-width="8"/><path d="M175 250 H625 M175 340 H625 M325 160 V430 M475 160 V430" stroke="#8ab0b8" stroke-width="6"/><rect x="210" y="200" width="75" height="30" fill="#c4d4cc"/><rect x="360" y="290" width="75" height="30" fill="#c4d4cc"/>',
    '<rect x="230" y="100" width="340" height="385" fill="#153441" stroke="#b1ccd0" stroke-width="10"/><rect x="290" y="180" width="220" height="75" fill="#0c2733" stroke="#73a2af" stroke-width="5"/><circle cx="400" cy="365" r="50" fill="none" stroke="#b1d9dc" stroke-width="7"/><path d="M375 365 H425" stroke="#b1d9dc" stroke-width="6"/>'
  ];
  return `<svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${officeStages[i].name}的場景"><defs><linearGradient id="ow${i}" x2="1" y2="1"><stop stop-color="#456b79"/><stop offset="1" stop-color="#102b38"/></linearGradient><radialGradient id="ol${i}"><stop stop-color="#a1cad344"/><stop offset="1" stop-color="#a1cad300"/></radialGradient></defs><rect width="800" height="560" fill="url(#ow${i})"/><circle cx="400" cy="260" r="380" fill="url(#ol${i})"/><path d="M0 90 H800 M0 480 H800 M90 90 V480 M710 90 V480" stroke="#c5dce0" stroke-opacity=".13" stroke-width="8"/>${shapes[i]}<path d="M0 500 Q400 470 800 500 V560 H0 Z" fill="#0c202b" opacity=".7"/></svg>`;
}
function oOptions(options,value){return `<option value="">請選擇</option>`+options.map(([id,label])=>`<option value="${id}" ${id===value?'selected':''}>${label}</option>`).join('');}
function oChallenge(){
  const s=officeState,i=s.chapter,type=officeStages[i].type,solved=s.solved.includes(i);let html='';
  if(type==='code')html=`<div class="o-code"><input id="o-code" aria-label="四位數門禁密碼" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" placeholder="_ _ _ _" value="${s.code.replace(/[^0-9]/g,'')}" ${solved?'disabled':''}></div><button class="o-submit" type="button" data-action="check" ${solved?'disabled':''}>試開電梯 →</button>`;
  if(type==='desks')html=`<div class="o-selects">${['A','B','C','D'].map(id=>`<label>${id} 座<select data-field="${id}" ${solved?'disabled':''}>${oOptions(deskNames,s.desks[id])}</select></label>`).join('')}</div><button class="o-submit" type="button" data-action="check" ${solved?'disabled':''}>核對座位 →</button>`;
  if(type==='job')html=`<div class="o-choice-grid">${jobNames.map(([id,label])=>`<button type="button" data-action="job" data-value="${id}" aria-pressed="${s.job===id}" ${solved?'disabled':''}><b>${id}</b>${label}</button>`).join('')}</div><button class="o-submit" type="button" data-action="check" ${solved?'disabled':''}>確認替換件 →</button>`;
  if(type==='meeting')html=`<div class="o-selects"><label>送印房間<select data-field="room" ${solved?'disabled':''}>${oOptions([['blue','藍室'],['grey','灰室'],['white','白室']],s.meeting.room)}</select></label><label>使用帳號<select data-field="account" ${solved?'disabled':''}>${oOptions([['personal','私人帳號'],['shared','會議公用帳號'],['guest','訪客帳號']],s.meeting.account)}</select></label></div><button class="o-submit" type="button" data-action="check" ${solved?'disabled':''}>核對紀錄 →</button>`;
  if(type==='route')html=`<div class="o-sequence">${s.route.length?s.route.map(id=>`<span>${routeNodes.find(x=>x[0]===id)?.[1]||''}</span>`).join(' → '):'從 C 座開始選擇節點'}</div><div class="o-map">${routeNodes.map(([id,name,letter])=>`<button type="button" data-action="route" data-value="${id}" aria-pressed="${s.route.includes(id)}" ${s.route.includes(id)||solved?'disabled':''}><b>${letter}</b>${name}</button>`).join('')}</div><button class="o-secondary" type="button" data-action="undo" ${solved||!s.route.length?'disabled':''}>撤回上一個節點</button>`;
  if(type==='box')html=`<div class="o-choice-grid">${boxNames.map(([id,name,detail])=>`<button type="button" data-action="box" data-value="${id}" aria-pressed="${s.box===id}" ${solved?'disabled':''}><b>${name}</b>${detail}</button>`).join('')}</div><button class="o-submit" type="button" data-action="check" ${solved?'disabled':''}>開啟選定的箱子 →</button>`;
  if(type==='final')html=`<div class="o-combo"><div class="o-selects"><label>操作者<select data-field="actor" ${solved?'disabled':''}>${oOptions([['chen','陳'],['lin','林'],['zhou','周'],['wu','吳']],s.final.actor)}</select></label><label>遠端送印方式<select data-field="method" ${solved?'disabled':''}>${oOptions([['private','私人帳號'],['shared','會議公用帳號'],['guest','訪客帳號']],s.final.method)}</select></label><label>已簽名原稿<select data-field="archive" ${solved?'disabled':''}>${oOptions([['1','1 號箱'],['2','2 號箱'],['3','3 號箱']],s.final.archive)}</select></label></div><div class="o-code"><input id="o-final-code" class="o-final-code" aria-label="四位數出口校驗碼" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" placeholder="出口校驗碼" value="${s.final.code.replace(/[^0-9]/g,'')}" ${solved?'disabled':''}></div><button class="o-submit" type="button" data-action="check" ${solved?'disabled':''}>提交結論並開門 →</button></div>`;
  o('o-challenge').innerHTML=html;
}
function oRender(){
  const s=officeState,i=s.chapter,stage=officeStages[i];
  o('o-timer').textContent=oTime();o('o-progress-text').textContent=`${s.solved.length} / 7`;o('o-progress-fill').style.width=`${s.solved.length/7*100}%`;o('o-clue-count').textContent=`${s.seen.length} 條`;
  o('o-nav').innerHTML=officeStages.map((entry,n)=>`<button class="room-button ${n===i?'active':''}" type="button" data-stage="${n}" ${n>s.unlocked?'disabled':''} ${n===i?'aria-current="step"':''}><span class="room-number">${oPad(n+1)}</span><span class="room-name">${entry.name}</span><span class="room-state">${s.solved.includes(n)?'已完成':n>s.unlocked?'未開啟':'調查中'}</span></button>`).join('');
  const clues=s.seen.map(key=>{const [index,id]=key.split(':'),obj=officeStages[Number(index)]?.objects.find(x=>x.id===id);return obj?`<div class="clue-item"><strong>${obj.name}</strong><span>${obj.note}</span><small>${officeStages[Number(index)].name}</small></div>`:'';}).join('');
  const rewards=s.solved.map(n=>`<div class="clue-item"><strong>✓ ${officeStages[n].reward.name}</strong><span>${officeStages[n].reward.note}</span><small>${officeStages[n].name} / 結果</small></div>`).join('');
  o('o-clues').innerHTML=clues+rewards||'<p class="empty-note">調查物件後，線索會記在這裡。</p>';
  o('o-chapter').textContent=`CHAPTER ${oPad(i+1)} — ${stage.english}`;o('o-title').textContent=stage.name;o('o-subtitle').textContent=stage.subtitle;o('o-count').textContent=`${oPad(i+1)} / 07`;o('o-location').textContent=stage.location;
  o('o-objective-no').innerHTML=`${oPad(i+1)}<span>/07</span>`;o('o-objective').textContent=stage.objective;o('o-description').textContent=stage.description;o('o-prompt').textContent=stage.prompt;o('o-status').textContent=s.solved.includes(i)?'SOLVED':'ACTIVE';
  o('o-art').innerHTML=oArt(i);o('o-hotspots').innerHTML=stage.objects.map(obj=>`<button class="hotspot ${s.seen.includes(oSeen(i,obj.id))?'visited':''}" type="button" data-object="${obj.id}" style="left:${obj.x}%;top:${obj.y}%" aria-label="調查${obj.name}"><span class="hotspot-icon">${obj.icon}</span><span>${obj.name}</span><i class="hotspot-dot"></i></button>`).join('');
  o('o-objects').innerHTML=stage.objects.map(obj=>`<button class="mobile-object-button ${s.seen.includes(oSeen(i,obj.id))?'visited':''}" type="button" data-object="${obj.id}"><span>${obj.icon}</span>${obj.name}</button>`).join('');o('o-footer-count').textContent=`已發現 ${stage.objects.filter(obj=>s.seen.includes(oSeen(i,obj.id))).length} / ${stage.objects.length} 件`;
  const hint=s.hints[i]||0;o('o-hint-content').textContent=hint?`提示 ${hint} / 3：${stage.hints[hint-1]}`:'';o('o-hint-content').classList.toggle('open',hint>0);o('o-hint').querySelector('span:nth-child(2)').textContent=hint===3?'已顯示完整提示':hint?'再給我一點提示':'需要一點提示？';
  oChallenge();o('o-feedback').textContent=s.solved.includes(i)?'此機關已解開。可以切換場景重看線索。':'線索分散在場景裡。';o('o-feedback').className='code-message';
}
function oFeedback(message,error=false){o('o-feedback').textContent=message;o('o-feedback').className=`code-message ${error?'error':'success'}`;}
function oComplete(){
  const s=officeState,i=s.chapter;if(s.solved.includes(i))return;
  s.solved.push(i);const reward=officeStages[i].reward;
  if(i===6){s.complete=true;oSave();oRender();oShowModal({eyebrow:'EXIT OPEN',...reward,tag:'案件已解開 · 關閉後查看結局'},()=>oShowEnding());return;}
  s.unlocked=Math.max(s.unlocked,i+1);s.chapter=i+1;oSave();oRender();oShowModal({eyebrow:'MECHANISM OPEN',...reward,tag:`已開啟 ${officeStages[i+1].name}`});
}
function oCheck(){
  const s=officeState,i=s.chapter;if(s.solved.includes(i))return;
  let correct=false,message='紀錄沒有對上，請重新比對線索。';
  if(i===0){correct=s.code==='7429';message=s.code.length!==4?'請輸入四位數。':'篩選簽名或離開順序有誤。';}
  if(i===1){const seats=['A','B','C','D'].map(key=>s.desks[key]);correct=seats.join(',')==='chen,lin,zhou,wu';message=seats.some(x=>!x)?'每張桌子都要分配一人。':new Set(seats).size!==4?'同一人不能同時坐兩張桌子。':'座位與交接紙或合照的條件不符。';}
  if(i===2){correct=s.job==='P33';message=s.job?'再核對報告頁數，以及原稿簽收和封鎖的時間。':'先選一筆列印工作。';}
  if(i===3){correct=s.meeting.room==='grey'&&s.meeting.account==='shared';message=!s.meeting.room||!s.meeting.account?'房間與帳號都要選。':'門禁、訊號節點和終端登入尚未全部吻合。';}
  if(i===5){correct=s.box==='1';message=s.box?'箱子的封存時間或頁數與簽收影本不符。':'先選一只箱子。';}
  if(i===6){const f=s.final;correct=f.actor==='zhou'&&f.method==='shared'&&f.archive==='1'&&f.code==='3816';message=!f.actor||!f.method||!f.archive||f.code.length!==4?'請填妥結案表和四位數校驗碼。':'至少一項結論與證據鏈不符，或校驗數字順序有誤。';}
  if(correct)oComplete();else oFeedback(message,true);
}
function oInspect(id){
  const s=officeState,i=s.chapter,obj=officeStages[i].objects.find(x=>x.id===id);if(!obj)return;
  const key=oSeen(i,id);if(!s.seen.includes(key)){s.seen.push(key);oSave();oRender();}
  oShowModal({name:obj.name,icon:obj.icon,body:obj.body,tag:`${officeStages[i].name} / 線索已記入筆記`});
}
function oShowModal({eyebrow='EVIDENCE',name,icon='✦',body,tag=''},onClose=null){
  oPriorFocus=document.activeElement;oModalAction=onClose;o('o-modal-eyebrow').textContent=eyebrow;o('o-modal-title').textContent=name;o('o-modal-icon').textContent=icon;o('o-modal-body').innerHTML=body;o('o-modal-tag').textContent=tag;o('o-modal').classList.remove('hidden');o('o-modal-close').focus();
}
function oCloseModal(){o('o-modal').classList.add('hidden');const action=oModalAction;oModalAction=null;if(action)action();else if(oPriorFocus?.isConnected)oPriorFocus.focus();}
function oShowEnding(){o('o-ending-clues').textContent=officeState.seen.length;o('o-ending-time').textContent=oTime();o('o-ending-hints').textContent=officeState.hints.reduce((sum,n)=>sum+(Number(n)||0),0);o('o-ending').classList.remove('hidden');}
function oRestart(confirmFirst=true){if(confirmFirst&&!window.confirm('確定要清除加班者的辦公室的進度並重新開始嗎？'))return;officeState=oFresh();oSave();o('o-modal').classList.add('hidden');o('o-ending').classList.add('hidden');o('o-intro').classList.remove('hidden');oRender();}

o('o-challenge').addEventListener('click',event=>{
  const button=event.target.closest('button[data-action]');if(!button||button.disabled)return;
  const action=button.dataset.action,s=officeState;
  if(action==='check'){oCheck();return;}
  if(action==='job'){s.job=button.dataset.value;oSave();oChallenge();o('o-challenge').querySelector(`[data-value="${s.job}"]`)?.focus();return;}
  if(action==='box'){s.box=button.dataset.value;oSave();oChallenge();o('o-challenge').querySelector(`[data-value="${s.box}"]`)?.focus();return;}
  if(action==='route'){
    const id=button.dataset.value;if(s.route.includes(id)||s.route.length>=4)return;s.route.push(id);
    if(s.route.length===4){if(s.route.join(',')==='desk,grey,proxy,backup'){oComplete();return;}oFeedback('這條路不能寫入備份庫；可撤回節點重新檢查權限。',true);}
  }
  if(action==='undo')s.route.pop();
  oSave();oChallenge();
  if(action==='route')o('o-challenge').querySelector('button[data-action="route"]:not(:disabled)')?.focus();
  if(action==='undo')o('o-challenge').querySelector('button[data-action="undo"]')?.focus();
});
o('o-challenge').addEventListener('change',event=>{
  const field=event.target.dataset.field;if(!field)return;
  if(officeState.chapter===1)officeState.desks[field]=event.target.value;
  if(officeState.chapter===3)officeState.meeting[field]=event.target.value;
  if(officeState.chapter===6)officeState.final[field]=event.target.value;
  oSave();
});
o('o-challenge').addEventListener('input',event=>{
  if(event.target.id==='o-code')officeState.code=event.target.value.replace(/[^0-9]/g,'').slice(0,4);
  if(event.target.id==='o-final-code')officeState.final.code=event.target.value.replace(/[^0-9]/g,'').slice(0,4);
  if(event.target.id==='o-code'||event.target.id==='o-final-code'){event.target.value=event.target.id==='o-code'?officeState.code:officeState.final.code;oSave();}
});
o('o-challenge').addEventListener('keydown',event=>{if(event.key==='Enter'&&event.target.matches('input')){event.preventDefault();oCheck();}});
o('o-hotspots').addEventListener('click',event=>{const button=event.target.closest('[data-object]');if(button)oInspect(button.dataset.object);});
o('o-objects').addEventListener('click',event=>{const button=event.target.closest('[data-object]');if(button)oInspect(button.dataset.object);});
o('o-nav').addEventListener('click',event=>{const button=event.target.closest('[data-stage]');if(!button)return;const index=Number(button.dataset.stage);if(index>officeState.unlocked)return;officeState.chapter=index;oSave();oRender();window.scrollTo({top:0,behavior:'smooth'});});
o('o-hint').addEventListener('click',()=>{const i=officeState.chapter;officeState.hints[i]=Math.min(3,(Number(officeState.hints[i])||0)+1);oSave();const level=officeState.hints[i];o('o-hint-content').textContent=`提示 ${level} / 3：${officeStages[i].hints[level-1]}`;o('o-hint-content').classList.add('open');o('o-hint').querySelector('span:nth-child(2)').textContent=level<3?'再給我一點提示':'已顯示完整提示';});
o('o-modal-close').addEventListener('click',oCloseModal);o('o-modal-action').addEventListener('click',oCloseModal);o('o-modal').addEventListener('click',event=>{if(event.target===o('o-modal'))oCloseModal();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!o('o-modal').classList.contains('hidden'))oCloseModal();});
o('o-start').addEventListener('click',()=>{officeState.started=true;oSave();o('o-intro').classList.add('hidden');if(officeState.complete)oShowEnding();});
o('o-restart').addEventListener('click',()=>oRestart(true));o('o-ending-restart').addEventListener('click',()=>oRestart(false));
o('o-notes-toggle').addEventListener('click',()=>{const panel=document.querySelector('.case-panel'),open=panel.classList.toggle('notes-open');o('o-notes-toggle').setAttribute('aria-expanded',String(open));o('o-notes-toggle').querySelector('span').textContent=open?'−':'＋';});
if(officeState.started)o('o-intro').classList.add('hidden');oRender();if(officeState.complete&&officeState.started)oShowEnding();
setInterval(()=>{if(officeState.started&&!officeState.complete&&o('o-intro').classList.contains('hidden')){officeState.seconds++;o('o-timer').textContent=oTime();if(officeState.seconds%10===0)oSave();}},1000);
