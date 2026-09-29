const CELLAR_SAVE_KEY = 'sealed-cellar-save-v1';

const cellarStages = [
  {
    name:'封門階梯', english:'THE STAIR', location:'舊莊園・地下入口', subtitle:'石門落下了。牆上的家徽刻痕似乎能開門。', objective:'解開家徽封印', description:'調查刻痕，依次觸碰五枚家徽。', prompt:'依線索排出家徽順序', type:'crests',
    hints:['先找出第一枚與最後一枚，再看中間三枚的關係。','月在最前，根在最後；眼與鑰匙相鄰，水滴在鑰匙之後。','月 → 眼 → 鑰匙 → 水滴 → 根。'],
    objects:[
      {id:'lintel',name:'門楣銘文',icon:'☾',x:46,y:24,note:'月亮必須先於其他家徽；樹根是最後一枚。',body:'門楣刻著：「<strong>月</strong>先照見地窖，<strong>根</strong>最後記住水聲。」五枚家徽各只能按一次。'},
      {id:'eye',name:'守望浮雕',icon:'◉',x:24,y:44,note:'眼緊接在鑰匙前面。',body:'浮雕旁一道刻痕連著兩枚圖案：<strong>眼 → 鑰匙</strong>。中間沒有其他家徽。'},
      {id:'drop',name:'水痕石板',icon:'◈',x:73,y:66,note:'水滴在鑰匙之後。',body:'滴水沿刻字流下：「開鎖之後，<strong>水滴</strong>才走得進來。」'},
      {id:'seal',name:'五枚家徽',icon:'✣',x:77,y:36,note:'家徽為月、眼、鑰匙、水滴、根。',body:'石門上有五個可按的家徽：月、眼、鑰匙、水滴、根。需要還原它們被設計時的順序。'}
    ],
    reward:{name:'封門轉開',icon:'⚿',note:'五枚家徽依序亮起，稱重室的石門轉開。',body:'最後一枚樹根沉入石壁。石門轉開，裡面是一座沾滿灰的天平。'}
  },
  {
    name:'稱重室', english:'THE SCALE', location:'地窖・稱重室', subtitle:'天平另一端吊著一只封死的銅桶。', objective:'讓天平恢復平衡', description:'從砝碼中選出三枚可用的重量，讓銅桶升起。', prompt:'選三枚砝碼後按「稱重」', type:'balance',
    hints:['先從銅桶刻字求出需要的總重量。','桶重是 5 加 6；8 格砝碼固定住，2 格砝碼已裂，剩下要選三枚。','選 1、4、6 格，合計 11 格。'],
    objects:[
      {id:'barrel',name:'銅桶銘牌',icon:'◉',x:62,y:43,note:'銅桶重量等於五格加六格。',body:'銅桶側面沒有標重量，只刻著：「舊井五格，雨後再添六格。」因此天平另一端要湊出<strong>五加六格</strong>。'},
      {id:'rule',name:'秤房規則',icon:'▤',x:27,y:26,note:'每次必須放三枚砝碼。',body:'木牌寫著：「銅桶只在另一端恰好放上<strong>三枚</strong>砝碼、且兩端等重時升起。」'},
      {id:'heavy',name:'鎖住的砝碼',icon:'▣',x:80,y:71,note:'八格砝碼鎖在架上，不可使用。',body:'標著<strong>8</strong> 的大砝碼被鐵鏈鎖在架上。看來它只是當年校秤的基準。'},
      {id:'crack',name:'裂開的砝碼',icon:'◇',x:22,y:70,note:'兩格砝碼有裂縫，不可使用。',body:'標著<strong>2</strong> 的砝碼裂成兩半；木牌警告破損砝碼不能放上天平。'}
    ],
    reward:{name:'銅桶升起',icon:'⚖',note:'天平平衡，桶底露出通往暗渠的鑰匙。',body:'三枚砝碼使天平恰好平衡。銅桶升起，桶底的鑰匙與下層暗渠一同露出。'}
  },
  {
    name:'斷流暗渠', english:'THE CHANNEL', location:'地窖・斷流暗渠', subtitle:'六段彎管散在地上，水必須穿過每一段。', objective:'接通整條暗渠', description:'旋轉六段彎管，讓水從左上入口流到右下出口，經過每一段。', prompt:'點選管件旋轉；所有六段都要通水', type:'pipes',
    hints:['從左上入口的左側進水；右下出口從右側出水。','每段都是彎管，水只能轉彎；試著從左上沿下排與上排交錯前進。','路線：左上 → 左下 → 中下 → 中上 → 右上 → 右下 → 出口。'],
    objects:[
      {id:'inlet',name:'左側進水口',icon:'≈',x:19,y:38,note:'水由左上管件的左側進入。',body:'暗渠入口刻著單箭頭：水從<strong>左上管件的左側</strong>進來。'},
      {id:'outlet',name:'右側排水口',icon:'↗',x:81,y:63,note:'水要從右下管件的右側流出。',body:'出口通向下一道封門，位於<strong>右下管件的右側</strong>。'},
      {id:'mark',name:'六枚施工記號',icon:'⌁',x:48,y:22,note:'施工圖要求六段彎管全都通水。',body:'褪色施工圖上，每段彎管旁都有同樣的記號：「<strong>六段全通</strong>，才可試水。」任何一段斷流都會使旁通閥關閉。'},
      {id:'elbows',name:'彎管堆',icon:'╮',x:52,y:72,note:'六個管件都是直角彎管，可逐一旋轉。',body:'每段管件都有兩個相鄰的開口；點選右側管件可順時針轉動四分之一圈。'}
    ],
    reward:{name:'暗渠復流',icon:'≈',note:'六段彎管全部通水，水推開了密文庫門。',body:'一陣急促水聲穿過六段彎管。暗渠盡頭的銅門被水壓緩緩推開。'}
  },
  {
    name:'密文庫', english:'THE CIPHER', location:'地窖・密文庫', subtitle:'一張加密的種子清單，被夾在發霉書頁之間。', objective:'讀出門鎖暗語', description:'解開四個加密字母，再從字母牌組出暗語。', prompt:'依序選出四個解密後的字母', type:'cipher',
    hints:['看看密文 VHHG 和輪盤上 A→D 的例子。','加密時每個字母向後移三格；解密要向前退三格。','VHHG 解出 SEED；依序點 S、E、E、D。'],
    objects:[
      {id:'cipher',name:'加密紙條',icon:'✎',x:59,y:30,note:'紙條上的四個字母是 VHHG。',body:'夾在種子清單裡的紙條寫著：<blockquote>V H H G</blockquote>紙條背面寫著「原文才能開門」。'},
      {id:'wheel',name:'字母輪盤',icon:'◌',x:26,y:56,note:'輪盤示例：原文 A 加密後成 D。',body:'雙層輪盤上有一個唯一的例子：<strong>原文 A → 密文 D</strong>。箭頭指向英文字母往後移三格的方向。'},
      {id:'margin',name:'解密邊註',icon:'↶',x:74,y:67,note:'解密時要把密文字母往回移。',body:'頁邊的小字寫著：「門只認原文，密文要沿輪盤<strong>倒退</strong>。」'},
      {id:'seedbook',name:'種子清單',icon:'▤',x:20,y:24,note:'清單和下一間的播種室有關。',body:'帳冊抬頭是「春季播種」。底下只剩一句：「真相藏在種子與水流之間。」'}
    ],
    reward:{name:'暗語辨認成功',icon:'✧',note:'暗語打開播種室，裡面留下轉運水桶的登記簿。',body:'字母牌沉入門鎖。門後排列著四只標記不同的水桶，還有一本運水登記簿。'}
  },
  {
    name:'轉運室', english:'THE BARRELS', location:'地窖・轉運室', subtitle:'四只水桶的封條被調換，去向必須重新核對。', objective:'核對水桶去向', description:'將四種封條各配到一處去向，每種只用一次。', prompt:'四種封條不能重複使用', type:'barrels',
    hints:['先固定村井和莊園，再處理磨坊與廢渠。','白封條送村井；紅既不去磨坊也不去廢渠，所以紅去莊園。','村井白、莊園紅、磨坊藍、廢渠綠。'],
    objects:[
      {id:'ledger',name:'運水登記簿',icon:'▤',x:52,y:28,note:'白封條的水桶應送到村井。',body:'最後一頁清楚寫著：「<strong>白封條 → 村井</strong>。」頁角蓋了守窖人的印章。'},
      {id:'red',name:'紅封條警語',icon:'◆',x:24,y:58,note:'紅封條不去磨坊，也不去廢渠。',body:'紅封條上兩道叉分別蓋在「磨坊」與「廢渠」字樣上。它<strong>不去磨坊，也不去廢渠</strong>。'},
      {id:'blue',name:'藍封條票根',icon:'◈',x:76,y:44,note:'藍封條不去廢渠。',body:'藍色票根只留下一句：「<strong>藍封條不入廢渠</strong>，否則會混入髒水。」'},
      {id:'four',name:'四處送水口',icon:'⇄',x:72,y:73,note:'四種封條各送村井、莊園、磨坊、廢渠中的一處。',body:'管口牌標著村井、莊園、磨坊、廢渠。紅、藍、綠、白四種封條<strong>各用一次</strong>，不能有兩桶送往同一處。'}
    ],
    reward:{name:'轉運門解鎖',icon:'⚿',note:'四桶各歸其位，通往泵房的閘門開啟。',body:'最後一只水桶滑進正確軌道。你發現去莊園的水桶數量遠超村井的份額。'}
  },
  {
    name:'舊泵房', english:'THE PUMP', location:'地窖・舊泵房', subtitle:'五個開關控制主泵，錯誤配置會讓它再次停機。', objective:'重啟回村主泵', description:'依維修規則設定 A 到 E 五個開關。', prompt:'點選開關切換開／關，再啟動主泵', type:'switches',
    hints:['把 A、E 視作一組，C、D 視作另一組。','A 與 E 同態，C 與 D 同態，B 與 C 相反；剛好三個開。','A、B、E 開；C、D 關。'],
    objects:[
      {id:'count',name:'主泵檢修單',icon:'▤',x:42,y:23,note:'五個開關中，恰好三個必須開啟。',body:'檢修單的第一條寫著：「啟動時五個開關中<strong>恰好三個開啟</strong>，多或少都會跳脫。」'},
      {id:'outer',name:'外側連動線',icon:'⌁',x:21,y:53,note:'A 與 E 必須同時開或同時關。',body:'兩條銅線連著最外側開關：<strong>A 與 E 狀態相同</strong>。'},
      {id:'middle',name:'中段繼電器',icon:'⇄',x:68,y:46,note:'B 與 C 狀態相反。',body:'繼電器旁刻著：「<strong>B 與 C 一開一關</strong>。」'},
      {id:'inner',name:'泵芯標籤',icon:'◉',x:77,y:74,note:'C 與 D 必須同時開或同時關。',body:'泵芯標籤上畫著等號：<strong>C = D</strong>，兩只開關狀態一致。'}
    ],
    reward:{name:'主泵開始運轉',icon:'↻',note:'泵房重啟，水聲指向最後的帳冊室。',body:'泵軸開始轉動。水沿回村主管奔流，而旁通的釀酒窖管路也暴露了出來。'}
  },
  {
    name:'封存帳冊室', english:'THE LEDGER', location:'地窖・封存帳冊室', subtitle:'出口就在前方。先決定要打開哪道水閘，並帶走什麼。', objective:'還原水源案真相', description:'根據一路蒐集的線索，選出改道者、去向、證據與正確水閘。', prompt:'四項推論都正確才能開啟出口', type:'deduction',
    hints:['從轉運室的紅封條與泵房的旁通管開始。','紅封條去莊園；帳冊記錄莊園主下令把水導往釀酒窖。','選莊園主、釀酒窖、改道帳冊、回村水閘。'],
    objects:[
      {id:'order',name:'莊園主手令',icon:'✎',x:29,y:24,note:'莊園主下令將村井水改道。',body:'手令的簽名屬於<strong>莊園主</strong>：「先滿釀酒窖，村井的缺水報作乾旱。」'},
      {id:'map',name:'地下管路圖',icon:'⌖',x:70,y:31,note:'被截走的水流向釀酒窖；回村水閘可復原村井。',body:'紅線從井脈分叉，接向<strong>釀酒窖</strong>；另一條標著「<strong>回村水閘</strong>」的管路通往村井。'},
      {id:'book',name:'改道帳冊',icon:'▤',x:49,y:65,note:'改道帳冊記錄每一桶被轉往莊園的水。',body:'帳冊逐日記著送往莊園釀酒窖的桶數，卻在公開版本中把同一批水記作「蒸發損失」。這本<strong>改道帳冊</strong>可以證明手令被執行。'},
      {id:'gate',name:'兩道水閘',icon:'⚿',x:80,y:72,note:'應打開回村水閘，避免把水繼續送進釀酒窖。',body:'一扇水閘通村井，一扇通釀酒窖。只有<strong>回村水閘</strong>能讓井水回到村裡；開錯會使證據與水流一起被沖走。'}
    ],
    reward:{name:'水源案真相大白',icon:'✦',note:'回村水閘打開，帳冊與手令成為改道案的證據。',body:'你帶著改道帳冊穿過出口。村井重新出水，莊園主隱藏的管路與手令終於被看見。'}
  }
];

