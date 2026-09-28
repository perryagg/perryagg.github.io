const LIGHTHOUSE_SAVE_KEY = 'fog-harbor-save-v1';

const stages = [
  {
    name:'封港碼頭', english:'THE PIER', location:'霧港・舊碼頭', subtitle:'雨還沒停，旗桿上只剩空繩在拍打。', objective:'升起回航旗語', description:'從碼頭紀錄還原四面旗的升起順序。', prompt:'依事件先後點選四面旗', type:'sequence',
    hints:['先讀航海日誌、潮汐記錄和最後一張照片。', '海鳥在潮汐之前；船笛在潮汐之後；燈火出現在最後。', '順序是海鳥 → 潮汐 → 船笛 → 燈火。'],
    objects:[
      {id:'flagbook',name:'旗語手冊',icon:'⚑',x:25,y:24,note:'四面旗分別代表海鳥、潮汐、船笛、燈火；依事件順序升起。',body:'老舊手冊的封面寫著：「四面旗記錄曙光號最後看到的四件事。<strong>照事件發生順序</strong>升旗，守燈人的房門才會開。」'},
      {id:'log',name:'航海日誌',icon:'▤',x:58,y:59,note:'海鳥先出現；潮汐轉向之後，船笛才響起。',body:'被雨浸濕的日誌還能讀出幾行：<blockquote>「海鳥掠過船首時，霧還很薄。潮汐轉向後，我們才吹響船笛。」</blockquote>'},
      {id:'tide',name:'潮汐紀錄',icon:'≈',x:14,y:62,note:'潮汐轉向發生在海鳥與船笛之間。',body:'記錄板用箭頭標著：<strong>海鳥 → 潮汐轉向 → 船笛</strong>。這是水手確認航向的慣用記號。'},
      {id:'photo',name:'最後一張照片',icon:'▧',x:80,y:45,note:'燈火出現在最後一張照片裡。',body:'四張底片中，最後一張拍到遠處的燈塔終於亮起。照片背面寫著：「燈火是我們等到的<strong>最後訊號</strong>。」'},
      {id:'flagpole',name:'上鎖的旗桿',icon:'⌁',x:72,y:18,note:'旗桿機關等待四面旗的正確順序。',body:'旗繩連著一只機械鎖。你可以在右側依順序選擇四面旗；若排錯，也能撤回重排。'}
    ],
    reward:{name:'守燈人的房門打開了',icon:'⚿',note:'升旗機關開啟守燈人書房，門內留下三片彩色鏡片。',body:'四面旗依序升起，碼頭盡頭的房門傳來輕響。桌上攤著航圖與三片鏡片，守燈人似乎把下一步藏在航道裡。'}
  },
  {
    name:'守燈人書房', english:'THE KEEPER ROOM', location:'燈塔・守燈人書房', subtitle:'航圖上的三條路線，被三片不同顏色的鏡片遮住。', objective:'配對航道鏡片', description:'依日誌中的限制，把紅、藍、白鏡片放到正確航道。', prompt:'每片鏡片只能使用一次', type:'matching',
    hints:['先確認南港使用的顏色，再排除北礁不可能使用的鏡片。', '南港是白鏡；北礁不是藍鏡，也不能用已分給南港的白鏡。', '北礁紅鏡、東灣藍鏡、南港白鏡。'],
    objects:[
      {id:'chart',name:'三條航道圖',icon:'⌖',x:52,y:29,note:'航圖標出北礁、東灣和南港三條航道。',body:'航圖的北方畫著暗礁，東側是狹窄水道，南方則是避風港。三條航道各留了一個鏡片槽：<strong>北礁、東灣、南港</strong>。'},
      {id:'white',name:'鏡片登記簿',icon:'◉',x:22,y:61,note:'南港的回航訊號必須使用白鏡片。',body:'登記簿寫著：「<strong>南港使用白鏡</strong>；這道光在濃霧中最容易被等待救援的船辨認。」'},
      {id:'blue',name:'守燈人便條',icon:'✎',x:72,y:69,note:'藍鏡片不能照北礁。',body:'便條只寫了一句：「<strong>北礁絕不用藍鏡</strong>。藍光會與暗礁上的舊浮標混在一起。」'},
      {id:'red',name:'紅色警示標',icon:'◆',x:80,y:35,note:'紅鏡片不照東灣。',body:'東灣旁貼著警示：「<strong>紅鏡片不可照東灣</strong>，否則船會以為主航道封閉。」'},
      {id:'lensbox',name:'鏡片盒',icon:'▣',x:40,y:78,note:'三片鏡片要分別對應三條航道。',body:'盒中只有紅、藍、白三片鏡片。每片只能裝進一個航道槽；配對正確，機房的門鎖就會釋放。'}
    ],
    reward:{name:'機房鑰匙',icon:'⚿',note:'三片鏡片歸位，機房門開啟；守燈人留下發電機檢查記錄。',body:'鏡片依正確航道折射出三束光，照在機房門鎖上。你拿到鑰匙，聽見裡面仍有機器低低運轉。'}
  },
  {
    name:'潮濕機房', english:'THE ENGINE ROOM', location:'燈塔・地下機房', subtitle:'發電機還在運轉，三只閥門卻被轉向了錯誤位置。', objective:'校準三只閥門', description:'讀取方位圖與維護手冊，逐一轉動閥門。', prompt:'點擊閥門使箭頭轉向正確方位', type:'valves',
    hints:['先找方位圖：海在西、村在東、燈塔正面朝北。', '進水迎向海，冷卻背向塔正面，排水朝村。', '進水向西 ←；冷卻向南 ↓；排水向東 →。'],
    objects:[
      {id:'compass',name:'牆上方位圖',icon:'✥',x:48,y:20,note:'機房西面是海，東面是村，燈塔正面朝北。',body:'生鏽的方位圖仍可辨認：<blockquote>北：燈塔正面<br>東：漁村<br>西：海面<br>南：山坡</blockquote>三只閥門上的箭頭都以這張圖為基準。'},
      {id:'intake',name:'進水管手冊',icon:'≈',x:19,y:55,note:'進水閥必須迎向海面。',body:'維護手冊第一頁寫著：「<strong>進水閥迎向海面</strong>，浪頭才會推動備用水輪。」'},
      {id:'cooling',name:'冷卻閥便條',icon:'◇',x:48,y:63,note:'冷卻閥要背向燈塔正面。',body:'工匠的便條寫著：「<strong>冷卻閥背向燈塔正面</strong>，別讓熱氣吹向透鏡。」'},
      {id:'drain',name:'排水管箭頭',icon:'→',x:79,y:56,note:'排水閥應朝向漁村。',body:'管道旁刻著一行字：「<strong>排水閥朝向漁村</strong>，這條舊管會把積水導回岸上的蓄水池。」'},
      {id:'generator',name:'發電機紀錄',icon:'▥',x:69,y:84,note:'昨夜 23:40 發電機仍在供電，主燈不是停電熄滅。',body:'紀錄紙沒有斷線：<strong>23:40，發電機仍正常供電</strong>。燈塔失去主光束的原因，恐怕不在這座機房。'}
    ],
    reward:{name:'備用電源恢復',icon:'✦',note:'三只閥門校準，訊號室得到穩定電源。',body:'水輪重新轉動，備用燈帶一盞盞亮起。訊號室的門鎖隨之解開；你聽見裡面傳來微弱的船舶呼叫。'}
  },
  {
    name:'訊號室', english:'THE SIGNAL ROOM', location:'燈塔・訊號室', subtitle:'九盞訊號燈還能亮，卻需要重現一幅從海上看見的圖案。', objective:'重現鏡像燈號', description:'將海面視角的燈號左右翻轉，在控制台點亮九宮格。', prompt:'點擊燈泡切換亮暗', type:'lamps',
    hints:['玻璃圖案是從海上看向燈塔；控制台卻在燈塔內側。', '只需要左右翻轉，不要上下倒置，也不要旋轉。', '由上到下應是：○ ○ ● ／ ○ ● ● ／ ○ ○ ●。'],
    objects:[
      {id:'glass',name:'刻花玻璃',icon:'▦',x:22,y:36,note:'海面視角圖案：●○○／●●○／●○○。',body:'刻花玻璃保存著從海上看見的九盞燈：<blockquote class="lh-pattern">● ○ ○<br>● ● ○<br>● ○ ○</blockquote>旁邊標著「<strong>海面視角</strong>」。'},
      {id:'mirror',name:'控制台鏡面',icon:'◇',x:73,y:32,note:'控制台在塔內，與海面視角左右相反。',body:'控制台上方的鏡面寫著：「人在塔內操作，圖案從海上看。<strong>左右要顛倒</strong>，上下保持不變。」'},
      {id:'manual',name:'燈號說明卡',icon:'?',x:53,y:65,note:'● 表示亮；○ 表示暗；不要旋轉整張圖。',body:'說明卡提醒：「● 是點亮、○ 是關閉。這面鏡子只左右顛倒，<strong>不要把整張圖旋轉</strong>。」'},
      {id:'voice',name:'船舶呼叫',icon:'♫',x:83,y:76,note:'曙光號還在回應燈號，船員可能仍在附近。',body:'收音機裡有破碎的聲音：「……我們看見反寫的旗……還在等你們把燈對準……」訊號沒有完全中斷。'},
      {id:'panel',name:'九宮格燈盤',icon:'▣',x:35,y:82,note:'燈盤能逐格開關；正確圖案會解鎖塔頂。',body:'九盞小燈都可以單獨開關。輸入從塔內應顯示的圖案，塔頂的機械門就會鬆開。'}
    ],
    reward:{name:'曙光號的回覆',icon:'♫',note:'訊號解碼後，曙光號傳回「南灣暫避，全員平安」。',body:'燈盤亮成正確圖案，收音機突然清晰：「<strong>曙光號已在南灣暫避，全員平安</strong>。主燈仍照著北礁，請把救援送往南灣。」塔頂的門打開了。'}
  },
  {
    name:'塔頂燈室', english:'THE LANTERN TOWER', location:'燈塔・塔頂燈室', subtitle:'主透鏡依然亮著，光束卻固執地照向危險的北礁。', objective:'決定最後的救援訊號', description:'把航圖、電力與透鏡證據串起來，送出正確的救援方案。', prompt:'選出三個結論，確認後發送', type:'deduction',
    hints:['訊號室的回覆已經說出船的位置。再比較機房與透鏡的紀錄。', '發電機從未停止；主光束因透鏡被手動轉向而偏離。', '船在南灣；原因是透鏡被轉動；應通知救援艇前往南灣。'],
    objects:[
      {id:'map',name:'避風航圖',icon:'⌖',x:21,y:45,note:'南灣是避風港；北礁與東灣都不適合等待救援。',body:'塔頂航圖把南灣標為「<strong>暴風避難區</strong>」，北礁畫滿暗石，東灣水道太窄。曙光號的回覆也提到了南灣。'},
      {id:'reply',name:'船舶回覆紙帶',icon:'▥',x:40,y:77,note:'曙光號回覆「南灣暫避，全員平安」。',body:'紙帶完整寫著：「<strong>南灣暫避，全員平安，等待救援</strong>。」這份記錄比港務台的失聯公告更新。'},
      {id:'reflector',name:'透鏡固定栓',icon:'◉',x:67,y:32,note:'主透鏡有新鮮刮痕，曾被人手動轉向北礁。',body:'固定栓的油漆被磨掉，螺帽旁留著新鮮刮痕。主透鏡不是自行偏移，<strong>有人手動把它轉向北礁</strong>。'},
      {id:'power',name:'電力曲線',icon:'⌁',x:80,y:69,note:'23:40 前後供電沒有中斷；主燈一直亮著。',body:'電力曲線從 23:00 到午夜都維持穩定。機房紀錄也寫明 23:40 仍有供電；<strong>這不是停電事故</strong>。'},
      {id:'rescue',name:'救援電台',icon:'✦',x:51,y:51,note:'救援電台可一次送出船隻位置、原因與行動。',body:'電台上有三個必填欄位：船的所在航道、燈光偏離原因、救援艇的目的地。若填錯，救援船可能駛向暗礁。'}
    ]
  }
];

