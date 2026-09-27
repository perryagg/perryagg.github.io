const STORAGE_KEY = 'after-last-bell-save-v1';

const rooms = [
  {
    name: '夜間走廊', english: 'THE CORRIDOR', location: 'B棟・三樓走廊', subtitle: '最後一聲鐘響之後，整棟教學樓忽然安靜了。',
    objective: '打開置物櫃', description: '尋找走廊裡與「最後一節」有關的線索。', prompt: '四位數置物櫃密碼', code: '5121',
    hints: ['先調查晚自習時刻表和匿名便條。', '時刻表的最後一個時間是 21:15。便條要你把數字倒過來。', '把 2115 反向排列，輸入 5121。'],
    objects: [
      {id:'clock', name:'停住的時鐘', icon:'◷', x:52, y:17, note:'時鐘停在 21:15。', body:'指針卡在 <strong>21:15</strong>。鐘面邊緣有一道細長刮痕，像是有人刻意把它停在這一刻。'},
      {id:'schedule', name:'晚自習時刻表', icon:'▤', x:23, y:49, note:'最後一節晚自習結束於 21:15。', body:'褪色的時刻表仍貼在牆上。<div class="evidence-grid"><span>第一節 <em>18:30</em></span><span>第二節 <em>19:45</em></span><span>第三節 <em>20:30</em></span><span>最後一節 <em>21:15</em></span></div>「最後一節」被紅筆圈了起來。'},
      {id:'note', name:'匿名便條', icon:'✉', x:76, y:41, note:'置物櫃密碼是「最後一節的時間倒過來」。', body:'紙條被壓在布告欄角落。<blockquote>「不要相信從正面看到的。<br>置物櫃密碼，是<strong>最後一節的時間倒過來</strong>。」</blockquote>字跡與你收到的匿名信相同。'},
      {id:'locker', name:'林澄的置物櫃', icon:'▣', x:71, y:77, note:'置物櫃上有四位數密碼鎖。', body:'櫃門貼著褪色的姓名標籤「林澄」。四位數鎖仍鎖著；輸入密碼的鍵盤就在右側。'}
    ],
    reward:{name:'置物櫃裡的鑰匙', icon:'⚿', note:'取得二年三班教室鑰匙；林澄留下「她在座位間走了一條路」的提示。', body:'櫃中只有一把教室鑰匙和半張筆記。<blockquote>「別看我的座位。看看我那晚<strong>走過的路</strong>。」</blockquote>你用鑰匙打開二年三班。'}
  },
  {
    name:'二年三班', english:'THE CLASSROOM', location:'B棟・二年三班', subtitle:'空教室裡，四張桌子的位置被粉筆重新標記。',
    objective:'打開教師抽屜', description:'找出林澄當晚走過的路，將座位數字依序排列。', prompt:'四位數教師抽屜密碼', code:'2749',
    hints:['半張筆記提到「走過的路」。黑板上畫了方向。', '黑板的順序是窗邊 → 走道 → 講台 → 門邊。對照座位圖上的數字。', '依序取得 2、7、4、9，輸入 2749。'],
    objects:[
      {id:'board',name:'黑板上的路線',icon:'↗',x:54,y:26,note:'路線依序是窗邊 → 走道 → 講台 → 門邊。',body:'值日生擦掉了大半個黑板，只剩一條新畫的箭頭。<blockquote>窗邊 → 走道 → 講台 → 門邊</blockquote>旁邊有一行小字：「按我走過的順序。」'},
      {id:'seats',name:'座位配置圖',icon:'▦',x:25,y:58,note:'窗邊 2；走道 7；講台 4；門邊 9。',body:'講桌上放著新的座位配置圖。四個位置被圈起來：<div class="evidence-grid"><span>窗邊 <em>2</em></span><span>走道 <em>7</em></span><span>講台 <em>4</em></span><span>門邊 <em>9</em></span></div>圈痕的粉筆顏色和黑板上的箭頭一樣。'},
      {id:'diary',name:'林澄的日記',icon:'≡',x:74,y:66,note:'林澄發現有人偷改考卷與轉學資料。',body:'日記最後一頁被撕去一半。<blockquote>「我拍到了教務處改動試題的紀錄。主任說，只要我閉嘴，就能當作什麼都沒發生。現在連我的學籍也可能被動手腳。」</blockquote>後面只有日期：十一月七日。'},
      {id:'drawer',name:'教師抽屜',icon:'▤',x:49,y:76,note:'教師抽屜上有四位數密碼鎖。',body:'抽屜的鎖是新換的。鎖旁黏著一點白粉筆屑，像有人匆忙把它關上。'}
    ],
    reward:{name:'可疑的轉學文件',icon:'▧',note:'林澄的「自願轉學」文件在 21:30 簽核，晚於失蹤時間。背面夾著圖書室鑰匙。',body:'抽屜裡是一份「自願轉學申請」。簽核時間印著 <strong>11 月 7 日 21:30</strong>，簽名欄是教務主任<strong>沈國維</strong>。可是校方公告說林澄在 21:15 就已經離校。文件背面還夾著圖書室鑰匙。'}
  },
  {
    name:'舊圖書室', english:'THE LIBRARY', location:'A棟・舊圖書室', subtitle:'借閱紀錄被抽走了，四本書卻被刻意留在桌上。',
    objective:'解開檔案櫃', description:'找出四本書的年代與編號，依館員留下的規則排列。', prompt:'四位數檔案櫃密碼', code:'6382',
    hints:['查看桌上的四本書，再看書架旁的館員備忘錄。', '備忘錄說以出版年份由舊到新排列，取書脊末位數。', '1998、2003、2010、2021 的末位數是 6、3、8、2。'],
    objects:[
      {id:'catalog',name:'館員備忘錄',icon:'✎',x:52,y:24,note:'檔案櫃密碼：依出版年份由舊到新，取書脊末位數。',body:'備忘錄夾在借閱卡盒中。<blockquote>「檔案櫃的四位密碼，照桌上四本書的<strong>出版年份由舊到新</strong>排好，再讀出書脊標籤的末位數。」</blockquote>'},
      {id:'book1',name:'《冬季天文》',icon:'Ⅰ',x:17,y:53,note:'《冬季天文》出版於 1998 年，書脊標籤末位 6。',body:'扉頁寫著出版年份 <strong>1998</strong>。書脊的館藏標籤是 A-146，最後一位是 <strong>6</strong>。'},
      {id:'book2',name:'《暗房手冊》',icon:'Ⅱ',x:39,y:64,note:'《暗房手冊》出版於 2003 年，書脊標籤末位 3。',body:'扉頁寫著出版年份 <strong>2003</strong>。書脊的館藏標籤是 P-203，最後一位是 <strong>3</strong>。'},
      {id:'book3',name:'《校園年鑑》',icon:'Ⅲ',x:63,y:56,note:'《校園年鑑》出版於 2010 年，書脊標籤末位 8。',body:'扉頁寫著出版年份 <strong>2010</strong>。書脊的館藏標籤是 H-318，最後一位是 <strong>8</strong>。'},
      {id:'book4',name:'《聲音檔案》',icon:'Ⅳ',x:82,y:69,note:'《聲音檔案》出版於 2021 年，書脊標籤末位 2。',body:'扉頁寫著出版年份 <strong>2021</strong>。書脊的館藏標籤是 S-422，最後一位是 <strong>2</strong>。'},
      {id:'cabinet',name:'上鎖的檔案櫃',icon:'▣',x:86,y:31,note:'檔案櫃需要四位數密碼。',body:'檔案櫃有一道新安裝的密碼鎖。櫃門縫裡露出半張監視器維護單。'}
    ],
    reward:{name:'監視器維護紀錄',icon:'▥',note:'21:22，編號 001 的管理員識別證關閉監視器；這張證件屬於沈國維。取得廣播室通行證。',body:'檔案櫃中的維護單記錄：<strong>21:22，管理員識別證 001 手動關閉 B 棟監視器</strong>。識別證名冊顯示 001 屬於教務主任沈國維。同一個信封裡有廣播室通行證。'}
  },
  {
    name:'廣播室', english:'THE BROADCAST ROOM', location:'主棟・廣播室', subtitle:'最後一段錄音被鎖在播音台裡，四份紀錄散落四處。',
    objective:'啟動播音台', description:'把四份帶有編號的紀錄按時間先後排列。', prompt:'四位數播音台密碼', code:'1734',
    hints:['牆上的操作須知說，要按時間先後輸入四份紀錄的末碼。', '四個時間分別是 21:22、21:30、21:47、22:05。', '依時間排序，末碼依序為 1、7、3、4。'],
    objects:[
      {id:'manual',name:'操作須知',icon:'?',x:20,y:27,note:'播音台密碼：按時間先後排列四份紀錄的末碼。',body:'操作須知的最後一頁被人重新貼上。<blockquote>「四份紀錄各有一個末碼。<strong>照發生時間由早到晚</strong>輸入，才能播放最後的檔案。」</blockquote>'},
      {id:'security',name:'保全紀錄',icon:'◫',x:72,y:28,note:'21:22 監視器中斷，紀錄末碼 1。',body:'保全紀錄：<strong>21:22</strong>，B 棟攝影機失去訊號。事件編號 SEC-<strong>1</strong>。'},
      {id:'transfer',name:'文件列印單',icon:'▥',x:36,y:67,note:'21:30 轉學文件列印，紀錄末碼 7。',body:'印表機留下的工作單：<strong>21:30</strong>，列印「林澄轉學申請」。工作編號 DOC-<strong>7</strong>。'},
      {id:'audio',name:'錄音排程',icon:'♫',x:57,y:50,note:'21:47 有一段錄音寫入，紀錄末碼 3。',body:'自動錄音排程：<strong>21:47</strong>，來源「廣播室麥克風」，檔案編號 AUD-<strong>3</strong>。檔案內容仍被播音台鎖住。'},
      {id:'gate',name:'側門出入簿',icon:'↗',x:82,y:71,note:'22:05 側門開啟，紀錄末碼 4。',body:'側門出入簿：<strong>22:05</strong>，緊急出口被開啟。事件編號 GATE-<strong>4</strong>。紀錄旁有一個小小的「澄」字。'},
      {id:'console',name:'播音控制台',icon:'▣',x:24,y:78,note:'播音控制台需要四位數密碼。',body:'播音台的燈亮著，顯示「最後檔案：待解鎖」。麥克風旁放著林澄的學生證。'}
    ],
    reward:{name:'林澄留下的錄音',icon:'♫',note:'林澄親口證實，她因掌握試題交易證據而躲藏，22:05 已從側門離開。',body:'喇叭傳出林澄刻意壓低的聲音。<blockquote>「沈主任把試題賣給補習班。我拿到了交易紀錄。他關掉監視器時，我躲進廣播室錄下這段話。<strong>我沒有失蹤，22:05 會從側門離開</strong>，把證據交給可信任的人。如果你聽見這段錄音，請替我把真相說出來。」</blockquote>現在，你必須指出是誰利用權限掩蓋此事。'}
  }
];