const crestChoices=[['moon','月','☾'],['eye','眼','◉'],['key','鑰匙','⚿'],['drop','水滴','◈'],['root','根','♧']];
const weights=[1,2,3,4,6,8];
const pipeEdges=[[0,1],[1,2],[2,3],[3,0]]; // 上、右、下、左；每格順時針轉動
const barrelPlaces=[['village','村井'],['manor','莊園'],['mill','磨坊'],['waste','廢渠']];
const sealOptions=[['','選擇封條'],['red','紅'],['blue','藍'],['green','綠'],['white','白']];
const deductionFields=[
  ['culprit','誰下令改道？',[['','選擇人物'],['owner','莊園主'],['keeper','守窖人'],['miller','磨坊主']]],
  ['destination','井水被導往哪裡？',[['','選擇去向'],['distillery','釀酒窖'],['harbor','港口'],['school','學校']]],
  ['proof','要帶走哪項證據？',[['','選擇證據'],['ledger','改道帳冊'],['weather','天氣紀錄'],['key','銅鑰匙']]],
  ['gate','應打開哪道水閘？',[['','選擇水閘'],['village','回村水閘'],['manor','莊園水閘'],['drain','排空水閘']]]
];
const initialCellarState=()=>({started:false,complete:false,chapter:0,unlocked:0,solved:[],seen:[],seconds:0,hints:[0,0,0,0,0,0,0],crests:[],balance:[],pipes:[1,2,0,3,1,0],cipher:[],barrels:{village:'',manor:'',mill:'',waste:''},switches:[false,false,false,false,false],deduction:{culprit:'',destination:'',proof:'',gate:''},highlight:false});
let cellarState=initialCellarState();
try {
  const saved=JSON.parse(localStorage.getItem(CELLAR_SAVE_KEY)||'null');
  if(saved&&typeof saved==='object'&&Number.isInteger(saved.chapter)&&saved.chapter>=0&&saved.chapter<cellarStages.length&&Number.isInteger(saved.unlocked)&&saved.unlocked>=0&&saved.unlocked<cellarStages.length){
    const fresh=initialCellarState();
    cellarState={...fresh,...saved,chapter:Math.min(saved.chapter,saved.unlocked),seen:Array.isArray(saved.seen)?saved.seen:[],solved:Array.isArray(saved.solved)?saved.solved:[],hints:Array.isArray(saved.hints)?saved.hints:fresh.hints,crests:Array.isArray(saved.crests)?saved.crests:[],balance:Array.isArray(saved.balance)?saved.balance:[],pipes:Array.isArray(saved.pipes)&&saved.pipes.length===6?saved.pipes:fresh.pipes,cipher:Array.isArray(saved.cipher)?saved.cipher:[],barrels:{...fresh.barrels,...(saved.barrels||{})},switches:Array.isArray(saved.switches)&&saved.switches.length===5?saved.switches:fresh.switches,deduction:{...fresh.deduction,...(saved.deduction||{})},highlight:!!saved.highlight};
  }
} catch (_) {}