const initialState = () => ({started:false,complete:false,chapter:0,unlocked:0,seen:[],seconds:0,hints:[0,0,0,0,0],flags:[],routes:{north:'',east:'',south:''},valves:[0,0,0],lamps:[],deduction:{route:'',cause:'',action:''}});
let state = initialState();
try { const saved=JSON.parse(localStorage.getItem(LIGHTHOUSE_SAVE_KEY)); if(saved && typeof saved==='object') state={...state,...saved}; } catch (_) {}
state.chapter=Math.min(4,Math.max(0,Number(state.chapter)||0));
state.unlocked=Math.min(4,Math.max(0,Number(state.unlocked)||0));
state.chapter=Math.min(state.chapter,state.unlocked);
state.seen=Array.isArray(state.seen)?state.seen:[];
state.hints=Array.isArray(state.hints)&&state.hints.length===5?state.hints:[0,0,0,0,0];
state.flags=Array.isArray(state.flags)?state.flags:[];
state.routes={...initialState().routes,...(state.routes||{})};
state.valves=Array.isArray(state.valves)&&state.valves.length===3?state.valves:[0,0,0];
state.lamps=Array.isArray(state.lamps)?state.lamps:[];
state.deduction={...initialState().deduction,...(state.deduction||{})};

const $ = id => document.getElementById(id);
const save = () => { try { localStorage.setItem(LIGHTHOUSE_SAVE_KEY,JSON.stringify(state)); } catch (_) {} };
const pad = n => String(n).padStart(2,'0');
const timeText = () => `${pad(Math.floor(state.seconds/60))}:${pad(state.seconds%60)}`;
const seenKey = (i,id) => `${i}:${id}`;
let priorFocus = null;