const defaultState = () => ({started:false, complete:false, room:0, unlocked:0, seen:[], seconds:0, hints:[0,0,0,0], finalUnlocked:false});
let state = defaultState();
try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (saved && typeof saved === 'object') state = {...state,...saved}; } catch (_) {}
state.room = Math.min(Math.max(Number(state.room)||0,0),3);
state.unlocked = Math.min(Math.max(Number(state.unlocked)||0,0),3);
state.room = Math.min(state.room,state.unlocked);
state.seen = Array.isArray(state.seen) ? state.seen : [];
state.hints = Array.isArray(state.hints) && state.hints.length===4 ? state.hints : [0,0,0,0];

const $ = id => document.getElementById(id);
const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {} };
const pad = n => String(n).padStart(2,'0');
const timeText = () => `${pad(Math.floor(state.seconds/60))}:${pad(state.seconds%60)}`;
const seenKey = (room,id) => `${room}:${id}`;
let returnFocus = null;

function roomArt(index) {
  const base = `<svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="wall" x2="0" y2="1"><stop stop-color="#354d55"/><stop offset="1" stop-color="#1b2a33"/></linearGradient><linearGradient id="floor" x2="0" y2="1"><stop stop-color="#3c4a47"/><stop offset="1" stop-color="#111b23"/></linearGradient><radialGradient id="light"><stop stop-color="#d5b77b" stop-opacity=".45"/><stop offset="1" stop-color="#c4a269" stop-opacity="0"/></radialGradient><linearGradient id="glass" x2="0" y2="1"><stop stop-color="#62777b"/><stop offset="1" stop-color="#1a2c35"/></linearGradient><filter id="blur"><feGaussianBlur stdDeviation="20"/></filter></defs>`;
  const frame = `<rect width="900" height="620" fill="url(#wall)"/><path d="M0 405 L900 405 L900 620 L0 620Z" fill="url(#floor)"/><path d="M0 405 L900 405" stroke="#627276" stroke-width="5"/><path d="M0 510 L900 455 M0 620 L900 480 M900 510 L0 455 M900 620 L0 480" stroke="#52615e" stroke-opacity=".36" stroke-width="2"/><rect width="900" height="620" fill="#0b1927" opacity=".19"/>`;
  const lamp = `<ellipse cx="450" cy="118" rx="310" ry="220" fill="url(#light)"/><rect x="410" y="30" width="80" height="9" rx="3" fill="#d0b982"/><path d="M450 39 L450 0" stroke="#181e25" stroke-width="6"/>`;
  if(index===0) return base+frame+`<path d="M220 0 L310 0 L390 405 L135 405Z" fill="#23373f"/><path d="M690 0 L610 0 L510 405 L765 405Z" fill="#263941"/><path d="M0 0 L170 0 L320 405 L0 405Z" fill="#182832"/><path d="M900 0 L730 0 L580 405 L900 405Z" fill="#182832"/><path d="M390 90 L510 90 L510 405 L390 405Z" fill="#14222a" stroke="#65716b" stroke-width="5"/><rect x="404" y="104" width="92" height="296" fill="#273640"/><rect x="435" y="166" width="30" height="90" fill="#6b806f" opacity=".4"/><rect x="70" y="175" width="182" height="175" fill="#273941" stroke="#87938a" stroke-width="7"/><rect x="98" y="202" width="126" height="120" fill="url(#glass)"/><path d="M160 202 L160 322 M98 262 L224 262" stroke="#96a9a6" stroke-width="6"/><path d="M252 172 L252 350" stroke="#081922" stroke-width="14"/><rect x="665" y="159" width="170" height="260" fill="#38494c" stroke="#73817c" stroke-width="5"/><path d="M721 164 L721 415 M779 164 L779 415 M665 289 L835 289" stroke="#24333a" stroke-width="6"/><circle cx="704" cy="239" r="5" fill="#b4a67e"/><circle cx="763" cy="239" r="5" fill="#b4a67e"/><rect x="286" y="133" width="84" height="61" fill="#c0ac7e" opacity=".62"/><path d="M310 145 L352 145 M310 156 L353 156 M310 167 L339 167" stroke="#40525a" stroke-width="3"/><circle cx="450" cy="96" r="37" fill="#c1b692" stroke="#13262e" stroke-width="7"/><path d="M450 96 L450 73 M450 96 L469 101" stroke="#263b41" stroke-width="4"/>`+lamp+`</svg>`;
  if(index===1) return base+frame+`<rect x="156" y="81" width="586" height="238" fill="#25443f" stroke="#776f58" stroke-width="14"/><path d="M225 135 L600 135 M309 195 L553 195 M350 240 L590 240" stroke="#b9c5ad" stroke-opacity=".55" stroke-width="4"/><path d="M0 60 L131 60 L131 342 L0 342" fill="url(#glass)" stroke="#adb7a5" stroke-width="11"/><path d="M65 65 L65 340 M0 200 L131 200" stroke="#a4b6ac" stroke-width="8"/><rect x="725" y="65" width="130" height="354" fill="#364541" stroke="#8c8971" stroke-width="8"/><circle cx="746" cy="267" r="6" fill="#c3ae76"/><path d="M80 414 L190 386 L300 430 L178 470Z M335 413 L442 387 L558 429 L438 466Z M597 413 L711 383 L828 429 L707 470Z" fill="#564d3e" stroke="#a28b68" stroke-width="5"/><path d="M112 465 L109 540 M269 437 L274 524 M367 457 L358 544 M529 433 L537 532 M628 460 L622 540 M801 433 L805 526" stroke="#7b7360" stroke-width="10"/><rect x="280" y="337" width="342" height="61" fill="#665d48" stroke="#af9771" stroke-width="5"/><rect x="335" y="395" width="229" height="41" fill="#3d3833" stroke="#948165" stroke-width="4"/><rect x="474" y="408" width="7" height="8" fill="#d4ae72"/>`+lamp+`</svg>`;
  if(index===2) return base+frame+`<rect x="0" y="42" width="278" height="371" fill="#2b393a" stroke="#7a775f" stroke-width="8"/><rect x="310" y="42" width="284" height="371" fill="#2b393a" stroke="#7a775f" stroke-width="8"/><rect x="632" y="42" width="269" height="371" fill="#2b393a" stroke="#7a775f" stroke-width="8"/><path d="M0 159 L900 159 M0 285 L900 285" stroke="#948467" stroke-width="12"/><g fill="#75806c"><rect x="20" y="61" width="25" height="92"/><rect x="67" y="72" width="31" height="81"/><rect x="110" y="56" width="18" height="97"/><rect x="143" y="69" width="41" height="84"/><rect x="204" y="61" width="23" height="92"/><rect x="337" y="65" width="24" height="88"/><rect x="377" y="72" width="35" height="81"/><rect x="432" y="60" width="25" height="93"/><rect x="478" y="77" width="44" height="76"/><rect x="546" y="60" width="24" height="93"/><rect x="657" y="59" width="21" height="94"/><rect x="694" y="65" width="31" height="88"/><rect x="746" y="56" width="25" height="97"/><rect x="795" y="69" width="42" height="84"/></g><g fill="#8e7259"><rect x="12" y="181" width="37" height="98"/><rect x="66" y="199" width="25" height="80"/><rect x="110" y="180" width="38" height="99"/><rect x="172" y="196" width="32" height="83"/><rect x="335" y="186" width="34" height="93"/><rect x="387" y="195" width="38" height="84"/><rect x="448" y="182" width="28" height="97"/><rect x="497" y="192" width="41" height="87"/><rect x="657" y="187" width="28" height="92"/><rect x="700" y="195" width="35" height="84"/><rect x="756" y="182" width="37" height="97"/><rect x="817" y="195" width="27" height="84"/></g><path d="M159 458 L770 458 L855 553 L80 553Z" fill="#615843" stroke="#a38c69" stroke-width="8"/><path d="M178 552 L178 620 M752 552 L752 620" stroke="#504738" stroke-width="18"/><rect x="763" y="249" width="77" height="157" fill="#4e5b57" stroke="#b39b73" stroke-width="5"/><path d="M764 328 L840 328" stroke="#9a8970" stroke-width="4"/>`+lamp+`</svg>`;
  return base+frame+`<rect x="20" y="55" width="285" height="320" fill="#24343c" stroke="#88928a" stroke-width="9"/><rect x="40" y="75" width="244" height="281" fill="#42636b" opacity=".55"/><path d="M40 220 L284 220 M162 75 L162 356" stroke="#9baaa2" stroke-width="8"/><rect x="350" y="92" width="205" height="147" rx="5" fill="#10252b" stroke="#6d827e" stroke-width="10"/><path d="M372 186 Q395 187 406 155 Q428 219 447 146 Q464 191 476 170 Q492 183 530 166" fill="none" stroke="#a9c9ae" stroke-width="4"/><rect x="609" y="54" width="258" height="340" fill="#485756" stroke="#91876d" stroke-width="8"/><path d="M632 96 L841 96 M632 153 L841 153 M632 210 L841 210 M632 267 L841 267" stroke="#1d3239" stroke-width="12"/><circle cx="663" cy="122" r="10" fill="#c9ac72"/><circle cx="706" cy="122" r="10" fill="#9cb6a5"/><circle cx="748" cy="122" r="10" fill="#c9ac72"/><path d="M117 443 L729 411 L845 526 L33 568Z" fill="#344648" stroke="#a28e6f" stroke-width="9"/><rect x="154" y="425" width="289" height="80" fill="#172b30" stroke="#8a9e92" stroke-width="7"/><rect x="171" y="438" width="107" height="40" fill="#193b39"/><path d="M183 458 L265 458" stroke="#8dc1a5" stroke-width="3"/><circle cx="329" cy="463" r="19" fill="#9c8b6d"/><circle cx="387" cy="463" r="19" fill="#9c8b6d"/><path d="M520 428 L520 367 M488 367 L551 367 M520 367 Q481 318 520 308 Q559 318 520 367" stroke="#b8b39b" stroke-width="8" fill="none"/><path d="M520 439 L520 496" stroke="#b8b39b" stroke-width="5"/>`+lamp+`</svg>`;
}