const c=id=>document.getElementById(id);
const cSave=()=>{try{localStorage.setItem(CELLAR_SAVE_KEY,JSON.stringify(cellarState));}catch(_){}};
const cPad=n=>String(n).padStart(2,'0');
const cTime=()=>`${cPad(Math.floor(cellarState.seconds/60))}:${cPad(cellarState.seconds%60)}`;
const cSeenKey=(stage,id)=>`${stage}:${id}`;
let cellarPriorFocus=null;

function cellarSceneArt(index){
  const motifs=[
    '<circle cx="400" cy="260" r="104" fill="#493529" stroke="#c49a67" stroke-width="4"/><circle cx="400" cy="260" r="75" fill="none" stroke="#b78b5d" stroke-width="2"/><text x="400" y="283" text-anchor="middle" font-size="83" fill="#d9b17b">✣</text>',
    '<path d="M205 235 H595 M400 235 V355" stroke="#bda17c" stroke-width="13"/><path d="M225 235 L190 320 H270 Z M575 235 L530 320 H620 Z" fill="#6b4c36" stroke="#c5a47d" stroke-width="4"/><circle cx="400" cy="205" r="18" fill="#bb9260"/>',
    '<path d="M130 195 H340 V345 H570 V225 H695" fill="none" stroke="#654e3b" stroke-width="66" stroke-linejoin="round"/><path d="M130 195 H340 V345 H570 V225 H695" fill="none" stroke="#77a1a0" stroke-width="20" stroke-linejoin="round"/>',
    '<rect x="235" y="110" width="330" height="365" rx="12" fill="#5a4436" stroke="#bc986d" stroke-width="4"/><path d="M265 150 H530 M265 405 H530" stroke="#a78c69" stroke-width="3"/><text x="400" y="310" text-anchor="middle" font-size="77" letter-spacing="12" fill="#e3c99b">VHHG</text>',
    '<path d="M165 400 V210 H635 V400" fill="none" stroke="#98785a" stroke-width="12"/><rect x="190" y="270" width="90" height="135" rx="22" fill="#6f3d34"/><rect x="300" y="270" width="90" height="135" rx="22" fill="#4c6174"/><rect x="410" y="270" width="90" height="135" rx="22" fill="#527055"/><rect x="520" y="270" width="90" height="135" rx="22" fill="#c0bca9"/>',
    '<circle cx="390" cy="280" r="115" fill="#394046" stroke="#bfa074" stroke-width="22"/><circle cx="390" cy="280" r="54" fill="#86664a"/><path d="M390 120 V440 M235 280 H545" stroke="#d0aa77" stroke-width="10"/><text x="390" y="518" text-anchor="middle" fill="#d7b681" font-size="29" letter-spacing="16">A B C D E</text>',
    '<path d="M205 210 H595 V430 H205 Z" fill="#4e392d" stroke="#c1a077" stroke-width="5"/><path d="M250 255 H550 M250 300 H550 M250 345 H510 M250 390 H460" stroke="#d0b285" stroke-width="6"/><circle cx="615" cy="425" r="64" fill="#477b80" stroke="#c8a471" stroke-width="8"/>'
  ];
  return `<svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${cellarStages[index].name}的石造場景"><defs><linearGradient id="stone${index}" x1="0" x2="1" y2="1"><stop stop-color="#4a3931"/><stop offset="1" stop-color="#151d22"/></linearGradient><radialGradient id="glow${index}"><stop stop-color="#c6915688"/><stop offset="1" stop-color="#c6915600"/></radialGradient></defs><rect width="800" height="560" fill="url(#stone${index})"/><circle cx="400" cy="265" r="320" fill="url(#glow${index})"/><path d="M0 90 H800 M0 180 H800 M0 270 H800 M0 360 H800 M0 450 H800 M175 0 V90 M420 0 V90 M680 0 V90 M65 90 V180 M305 90 V180 M560 90 V180 M170 180 V270 M420 180 V270 M670 180 V270 M70 270 V360 M315 270 V360 M570 270 V360 M160 360 V450 M410 360 V450 M665 360 V450" stroke="#c7a67c" stroke-opacity=".12" stroke-width="3"/><path d="M0 500 Q400 455 800 500 V560 H0 Z" fill="#15191b" opacity=".55"/>${motifs[index]}</svg>`;
}