function sceneArt(index) {
  const start='<svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#203f54"/><stop offset="1" stop-color="#406777"/></linearGradient><linearGradient id="sea" x2="0" y2="1"><stop stop-color="#426b70"/><stop offset="1" stop-color="#102f3c"/></linearGradient><radialGradient id="glow"><stop stop-color="#cce8c1" stop-opacity=".55"/><stop offset="1" stop-color="#a9d6bd" stop-opacity="0"/></radialGradient></defs>';
  const outside='<rect width="900" height="620" fill="url(#sky)"/><circle cx="640" cy="130" r="57" fill="#d6e8d5" opacity=".6"/><ellipse cx="640" cy="140" rx="240" ry="170" fill="url(#glow)"/><path d="M0 320 Q180 303 350 325 Q630 299 900 332 L900 620 L0 620Z" fill="url(#sea)"/><path d="M0 360 Q170 346 310 365 Q540 340 900 370 M0 431 Q250 410 480 438 Q710 411 900 440 M0 513 Q270 492 470 517 Q700 487 900 523" stroke="#a5c9bd" stroke-opacity=".18" stroke-width="7" fill="none"/><path d="M0 306 Q70 286 170 299 Q280 280 365 301" stroke="#91b3aa" opacity=".3" stroke-width="8" fill="none"/>';
  if(index===0)return start+outside+'<path d="M0 440 L440 390 L630 620 L0 620Z" fill="#5a5a50" stroke="#a1a793" stroke-width="8"/><path d="M0 485 L478 433 M0 548 L526 498 M125 620 L125 427 M285 620 L285 406" stroke="#8d9889" stroke-width="8"/><path d="M680 315 L828 315 L789 355 L710 355Z" fill="#182f3a"/><path d="M755 315 L755 223" stroke="#aec4b9" stroke-width="5"/><path d="M756 234 L811 260 L756 271Z" fill="#d5c79c"/><path d="M155 355 L155 89" stroke="#c4c5ac" stroke-width="8"/><path d="M155 105 L215 126 L155 146Z M155 172 L216 193 L155 213Z M155 239 L215 260 L155 280Z" fill="#a6bcb0" stroke="#dde3cd" stroke-width="3"/><rect x="397" y="349" width="83" height="68" fill="#8b8d75"/><path d="M402 365 L474 365 M402 382 L465 382" stroke="#344751" stroke-width="4"/></svg>';
  const room='<rect width="900" height="620" fill="#213c46"/><path d="M0 390 L900 390 L900 620 L0 620Z" fill="#253941"/><path d="M0 390 L900 390" stroke="#66817f" stroke-width="7"/><rect x="35" y="68" width="246" height="287" fill="url(#sky)" stroke="#99aaa1" stroke-width="12"/><path d="M158 69 L158 355 M36 208 L281 208" stroke="#a9b8aa" stroke-width="8"/><circle cx="204" cy="151" r="28" fill="#dce5cc" opacity=".65"/><path d="M0 520 L900 455 M0 620 L900 490" stroke="#647b76" stroke-opacity=".28" stroke-width="4"/>';
  if(index===1)return start+room+'<rect x="346" y="95" width="375" height="263" fill="#5a665b" stroke="#a9a28d" stroke-width="9"/><path d="M369 130 L680 130 M369 176 L680 176 M369 222 L680 222 M369 268 L680 268" stroke="#9aa995" stroke-width="3"/><path d="M415 121 L477 180 L570 120 L645 202" stroke="#e0cfa9" stroke-width="5" fill="none"/><path d="M213 415 L755 386 L870 493 L134 546Z" fill="#685f4b" stroke="#ac9d79" stroke-width="7"/><circle cx="422" cy="426" r="33" fill="#ba6e68"/><circle cx="537" cy="418" r="33" fill="#6b9aaa"/><circle cx="654" cy="412" r="33" fill="#d7d8c6"/><path d="M211 546 L211 620 M759 506 L759 620" stroke="#5c5548" stroke-width="18"/></svg>';
  if(index===2)return start+room+'<path d="M0 160 L900 160 M0 340 L900 340" stroke="#6a7b77" stroke-width="25"/><path d="M84 0 L84 605 M312 0 L312 605 M738 0 L738 605" stroke="#84938a" stroke-width="27"/><rect x="358" y="122" width="260" height="230" rx="12" fill="#344d51" stroke="#91a99d" stroke-width="10"/><circle cx="489" cy="233" r="64" fill="#132d36" stroke="#c8b990" stroke-width="11"/><path d="M489 183 L489 281 M440 233 L538 233" stroke="#b8d3c2" stroke-width="8"/><circle cx="192" cy="485" r="58" fill="#233941" stroke="#a8bba9" stroke-width="13"/><circle cx="454" cy="485" r="58" fill="#233941" stroke="#a8bba9" stroke-width="13"/><circle cx="720" cy="485" r="58" fill="#233941" stroke="#a8bba9" stroke-width="13"/><path d="M192 441 L192 529 M148 485 L236 485 M454 441 L454 529 M410 485 L498 485 M720 441 L720 529 M676 485 L764 485" stroke="#b9cdb8" stroke-width="8"/></svg>';
  if(index===3)return start+room+'<rect x="65" y="57" width="255" height="318" fill="url(#sky)" stroke="#9badab" stroke-width="10"/><path d="M192 57 L192 375 M65 214 L320 214" stroke="#b5c3b2" stroke-width="8"/><rect x="392" y="68" width="404" height="298" fill="#263c43" stroke="#829a94" stroke-width="10"/><g fill="#b1d6b6"><circle cx="467" cy="138" r="21"/><circle cx="590" cy="138" r="21"/><circle cx="712" cy="138" r="21"/><circle cx="467" cy="221" r="21"/><circle cx="590" cy="221" r="21"/><circle cx="712" cy="221" r="21"/><circle cx="467" cy="302" r="21"/><circle cx="590" cy="302" r="21"/><circle cx="712" cy="302" r="21"/></g><path d="M85 473 L786 433 L878 534 L35 580Z" fill="#41565a" stroke="#9eaa95" stroke-width="9"/><rect x="220" y="452" width="230" height="56" fill="#173039"/><path d="M250 482 Q290 450 320 484 Q360 505 421 468" fill="none" stroke="#acd1c5" stroke-width="4"/></svg>';
  return start+outside+'<path d="M230 620 L337 148 L558 148 L671 620Z" fill="#d0d0bd" stroke="#708b8c" stroke-width="13"/><path d="M297 356 L606 356 M267 478 L635 478" stroke="#829693" stroke-width="12"/><path d="M310 150 L310 60 L578 60 L578 150Z" fill="#1b363d" stroke="#b2bdaa" stroke-width="12"/><path d="M337 72 L550 72 L550 138 L337 138Z" fill="#b8d8bf" opacity=".65"/><path d="M443 62 L443 144" stroke="#647f7c" stroke-width="8"/><path d="M560 93 L900 0 L900 148 L560 126Z" fill="#d2ead0" opacity=".32"/><circle cx="445" cy="104" r="77" fill="url(#glow)"/><rect x="381" y="393" width="126" height="118" fill="#35494c" stroke="#9cae9d" stroke-width="7"/><circle cx="445" cy="453" r="31" fill="#9ebfb3"/></svg>';
}