function render() {
  const room = rooms[state.room];
  const solved = state.room < state.unlocked || (state.room===3 && state.finalUnlocked);
  $('timer').textContent = timeText();
  $('chapter-label').textContent = `CHAPTER ${pad(state.room+1)} — ${room.english}`;
  $('room-title').textContent = room.name;
  $('room-subtitle').textContent = room.subtitle;
  $('scene-count').textContent = `${pad(state.room+1)} / 04`;
  $('scene-coordinate').textContent = room.location;
  $('scene-art').innerHTML = roomArt(state.room);
  $('objective-number').innerHTML = `${pad(state.room+1)}<span>/04</span>`;
  $('objective-title').textContent = state.finalUnlocked && state.room===3 ? '指出真相' : solved ? '已取得關鍵線索' : room.objective;
  $('objective-description').textContent = state.finalUnlocked && state.room===3 ? '根據取得的錄音和文件，判斷誰掩蓋了林澄掌握的證據。' : solved ? '這個房間已解鎖。你仍可回來查看尚未發現的物件。' : room.description;
  $('puzzle-prompt').textContent = state.finalUnlocked && state.room===3 ? '誰利用權限掩蓋試題交易？' : solved ? '密碼已解開' : room.prompt;
  $('puzzle-status').textContent = state.finalUnlocked && state.room===3 ? 'FINAL' : solved ? 'OPEN' : 'LOCKED';
  $('code-form').classList.toggle('hidden', solved);
  $('hint-button').classList.toggle('hidden', solved);
  $('code-input').value = '';
  $('code-message').textContent = state.finalUnlocked && state.room===3 ? '錄音、簽核文件和識別證紀錄指向同一人。' : solved ? '你可以使用左側場景列表繼續調查。' : '仔細閱讀找到的線索。';
  $('code-message').className = 'code-message';
  $('progress-text').textContent = `${state.finalUnlocked ? 4 : state.unlocked} / 4`;
  $('progress-fill').style.width = `${(state.finalUnlocked ? 4 : state.unlocked)*25}%`;
  $('room-nav').innerHTML = rooms.map((r,i)=>`<button type="button" class="room-button ${i===state.room?'active':''}" data-room="${i}" ${i>state.unlocked?'disabled':''} aria-label="${r.name}${i>state.unlocked?'，未解鎖':''}"><span class="room-no">${pad(i+1)}</span><span class="room-name">${r.name}</span><span class="room-state">${i>state.unlocked?'⌁':i<state.unlocked||state.finalUnlocked&&i===3?'✓':'→'}</span></button>`).join('');
  $('room-nav').querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>switchRoom(Number(button.dataset.room))));
  $('hotspots').innerHTML = room.objects.map(obj=>`<button type="button" class="hotspot ${state.seen.includes(seenKey(state.room,obj.id))?'visited':''}" style="left:${obj.x}%;top:${obj.y}%" data-id="${obj.id}" aria-label="調查${obj.name}"><span class="hotspot-icon">${obj.icon}</span><span>${obj.name}</span><i class="hotspot-dot"></i></button>`).join('');
  $('mobile-object-list').innerHTML = room.objects.map(obj=>`<button type="button" class="mobile-object-button ${state.seen.includes(seenKey(state.room,obj.id))?'visited':''}" data-id="${obj.id}"><span>${obj.icon}</span>${obj.name}</button>`).join('');
  document.querySelectorAll('[data-id]').forEach(button=>button.addEventListener('click',()=>inspect(button.dataset.id)));
  $('scene-footer-right').textContent = `已發現 ${room.objects.filter(o=>state.seen.includes(seenKey(state.room,o.id))).length} / ${room.objects.length} 件`;
  const clues = [];
  rooms.forEach((r,i)=>{
    r.objects.forEach(o=>{if(state.seen.includes(seenKey(i,o.id))) clues.push({room:r.name,...o});});
    if(state.seen.includes(seenKey(i,'reward'))) clues.push({room:r.name,...r.reward});
  });
  $('clue-count').textContent = `${clues.length} 條`;
  $('clue-list').innerHTML = clues.length ? clues.reverse().map(c=>`<div class="clue-item"><small>${c.room}</small><strong>${c.name}</strong><span>${c.note}</span></div>`).join('') : '<p class="empty-note">點選場景中的物件，線索會記在這裡。</p>';
  const hintLevel = Math.min(3,Number(state.hints[state.room])||0);
  $('hint-content').classList.toggle('open',hintLevel>0&&!solved);
  $('hint-content').textContent = hintLevel ? `提示 ${hintLevel} / 3：${room.hints[hintLevel-1]}` : '';
  $('hint-button').querySelector('span:nth-child(2)').textContent = hintLevel===0 ? '需要一點提示？' : hintLevel<3 ? '再給我一點提示' : '已顯示完整提示';
  renderFinalChoices();
}