function cellarRender(){
  const s=cellarState,stage=cellarStages[s.chapter],i=s.chapter;
  c('c-timer').textContent=cTime();
  c('c-progress-text').textContent=`${s.solved.length} / 7`;
  c('c-progress-fill').style.width=`${s.solved.length/7*100}%`;
  c('c-clue-count').textContent=`${s.seen.length} 條`;
  c('c-nav').innerHTML=cellarStages.map((entry,n)=>`<button class="room-button ${n===i?'active':''}" type="button" data-stage="${n}" ${n>s.unlocked?'disabled':''} ${n===i?'aria-current="step"':''}><span class="room-number">${cPad(n+1)}</span><span class="room-name">${entry.name}</span><span class="room-state">${s.solved.includes(n)?'已完成':n>s.unlocked?'未開啟':'調查中'}</span></button>`).join('');
  c('c-clues').innerHTML=s.seen.length?s.seen.map(key=>{const [index,id]=key.split(':');const obj=cellarStages[Number(index)]?.objects.find(item=>item.id===id);return obj?`<div class="clue-item"><strong>${obj.name}</strong><span>${obj.note}</span><small>${cellarStages[Number(index)].name}</small></div>`:'';}).join(''):'<p class="empty-note">調查物件後，線索會記在這裡。</p>';
  c('c-chapter-label').textContent=`CHAPTER ${cPad(i+1)} — ${stage.english}`;
  c('c-title').textContent=stage.name;c('c-subtitle').textContent=stage.subtitle;c('c-count').textContent=`${cPad(i+1)} / 07`;c('c-location').textContent=stage.location;
  c('c-objective-no').innerHTML=`${cPad(i+1)}<span>/07</span>`;c('c-objective').textContent=stage.objective;c('c-objective-desc').textContent=stage.description;c('c-prompt').textContent=stage.prompt;c('c-status').textContent=s.solved.includes(i)?'SOLVED':'ACTIVE';
  c('c-art').innerHTML=cellarSceneArt(i);
  c('c-hotspots').innerHTML=stage.objects.map(o=>`<button class="hotspot ${s.seen.includes(cSeenKey(i,o.id))?'visited':''}" type="button" data-object="${o.id}" style="left:${o.x}%;top:${o.y}%" aria-label="調查${o.name}"><span class="hotspot-icon">${o.icon}</span><span>${o.name}</span><i class="hotspot-dot"></i></button>`).join('');
  c('c-objects').innerHTML=stage.objects.map(o=>`<button class="mobile-object-button ${s.seen.includes(cSeenKey(i,o.id))?'visited':''}" type="button" data-object="${o.id}"><span>${o.icon}</span>${o.name}</button>`).join('');
  c('c-footer-count').textContent=`已發現 ${stage.objects.filter(o=>s.seen.includes(cSeenKey(i,o.id))).length} / ${stage.objects.length} 件`;
  const hint=s.hints[i]||0;c('c-hint-content').textContent=hint?`提示 ${hint} / 3：${stage.hints[hint-1]}`:'';c('c-hint-content').classList.toggle('open',hint>0);c('c-hint-button').querySelector('span:nth-child(2)').textContent=hint===3?'已顯示完整提示':hint?'再給我一點提示':'需要一點提示？';
  cellarRenderChallenge();
  c('c-feedback').textContent=s.solved.includes(i)?'此機關已解開，可切換場景重看線索。':'線索分散在場景裡。';c('c-feedback').className='code-message';
  document.body.classList.toggle('highlight-hints',s.highlight);c('c-highlight-toggle').setAttribute('aria-pressed',String(s.highlight));c('c-highlight-toggle').setAttribute('aria-label',`黃字提示：${s.highlight?'開啟':'關閉'}`);c('c-highlight-status').textContent=s.highlight?'開':'關';
}