function render() {
  const stage=stages[state.chapter];
  const solved=state.chapter<state.unlocked || state.complete;
  $('lh-timer').textContent=timeText();
  $('lh-chapter-label').textContent=`CHAPTER ${pad(state.chapter+1)} — ${stage.english}`;
  $('lh-title').textContent=stage.name;
  $('lh-subtitle').textContent=stage.subtitle;
  $('lh-count').textContent=`${pad(state.chapter+1)} / 05`;
  $('lh-location').textContent=stage.location;
  $('lh-art').innerHTML=sceneArt(state.chapter);
  $('lh-objective-no').innerHTML=`${pad(state.chapter+1)}<span>/05</span>`;
  $('lh-objective').textContent=solved?'機關已修復':stage.objective;
  $('lh-objective-desc').textContent=solved?'這個場景已完成。你可以繼續查看尚未發現的線索。':stage.description;
  $('lh-prompt').textContent=solved?'已完成':stage.prompt;
  $('lh-status').textContent=solved?'OPEN':'ACTIVE';
  $('lh-progress-text').textContent=`${state.complete?5:state.unlocked} / 5`;
  $('lh-progress-fill').style.width=`${(state.complete?5:state.unlocked)*20}%`;
  $('lh-nav').innerHTML=stages.map((s,i)=>`<button type="button" class="room-button ${i===state.chapter?'active':''}" data-stage="${i}" ${i>state.unlocked?'disabled':''} aria-label="${s.name}${i>state.unlocked?'，未解鎖':''}"><span class="room-no">${pad(i+1)}</span><span class="room-name">${s.name}</span><span class="room-state">${i>state.unlocked?'⌁':i<state.unlocked||state.complete&&i===4?'✓':'→'}</span></button>`).join('');
  $('lh-nav').querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>switchStage(Number(button.dataset.stage))));
  $('lh-hotspots').innerHTML=stage.objects.map(o=>`<button type="button" class="hotspot ${state.seen.includes(seenKey(state.chapter,o.id))?'visited':''}" style="left:${o.x}%;top:${o.y}%" data-lh-object="${o.id}" aria-label="調查${o.name}"><span class="hotspot-icon">${o.icon}</span><span>${o.name}</span><i class="hotspot-dot"></i></button>`).join('');
  $('lh-objects').innerHTML=stage.objects.map(o=>`<button type="button" class="mobile-object-button ${state.seen.includes(seenKey(state.chapter,o.id))?'visited':''}" data-lh-object="${o.id}"><span>${o.icon}</span>${o.name}</button>`).join('');
  document.querySelectorAll('[data-lh-object]').forEach(button=>button.addEventListener('click',()=>inspect(button.dataset.lhObject)));
  $('lh-footer-count').textContent=`已發現 ${stage.objects.filter(o=>state.seen.includes(seenKey(state.chapter,o.id))).length} / ${stage.objects.length} 件`;
  const clues=[];
  stages.forEach((s,i)=>{s.objects.forEach(o=>{if(state.seen.includes(seenKey(i,o.id)))clues.push({stage:s.name,...o});});if(s.reward&&state.seen.includes(seenKey(i,'reward')))clues.push({stage:s.name,...s.reward});});
  $('lh-clue-count').textContent=`${clues.length} 條`;
  $('lh-clues').innerHTML=clues.length?clues.reverse().map(c=>`<div class="clue-item"><small>${c.stage}</small><strong>${c.name}</strong><span>${c.note}</span></div>`).join(''):'<p class="empty-note">調查物件後，線索會記在這裡。</p>';
  $('lh-feedback').textContent=solved?'使用左側場景列表繼續調查。':'線索分散在場景裡。';
  $('lh-feedback').className='code-message';
  $('lh-hint-button').classList.toggle('hidden',solved);
  const level=Math.min(3,Number(state.hints[state.chapter])||0);
  $('lh-hint-content').classList.toggle('open',level>0&&!solved);
  $('lh-hint-content').textContent=level?`提示 ${level} / 3：${stage.hints[level-1]}`:'';
  $('lh-hint-button').querySelector('span:nth-child(2)').textContent=level===0?'需要一點提示？':level<3?'再給我一點提示':'已顯示完整提示';
  renderChallenge(solved);
}