function renderFinalChoices() {
  let answers = $('final-answers');
  if (!answers) { answers = document.createElement('div'); answers.id='final-answers'; answers.className='final-answers'; $('code-form').after(answers); }
  answers.classList.toggle('hidden', !state.finalUnlocked || state.room!==3 || state.complete);
  answers.innerHTML = '<button type="button" data-answer="shen">教務主任・沈國維 <span>↗</span></button><button type="button" data-answer="guard">工友・許伯 <span>↗</span></button><button type="button" data-answer="lin">林澄本人 <span>↗</span></button>';
  answers.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>answer(button.dataset.answer)));
}

function inspect(id) {
  const obj = rooms[state.room].objects.find(o=>o.id===id); if(!obj) return;
  const key = seenKey(state.room,id); if(!state.seen.includes(key)){state.seen.push(key);save();render();}
  showModal({eyebrow:`EVIDENCE / ${rooms[state.room].name}`, ...obj, tag:`已加入調查筆記 · ${rooms[state.room].location}`});
}

function showModal({eyebrow='EVIDENCE',name,icon='✦',body,tag=''}) {
  returnFocus = document.activeElement;
  $('modal-eyebrow').textContent=eyebrow;
  $('modal-title').textContent=name;
  $('modal-icon').textContent=icon;
  $('modal-body').innerHTML=body;
  $('modal-tag').textContent=tag;
  $('modal').classList.remove('hidden');
  $('modal-close').focus();
}