const cellarOptionHtml=(options,value)=>options.map(([id,label])=>`<option value="${id}" ${id===value?'selected':''}>${label}</option>`).join('');
function cellarRenderChallenge(){
  const s=cellarState,i=s.chapter,type=cellarStages[i].type,solved=s.solved.includes(i);
  let html='';
  if(type==='crests')html=`<div class="c-sequence"><span>已選：${s.crests.map(id=>crestChoices.find(x=>x[0]===id)?.[1]).join(' → ')||'尚未選取'}</span><button type="button" data-action="undo">撤回</button></div><div class="c-choice-grid">${crestChoices.map(([id,name,symbol])=>`<button type="button" data-action="crest" data-value="${id}" ${s.crests.includes(id)||solved?'disabled':''}><b>${symbol}</b>${name}</button>`).join('')}</div>`;
  if(type==='balance')html=`<div class="c-readout">已選 <strong>${s.balance.length}</strong> / 3 枚 · 合計 <strong>${s.balance.reduce((a,b)=>a+b,0)}</strong> 格</div><div class="c-choice-grid c-weight-grid">${weights.map(n=>`<button type="button" data-action="weight" data-value="${n}" aria-pressed="${s.balance.includes(n)}" ${solved?'disabled':''}><b>${n}</b>格${n===2?' · 裂':n===8?' · 鎖':''}</button>`).join('')}</div><button class="c-submit" type="button" data-action="check" ${solved?'disabled':''}>稱重 →</button>`;
  if(type==='pipes')html=`<div class="c-pipe-labels"><span>入口 →</span><span>→ 出口</span></div><div class="c-pipe-grid">${s.pipes.map((turn,n)=>`<button type="button" class="c-pipe" data-action="pipe" data-index="${n}" aria-label="旋轉第 ${Math.floor(n/3)+1} 列第 ${n%3+1} 格彎管，現在${['上右','右下','下左','左上'][turn]}" ${solved?'disabled':''}><span style="transform:rotate(${turn*90}deg)">╰</span><small>${n+1}</small></button>`).join('')}</div><button class="c-submit" type="button" data-action="check" ${solved?'disabled':''}>試水 →</button>`;
  if(type==='cipher')html=`<div class="c-readout c-letters">${s.cipher.map(x=>x.letter).join(' ')||'＿ ＿ ＿ ＿'}</div><div class="c-choice-grid c-letter-grid">${[['S',0],['R',1],['E',2],['A',3],['D',4],['E',5]].map(([letter,n])=>`<button type="button" data-action="letter" data-index="${n}" ${s.cipher.some(x=>x.index===n)||solved?'disabled':''}><b>${letter}</b></button>`).join('')}</div><button class="c-secondary" type="button" data-action="undo" ${solved?'disabled':''}>撤回上一張</button><button class="c-submit" type="button" data-action="check" ${solved?'disabled':''}>確認暗語 →</button>`;
  if(type==='barrels')html=`<div class="c-selects">${barrelPlaces.map(([id,name])=>`<label>${name}<select data-field="${id}" ${solved?'disabled':''}>${cellarOptionHtml(sealOptions,s.barrels[id])}</select></label>`).join('')}</div><button class="c-submit" type="button" data-action="check" ${solved?'disabled':''}>核對去向 →</button>`;
  if(type==='switches')html=`<div class="c-switch-grid">${s.switches.map((on,n)=>`<button type="button" data-action="switch" data-index="${n}" aria-pressed="${on}" ${solved?'disabled':''}><b>${'ABCDE'[n]}</b><span>${on?'開':'關'}</span></button>`).join('')}</div><div class="c-readout">目前開啟：${s.switches.filter(Boolean).length} / 5</div><button class="c-submit" type="button" data-action="check" ${solved?'disabled':''}>啟動主泵 →</button>`;
  if(type==='deduction')html=`<div class="c-selects">${deductionFields.map(([id,label,options])=>`<label>${label}<select data-field="${id}" ${solved?'disabled':''}>${cellarOptionHtml(options,s.deduction[id])}</select></label>`).join('')}</div><button class="c-submit" type="button" data-action="check" ${solved?'disabled':''}>打開出口 →</button>`;
  c('c-challenge').innerHTML=html;
}