const flagOptions=[{id:'horn',name:'船笛',symbol:'♪'},{id:'gull',name:'海鳥',symbol:'◇'},{id:'light',name:'燈火',symbol:'✦'},{id:'tide',name:'潮汐',symbol:'≈'}];
const directions=['↑','→','↓','←'];
const routeOptions=[['','選擇鏡片'],['red','紅鏡片'],['blue','藍鏡片'],['white','白鏡片']];
const routeNames=[['north','北礁'],['east','東灣'],['south','南港']];
const deductionFields=[
  {key:'route',label:'01 / 曙光號目前在哪裡？',options:[['','選擇航道'],['north','北礁'],['east','東灣'],['south','南灣']]},
  {key:'cause',label:'02 / 主光束為何偏離？',options:[['','選擇原因'],['power','發電機停電'],['fog','大霧遮住主燈'],['reflector','主透鏡被手動轉向']]},
  {key:'action',label:'03 / 應把救援艇送往何處？',options:[['','選擇行動'],['wait','在碼頭等待'],['reef','搜尋北礁'],['rescue','立即前往南灣']]}
];

function optionHtml(options,value){return options.map(([id,label])=>`<option value="${id}" ${id===value?'selected':''}>${label}</option>`).join('');}

function renderChallenge(solved) {
  const target=$('lh-challenge');
  if(solved){target.innerHTML='<div class="lh-clear-message">機關已啟動。已找到的線索仍可回頭查看。</div><button class="lh-complete-button" type="button" data-action="latest">前往最新場景 →</button>';return;}
  const type=stages[state.chapter].type;
  if(type==='sequence'){
    const selected=state.flags.map(id=>flagOptions.find(x=>x.id===id)?.name).filter(Boolean);
    target.innerHTML=`<p class="lh-instruction">依事件發生先後點選旗幟，完成後按「確認順序」。</p><div class="lh-choice-grid">${flagOptions.map(o=>`<button class="lh-choice" type="button" data-action="flag" data-value="${o.id}" ${state.flags.includes(o.id)?'disabled':''}><span class="symbol">${o.symbol}</span>${o.name}</button>`).join('')}</div><div class="lh-picked"><span>升旗順序</span>${selected.map((name,i)=>`<b>${i+1}. ${name}</b>`).join('')}</div><div class="lh-actions"><button class="lh-secondary" type="button" data-action="undo">撤回</button><button class="lh-secondary" type="button" data-action="clear">重排</button><button class="lh-primary" type="button" data-action="submit">確認順序 →</button></div>`;
  } else if(type==='matching'){
    target.innerHTML=`<p class="lh-instruction">每條航道放一片鏡片，三種顏色各使用一次。</p>${routeNames.map(([key,label])=>`<label class="lh-match-row"><span>${label}</span><select data-route="${key}" aria-label="${label}的鏡片">${optionHtml(routeOptions,state.routes[key])}</select></label>`).join('')}<button class="lh-primary" type="button" data-action="submit">檢查鏡片 →</button>`;
  } else if(type==='valves'){
    target.innerHTML=`<p class="lh-instruction">每點一次閥門，箭頭順時針轉 90 度。</p><div class="lh-valve-grid">${['進水','冷卻','排水'].map((label,i)=>`<button class="lh-valve" type="button" data-action="valve" data-value="${i}" aria-label="${label}閥目前朝${['北','東','南','西'][Number(state.valves[i])||0]}，點擊轉動"><small>${label}閥</small><strong>${directions[Number(state.valves[i])||0]}</strong></button>`).join('')}</div><div class="lh-lamp-key"><span>北 ↑</span><span>東 →</span><span>南 ↓</span><span>西 ←</span></div><button class="lh-primary" type="button" data-action="submit">啟動水輪 →</button>`;
  } else if(type==='lamps'){
    target.innerHTML=`<p class="lh-instruction">重現從塔內看見的九宮格。亮燈位置可反覆點選。</p><div class="lh-lamp-grid">${Array.from({length:9},(_,i)=>`<button class="lh-lamp ${state.lamps.includes(i)?'on':''}" type="button" data-action="lamp" data-value="${i}" aria-label="第 ${Math.floor(i/3)+1} 列第 ${i%3+1} 盞燈，${state.lamps.includes(i)?'亮':'暗'}" aria-pressed="${state.lamps.includes(i)}">${state.lamps.includes(i)?'●':'○'}</button>`).join('')}</div><div class="lh-actions"><button class="lh-secondary" type="button" data-action="clear-lamps">熄滅全部</button><button class="lh-primary" type="button" data-action="submit">發送燈號 →</button></div>`;
  } else {
    target.innerHTML=`<p class="lh-instruction">把三條證據串成救援方案；錯誤航道會讓救援艇駛入暗礁。</p>${deductionFields.map(f=>`<label class="lh-deduction-row">${f.label}<select data-deduction="${f.key}">${optionHtml(f.options,state.deduction[f.key])}</select></label>`).join('')}<button class="lh-primary" type="button" data-action="submit">發送救援方案 →</button>`;
  }
}