function closeModal() { $('modal').classList.add('hidden'); if(returnFocus?.isConnected) returnFocus.focus(); }

function switchRoom(index) { if(index<0||index>state.unlocked) return; state.room=index;save();render(); window.scrollTo({top:0,behavior:'smooth'}); }

function rewardCurrentRoom() {
  const index=state.room;
  if(index<3){ state.unlocked=Math.max(state.unlocked,index+1); state.room=index+1; }
  else state.finalUnlocked=true;
  const key=seenKey(index,'reward'); if(!state.seen.includes(key)) state.seen.push(key);
  save();render();
  showModal({eyebrow:'NEW EVIDENCE / 解鎖成功',...rooms[index].reward,tag:index<3?`新場景已解鎖 · ${rooms[index+1].name}`:'最後的推理 · 請指出掩蓋真相的人'});
}

function answer(choice) {
  if(choice==='shen') {
    state.complete=true; save();
    $('ending-story').innerHTML='沈國維在 21:22 關閉監視器，又在 21:30 簽下假的轉學文件，企圖掩蓋試題交易。林澄早已在 22:05 帶著原始證據離校。你將錄音和紀錄公開，這一次，她的聲音沒有被抹去。';
    $('ending-clues').textContent=state.seen.length;
    $('ending-time').textContent=timeText();
    $('ending-hints').textContent=state.hints.reduce((a,b)=>a+b,0);
    $('ending').classList.remove('hidden');
  } else {
    $('code-message').textContent=choice==='guard'?'許伯沒有管理員識別證。再看監視器紀錄與簽核文件。':'林澄留下了錄音；想想是誰簽署假文件並關閉監視器。';
    $('code-message').className='code-message error';
  }
}