function cellarFeedback(message,error=false){c('c-feedback').textContent=message;c('c-feedback').className=`code-message ${error?'error':'success'}`;}
function cellarPipeConnected(){
  const turns=cellarState.pipes.map(n=>Number(n));
  if(turns.some(n=>!Number.isInteger(n)||n<0||n>3))return false;
  let tile=0,entry=3;const visited=new Set();
  while(true){
    if(visited.has(tile))return false;
    visited.add(tile);
    const ports=pipeEdges[turns[tile]];
    if(!ports.includes(entry))return false;
    const exit=ports.find(port=>port!==entry);
    if(tile===5&&exit===1)return visited.size===6;
    const row=Math.floor(tile/3),col=tile%3;
    const next=exit===0?row>0?tile-3:-1:exit===1?col<2?tile+1:-1:exit===2?row<1?tile+3:-1:col>0?tile-1:-1;
    if(next<0)return false;
    tile=next;entry=(exit+2)%4;
  }
}
function cellarSubmit(){
  const s=cellarState,i=s.chapter,type=cellarStages[i].type;
  if(s.solved.includes(i))return;
  let correct=false,message='機關還沒有反應，重新核對線索。';
  if(type==='balance'){
    correct=s.balance.length===3&&s.balance.includes(1)&&s.balance.includes(4)&&s.balance.includes(6);
    message=s.balance.length!==3?'要放上恰好三枚砝碼。':s.balance.includes(2)||s.balance.includes(8)?'有砝碼裂開或鎖住，不能使用。':'天平沒有平衡，再核對銅桶重量。';
  }
  if(type==='pipes'){correct=cellarPipeConnected();message='水沒有穿過全部六段並從右下出口流出。';}
  if(type==='cipher'){correct=s.cipher.map(x=>x.letter).join('')==='SEED';message=s.cipher.length!==4?'暗語需要四個字母。':'字母仍是密文，試著把每個字母往回移。';}
  if(type==='barrels'){
    const values=barrelPlaces.map(([id])=>s.barrels[id]);
    correct=values.join(',')==='white,red,blue,green';
    message=values.some(x=>!x)?'四處去向都要選擇封條。':new Set(values).size!==4?'每種封條只能使用一次。':'至少有一只水桶的去向不符合登記。';
  }
  if(type==='switches'){correct=s.switches.map(Boolean).join(',')==='true,true,false,false,true';message=s.switches.filter(Boolean).length!==3?'主泵需要恰好三個開關開啟。':'連動規則尚未全部符合。';}
  if(type==='deduction'){
    const d=s.deduction;correct=d.culprit==='owner'&&d.destination==='distillery'&&d.proof==='ledger'&&d.gate==='village';
    message=Object.values(d).some(x=>!x)?'四項推論都需要完成。':'有推論與帳冊或管路圖不符，水閘保持鎖定。';
  }
  if(correct)cellarCompleteStage();else cellarFeedback(message,true);
}