function feedback(message,error=false){$('lh-feedback').textContent=message;$('lh-feedback').className=`code-message ${error?'error':'success'}`;}

function submitPuzzle(){
  const type=stages[state.chapter].type;
  if(type==='sequence'){
    if(state.flags.length!==4){feedback('請先選滿四面旗，再確認順序。',true);return;}
    if(state.flags.join(',')!=='gull,tide,horn,light'){feedback('旗語順序不吻合。對照日誌、潮汐板與最後一張照片。',true);return;}
  } else if(type==='matching'){
    const values=Object.values(state.routes);
    if(values.some(v=>!v)){feedback('三條航道都需要一片鏡片。',true);return;}
    if(new Set(values).size!==3){feedback('同一片鏡片不能分給兩條航道。',true);return;}
    if(state.routes.north!=='red'||state.routes.east!=='blue'||state.routes.south!=='white'){feedback('鏡片配對不吻合。先確定南港，再排除北礁的錯誤顏色。',true);return;}
  } else if(type==='valves'){
    if(state.valves.join(',')!=='3,2,1'){feedback('水輪仍沒有正常轉動。查看方位圖，再逐一核對三條管線。',true);return;}
  } else if(type==='lamps'){
    if([...state.lamps].sort((a,b)=>a-b).join(',')!=='2,4,5,8'){feedback('燈號仍是錯的。記得把海面視角的圖案左右翻轉。',true);return;}
  } else {
    const expected={route:'south',cause:'reflector',action:'rescue'};
    const first=['route','cause','action'].findIndex(key=>state.deduction[key]!==expected[key]);
    if(first>=0){feedback(`第 ${first+1} 條結論和找到的證據不符。再查看塔頂與訊號室的記錄。`,true);return;}
  }
  completeStage();
}