function restart(confirmFirst=true) {
  if(confirmFirst && !window.confirm('確定要清除目前進度並重新開始嗎？')) return;
  state=defaultState();save();
  $('ending').classList.add('hidden');
  $('intro').classList.remove('hidden');
  render();
}

$('code-form').addEventListener('submit',event=>{
  event.preventDefault();
  const input=$('code-input').value.trim();
  if(input===rooms[state.room].code) rewardCurrentRoom();
  else { $('code-message').textContent='密碼不正確。再對照場景中的線索。'; $('code-message').className='code-message error'; $('code-input').select(); }
});
$('code-input').addEventListener('input',event=>{event.target.value=event.target.value.replace(/\D/g,'').slice(0,4);});
$('hint-button').addEventListener('click',()=>{
  const i=state.room;
  state.hints[i]=Math.min(3,(Number(state.hints[i])||0)+1);save();
  $('hint-content').textContent=`提示 ${state.hints[i]} / 3：${rooms[i].hints[state.hints[i]-1]}`;
  $('hint-content').classList.add('open');
  $('hint-button').querySelector('span:nth-child(2)').textContent=state.hints[i]<3?'再給我一點提示':'已顯示完整提示';
});
$('modal-close').addEventListener('click',closeModal);
$('modal-action').addEventListener('click',closeModal);
$('modal').addEventListener('click',event=>{if(event.target===$('modal')) closeModal();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('modal').classList.contains('hidden')) closeModal();});
$('start-button').addEventListener('click',()=>{state.started=true;save();$('intro').classList.add('hidden');});
$('restart-button').addEventListener('click',()=>restart(true));
$('ending-restart').addEventListener('click',()=>restart(false));
$('notes-toggle').addEventListener('click',()=>{const panel=document.querySelector('.case-panel');const open=panel.classList.toggle('notes-open');$('notes-toggle').setAttribute('aria-expanded',String(open));$('notes-toggle').querySelector('span').textContent=open?'−':'＋';});

render();
if(state.started) $('intro').classList.add('hidden');
if(state.complete) { $('ending-story').innerHTML='沈國維在 21:22 關閉監視器，又在 21:30 簽下假的轉學文件，企圖掩蓋試題交易。林澄早已在 22:05 帶著原始證據離校。你將錄音和紀錄公開，這一次，她的聲音沒有被抹去。'; $('ending-clues').textContent=state.seen.length; $('ending-time').textContent=timeText(); $('ending-hints').textContent=state.hints.reduce((a,b)=>a+b,0); $('ending').classList.remove('hidden'); }
setInterval(()=>{if(state.started&&!state.complete){state.seconds++;$('timer').textContent=timeText();if(state.seconds%10===0)save();}},1000);