function cellarCompleteStage(){
  const s=cellarState,i=s.chapter;
  if(s.solved.includes(i))return;
  s.solved.push(i);
  const reward=cellarStages[i].reward;
  if(i===cellarStages.length-1){s.complete=true;cSave();cellarRender();cellarShowModal({eyebrow:'MECHANISM OPEN',...reward,tag:'案件已解開 · 關閉後查看結局'},()=>cellarShowEnding());return;}
  s.unlocked=Math.max(s.unlocked,i+1);s.chapter=i+1;cSave();cellarRender();cellarShowModal({eyebrow:'MECHANISM OPEN',...reward,tag:`已開啟 ${cellarStages[i+1].name}`});
}
function cellarInspect(id){
  const s=cellarState,i=s.chapter,obj=cellarStages[i].objects.find(x=>x.id===id);
  if(!obj)return;
  const key=cSeenKey(i,id);if(!s.seen.includes(key)){s.seen.push(key);cSave();cellarRender();}
  cellarShowModal({name:obj.name,icon:obj.icon,body:obj.body,tag:`${cellarStages[i].name} / 線索已記入筆記`});
}
let cellarModalCloseAction=null;
function cellarShowModal({eyebrow='EVIDENCE',name,icon='✦',body,tag=''},afterClose=null){
  cellarPriorFocus=document.activeElement;cellarModalCloseAction=afterClose;
  c('c-modal-eyebrow').textContent=eyebrow;c('c-modal-title').textContent=name;c('c-modal-icon').textContent=icon;c('c-modal-body').innerHTML=body;c('c-modal-tag').textContent=tag;
  c('c-modal').classList.remove('hidden');c('c-modal-close').focus();
}
function cellarCloseModal(){
  c('c-modal').classList.add('hidden');const action=cellarModalCloseAction;cellarModalCloseAction=null;
  if(action)action();else if(cellarPriorFocus?.isConnected)cellarPriorFocus.focus();
}
function cellarShowEnding(){c('c-ending-clues').textContent=cellarState.seen.length;c('c-ending-time').textContent=cTime();c('c-ending-hints').textContent=cellarState.hints.reduce((sum,n)=>sum+(Number(n)||0),0);c('c-ending').classList.remove('hidden');}
function cellarRestart(confirmFirst=true){
  if(confirmFirst&&!window.confirm('確定要清除封存地窖的進度並重新開始嗎？'))return;
  cellarState=initialCellarState();cSave();c('c-modal').classList.add('hidden');c('c-ending').classList.add('hidden');c('c-intro').classList.remove('hidden');cellarRender();
}