function completeStage(){
  const index=state.chapter;
  if(index===4){state.complete=true;save();render();showEnding();return;}
  const key=seenKey(index,'reward');if(!state.seen.includes(key))state.seen.push(key);
  state.unlocked=Math.max(state.unlocked,index+1);
  state.chapter=index+1;
  save();render();
  showModal({eyebrow:'NEW EVIDENCE / 機關已啟動',...stages[index].reward,tag:`新場景已解鎖 · ${stages[index+1].name}`});
}

function inspect(id){
  const object=stages[state.chapter].objects.find(o=>o.id===id);if(!object)return;
  const key=seenKey(state.chapter,id);if(!state.seen.includes(key)){state.seen.push(key);save();render();}
  showModal({eyebrow:`EVIDENCE / ${stages[state.chapter].name}`,...object,tag:`已加入調查筆記 · ${stages[state.chapter].location}`});
}

function showModal({eyebrow='EVIDENCE',name,icon='✦',body,tag=''}){
  priorFocus=document.activeElement;
  $('lh-modal-eyebrow').textContent=eyebrow;
  $('lh-modal-title').textContent=name;
  $('lh-modal-icon').textContent=icon;
  $('lh-modal-body').innerHTML=body;
  $('lh-modal-tag').textContent=tag;
  $('lh-modal').classList.remove('hidden');
  $('lh-modal-close').focus();
}