c('c-challenge').addEventListener('click',event=>{
  const button=event.target.closest('button[data-action]');if(!button||button.disabled)return;
  const action=button.dataset.action,s=cellarState;
  if(action==='crest'){
    if(s.crests.length>=5||s.crests.includes(button.dataset.value))return;
    s.crests.push(button.dataset.value);
    if(s.crests.length===5){if(s.crests.join(',')==='moon,eye,key,drop,root'){cellarCompleteStage();return;}cellarFeedback('家徽沉回石門；順序不對，可以撤回重排。',true);}
  }else if(action==='weight'){
    const n=Number(button.dataset.value),at=s.balance.indexOf(n);
    if(at>=0)s.balance.splice(at,1);else if(s.balance.length<3)s.balance.push(n);else{cellarFeedback('天平一次只能放三枚砝碼。',true);return;}
  }else if(action==='pipe')s.pipes[Number(button.dataset.index)]=(Number(s.pipes[Number(button.dataset.index)])+1)%4;
  else if(action==='letter'){
    if(s.cipher.length>=4)return;
    const n=Number(button.dataset.index);if(s.cipher.some(x=>x.index===n))return;
    const letters=['S','R','E','A','D','E'];s.cipher.push({index:n,letter:letters[n]});
  }else if(action==='switch'){
    const n=Number(button.dataset.index);s.switches[n]=!s.switches[n];
  }else if(action==='undo'){
    if(s.chapter===0)s.crests.pop();if(s.chapter===3)s.cipher.pop();
  }else if(action==='check'){cellarSubmit();return;}
  cSave();cellarRenderChallenge();
  const focusTarget=(action==='pipe'||action==='switch')?`button[data-action="${action}"][data-index="${button.dataset.index}"]`:action==='weight'?`button[data-action="weight"][data-value="${button.dataset.value}"]`:action==='crest'?'button[data-action="crest"]:not(:disabled)':action==='letter'?'button[data-action="letter"]:not(:disabled)':`button[data-action="${action}"]`;
  c('c-challenge').querySelector(focusTarget)?.focus?.();
});
c('c-challenge').addEventListener('change',event=>{
  const field=event.target.dataset.field;if(!field)return;
  if(cellarState.chapter===4)cellarState.barrels[field]=event.target.value;
  if(cellarState.chapter===6)cellarState.deduction[field]=event.target.value;
  cSave();
});
c('c-hotspots').addEventListener('click',event=>{const button=event.target.closest('[data-object]');if(button)cellarInspect(button.dataset.object);});
c('c-objects').addEventListener('click',event=>{const button=event.target.closest('[data-object]');if(button)cellarInspect(button.dataset.object);});
c('c-nav').addEventListener('click',event=>{const button=event.target.closest('[data-stage]');if(!button)return;const index=Number(button.dataset.stage);if(index>cellarState.unlocked)return;cellarState.chapter=index;cSave();cellarRender();window.scrollTo({top:0,behavior:'smooth'});});
c('c-hint-button').addEventListener('click',()=>{const i=cellarState.chapter;cellarState.hints[i]=Math.min(3,(Number(cellarState.hints[i])||0)+1);cSave();const level=cellarState.hints[i];c('c-hint-content').textContent=`提示 ${level} / 3：${cellarStages[i].hints[level-1]}`;c('c-hint-content').classList.add('open');c('c-hint-button').querySelector('span:nth-child(2)').textContent=level<3?'再給我一點提示':'已顯示完整提示';});
c('c-modal-close').addEventListener('click',cellarCloseModal);c('c-modal-action').addEventListener('click',cellarCloseModal);
c('c-modal').addEventListener('click',event=>{if(event.target===c('c-modal'))cellarCloseModal();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!c('c-modal').classList.contains('hidden'))cellarCloseModal();});
c('c-highlight-toggle').addEventListener('click',()=>{cellarState.highlight=!cellarState.highlight;cSave();document.body.classList.toggle('highlight-hints',cellarState.highlight);c('c-highlight-toggle').setAttribute('aria-pressed',String(cellarState.highlight));c('c-highlight-toggle').setAttribute('aria-label',`黃字提示：${cellarState.highlight?'開啟':'關閉'}`);c('c-highlight-status').textContent=cellarState.highlight?'開':'關';});
c('c-start').addEventListener('click',()=>{cellarState.started=true;cSave();c('c-intro').classList.add('hidden');if(cellarState.complete)cellarShowEnding();});
c('c-restart').addEventListener('click',()=>cellarRestart(true));c('c-ending-restart').addEventListener('click',()=>cellarRestart(false));
c('c-notes-toggle').addEventListener('click',()=>{const panel=document.querySelector('.case-panel');const open=panel.classList.toggle('notes-open');c('c-notes-toggle').setAttribute('aria-expanded',String(open));c('c-notes-toggle').querySelector('span').textContent=open?'−':'＋';});
if(cellarState.started)c('c-intro').classList.add('hidden');
cellarRender();if(cellarState.complete&&cellarState.started)cellarShowEnding();
setInterval(()=>{if(cellarState.started&&!cellarState.complete&&c('c-intro').classList.contains('hidden')){cellarState.seconds++;c('c-timer').textContent=cTime();if(cellarState.seconds%10===0)cSave();}},1000);