function closeModal(){$('lh-modal').classList.add('hidden');if(priorFocus?.isConnected)priorFocus.focus();}
function switchStage(index){if(index<0||index>state.unlocked)return;state.chapter=index;save();render();window.scrollTo({top:0,behavior:'smooth'});}
function showEnding(){$('lh-ending-clues').textContent=state.seen.length;$('lh-ending-time').textContent=timeText();$('lh-ending-hints').textContent=state.hints.reduce((sum,n)=>sum+Number(n||0),0);$('lh-ending').classList.remove('hidden');}
function restart(confirmFirst=true){if(confirmFirst&&!window.confirm('確定要清除霧港燈塔的進度並重新開始嗎？'))return;state=initialState();save();$('lh-ending').classList.add('hidden');$('lh-intro').classList.remove('hidden');render();}

$('lh-challenge').addEventListener('click',event=>{
  const button=event.target.closest('button[data-action]');if(!button)return;
  const action=button.dataset.action;
  if(action==='latest'){switchStage(state.unlocked);return;}
  if(action==='flag'&&state.chapter===0){if(!state.flags.includes(button.dataset.value)&&state.flags.length<4){state.flags.push(button.dataset.value);save();renderChallenge(false);}}
  else if(action==='undo'&&state.chapter===0){state.flags.pop();save();renderChallenge(false);}
  else if(action==='clear'&&state.chapter===0){state.flags=[];save();renderChallenge(false);}
  else if(action==='valve'&&state.chapter===2){const i=Number(button.dataset.value);state.valves[i]=(Number(state.valves[i])+1)%4;save();renderChallenge(false);}
  else if(action==='lamp'&&state.chapter===3){const i=Number(button.dataset.value);state.lamps=state.lamps.includes(i)?state.lamps.filter(n=>n!==i):[...state.lamps,i];save();renderChallenge(false);}
  else if(action==='clear-lamps'&&state.chapter===3){state.lamps=[];save();renderChallenge(false);}
  else if(action==='submit')submitPuzzle();
});
$('lh-challenge').addEventListener('change',event=>{
  const select=event.target;
  if(select.dataset.route){state.routes[select.dataset.route]=select.value;save();}
  if(select.dataset.deduction){state.deduction[select.dataset.deduction]=select.value;save();}
});
$('lh-hint-button').addEventListener('click',()=>{const i=state.chapter;state.hints[i]=Math.min(3,(Number(state.hints[i])||0)+1);save();const level=state.hints[i];$('lh-hint-content').textContent=`提示 ${level} / 3：${stages[i].hints[level-1]}`;$('lh-hint-content').classList.add('open');$('lh-hint-button').querySelector('span:nth-child(2)').textContent=level<3?'再給我一點提示':'已顯示完整提示';});
$('lh-modal-close').addEventListener('click',closeModal);
$('lh-modal-action').addEventListener('click',closeModal);
$('lh-modal').addEventListener('click',event=>{if(event.target===$('lh-modal'))closeModal();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('lh-modal').classList.contains('hidden'))closeModal();});
$('lh-start').addEventListener('click',()=>{state.started=true;save();$('lh-intro').classList.add('hidden');});
$('lh-restart').addEventListener('click',()=>restart(true));
$('lh-ending-restart').addEventListener('click',()=>restart(false));
$('lh-notes-toggle').addEventListener('click',()=>{const panel=document.querySelector('.case-panel');const open=panel.classList.toggle('notes-open');$('lh-notes-toggle').setAttribute('aria-expanded',String(open));$('lh-notes-toggle').querySelector('span').textContent=open?'−':'＋';});

render();
if(state.started)$('lh-intro').classList.add('hidden');
if(state.complete)showEnding();
setInterval(()=>{if(state.started&&!state.complete&&$('lh-intro').classList.contains('hidden')){state.seconds++;$('lh-timer').textContent=timeText();if(state.seconds%10===0)save();}},1000);
