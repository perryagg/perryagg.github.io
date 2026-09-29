const COURTYARD_SAVE_KEY='rain-courtyard-save-v1';

const courtyardStages=[
  {
    name:'雨中的門埕',english:'THE COURT',location:'三合院・門埕',subtitle:'雨水滴過紅磚，五盞燈籠還在廊下搖晃。',objective:'點亮回家的燈',description:'讀出廊柱上的提示，依順序點亮五盞燈。',prompt:'依序點亮五盞燈',type:'lantern',
    hints:['先固定最先與最後的燈，再排中間三盞。','白最先、藍最後；青在紅前，紅與橙緊挨著。','白 → 青 → 紅 → 橙 → 藍。'],
    objects:[
      {id:'pillar',name:'廊柱短詩',icon:'✎',x:28,y:27,note:'白燈開路，藍燈收尾。',body:'廊柱上刻著：「<strong>白</strong>照見歸途的第一步；<strong>藍</strong>收下最後一滴雨。」燈座有五個依序啟動的凹槽。'},
      {id:'green',name:'青燈燈架',icon:'◆',x:68,y:29,note:'青燈在紅燈之前。',body:'青燈架的背面寫著：「青葉先舒展，<strong>紅</strong>花才開。」'},
      {id:'red',name:'紅橙繫繩',icon:'⌁',x:69,y:62,note:'紅燈緊接在橙燈之前。',body:'紅燈與橙燈的繩結被綁在同一根竹竿上。標籤註明：<strong>紅後立刻是橙</strong>，不可隔開。'},
      {id:'lanterns',name:'五盞舊燈',icon:'◉',x:19,y:65,note:'五盞燈是白、青、紅、橙、藍，各點一次。',body:'五盞燈分別是白、青、紅、橙、藍。燈座的機關要求每盞<strong>只點一次</strong>；按錯可撤回重排。'}
    ],reward:{name:'正廳門栓鬆開',icon:'✦',note:'五盞燈亮起，正廳門栓鬆開。',body:'廊下依次映出五色燈影。正廳的門栓咔一聲退開，牆上的八字木牌露出來。'}
  },
  {
    name:'正廳木牌',english:'THE HALL',location:'三合院・正廳',subtitle:'一塊八字木牌被打亂，空格正好可讓木塊滑動。',objective:'還原祖訓木牌',description:'只能移動與空格相鄰的木塊，將八字祖訓排回原位。',prompt:'空格最後須在右下角',type:'slider',
    hints:['從木牌殘痕先確認八個字的原本順序。','祖訓是「祖屋不可私自轉賣」，由左到右、由上到下排列。','依序點格位：2、1、4、7、8、5、2、1、4、7、8、5、2、3、6、5、8、9。'],
    objects:[
      {id:'wood',name:'祖訓殘痕',icon:'▤',x:54,y:26,note:'八字祖訓為「祖屋不可私自轉賣」。',body:'字框底板還留著筆畫印：「<strong>祖屋不可私自轉賣</strong>。」它原本由左到右、由上到下排成三列，最後一格留白。'},
      {id:'slide',name:'滑動木槽',icon:'▣',x:28,y:60,note:'每次只能把空格旁邊的一塊木牌滑進空格。',body:'木槽完全封閉。每次只能移動<strong>上下左右相鄰</strong>的木塊；斜角不能移動。'},
      {id:'corner',name:'右下定位釘',icon:'◇',x:75,y:63,note:'空格的最終位置是右下角。',body:'右下角的定位釘旁刻著小小的「留」字，顯示祖訓拼好時<strong>空格在右下</strong>。'},
      {id:'keyhole',name:'木牌背面的鑰孔',icon:'⚿',x:71,y:39,note:'木牌恢復後，會打開左護龍的門。',body:'木牌背面藏著一個細小的鑰孔。當八個字歸位，整塊牌會向後退，放出左護龍門閂。'}
    ],reward:{name:'木牌還原',icon:'▣',note:'八字祖訓歸位，左護龍門閂退開。',body:'「祖屋不可私自轉賣」一字不差地排回木槽。你聽見左護龍裡傳來細細的流水聲。'}
  },
  {
    name:'左護龍水路',english:'THE LEFT WING',location:'三合院・左護龍',subtitle:'九段竹管被轉亂，雨水無法流向穀倉。',objective:'接通九段竹管',description:'旋轉竹管，讓水從左上入口穿過全部九段，從右下流出。',prompt:'直管與彎管都可旋轉',type:'pipes',
    hints:['左上進、右下出；每一格都必須經過。','依次走完上列，折回中列，再沿下列走到出口。','路線：1 → 2 → 3 → 6 → 5 → 4 → 7 → 8 → 9。'],
    objects:[
      {id:'inlet',name:'雨水入口',icon:'≈',x:16,y:33,note:'水從左上竹管的左側流入。',body:'雨水沿屋簷注入左上角，箭頭標明：<strong>從左側進入第一段</strong>。'},
      {id:'map',name:'九段水路圖',icon:'⌖',x:49,y:24,note:'上列向右，中列折回，下列再向右。',body:'牆上的水路圖還留著三道方向箭頭：<strong>上列向右，中列向左，下列向右</strong>。每段竹管都要通水。'},
      {id:'joint',name:'彎管接頭',icon:'╮',x:71,y:54,note:'彎管只能轉四個方向；直管只有橫向或直向。',body:'竹管的卡榫可旋轉。<strong>彎管</strong>有四個角度，<strong>直管</strong>只有橫與直兩種角度。'},
      {id:'outlet',name:'穀倉出水口',icon:'↗',x:80,y:72,note:'出口位於右下竹管的右側。',body:'右下角的水口通向穀倉門旁的水輪。必須從<strong>右側</strong>流出才能推動它。'}
    ],reward:{name:'水輪開始轉動',icon:'≈',note:'九段竹管接通，穀倉的水輪帶開門閂。',body:'雨水穿過全部九段竹管，水輪慢慢轉動。穀倉的厚木門終於鬆開。'}
  },
  {
    name:'封穀倉',english:'THE GRANARY',location:'三合院・穀倉',subtitle:'藏著舊記錄的木箱壓在一座小秤上。',objective:'平衡穀倉木箱',description:'選出三枚可用的石砝碼，讓木箱的秤桿回到水平。',prompt:'選三枚石砝碼，再按「稱重」',type:'balance',
    hints:['木箱重量是兩袋八格穀物；大砝碼被釘死。','要湊十六格，使用三枚，十三格砝碼不能拿。','選 3、5、8 格，合計 16 格。'],
    objects:[
      {id:'invoice',name:'穀物收據',icon:'▤',x:24,y:25,note:'木箱重如兩袋八格穀物，合計十六格。',body:'收據寫著：「箱重，等同<strong>兩袋各八格</strong>的乾穀。」秤桿兩端要等重。'},
      {id:'rule',name:'石秤規則',icon:'⚖',x:67,y:31,note:'每次要放恰好三枚石砝碼。',body:'秤座旁刻著：「<strong>三石同上</strong>，不多不少，方可抬箱。」'},
      {id:'nailed',name:'釘住的大石',icon:'▣',x:76,y:69,note:'十三格砝碼被釘在底板，無法使用。',body:'標著 <strong>13</strong> 的大石被鐵釘牢牢固定，無法放上秤盤。'},
      {id:'scale',name:'六枚砝碼',icon:'◆',x:27,y:68,note:'可用砝碼標著一、二、三、五、八格。',body:'六枚砝碼依次標著 1、2、3、5、8、13 格；13 格已固定，其他可以自由取放。'}
    ],reward:{name:'木箱升起',icon:'⚖',note:'木箱下方發現一份印章保管記錄。',body:'秤桿平衡，木箱抬高。底板下是一份印章保管記錄，上面有張管事的名字。'}
  },
  {
    name:'右護龍名冊',english:'THE RIGHT WING',location:'三合院・右護龍',subtitle:'四人的雨夜去向被塗掉，名冊後面藏著印章借用單。',objective:'還原四人去向',description:'根據名冊限制，將四人分配到正廳、灶間、穀倉與井邊。',prompt:'每人只能在一處，每處只留一人',type:'matching',
    hints:['先把阿菊的位置固定，再排除阿田不可能去的地方。','阿菊在灶間；阿田既不在正廳也不在井邊，所以阿田在穀倉。','正廳阿福、灶間阿菊、穀倉阿田、井邊阿蘭。'],
    objects:[
      {id:'cook',name:'灶間點火簿',icon:'♨',x:23,y:33,note:'阿菊在灶間。',body:'點火簿寫著：「<strong>阿菊整晚守灶</strong>，直到雨停都沒有離開。」'},
      {id:'field',name:'阿田的濕鞋',icon:'◇',x:68,y:28,note:'阿田不在正廳，也不在井邊。',body:'鞋底沾著穀殼。鞋旁的便條寫著：「阿田今晚<strong>沒去正廳，也沒走到井邊</strong>。」'},
      {id:'foo',name:'阿福的巡屋單',icon:'▤',x:75,y:65,note:'阿福沒有到井邊。',body:'巡屋單最後一行被雨浸濕，但還能看見：「阿福<strong>未巡井邊</strong>。」'},
      {id:'roster',name:'四人去向名冊',icon:'⇄',x:29,y:70,note:'阿福、阿菊、阿田、阿蘭各在一處；四處各一人。',body:'名冊列出阿福、阿菊、阿田、阿蘭，四人各負責<strong>正廳、灶間、穀倉、井邊</strong>中的一處，沒有重複。'}
    ],reward:{name:'印章借用單浮現',icon:'▤',note:'阿蘭在井邊；張管事借章的記錄夾在名冊後。',body:'四個去向歸位，名冊底頁露出：「張管事於阿嬤病前借用印章樣本。」井邊的阿蘭也許看見了什麼。'}
  },
  {
    name:'灶間花窗',english:'THE LATTICE',location:'三合院・灶間',subtitle:'九格花窗反射屋外燈光，格片卻被人按亂了。',objective:'點亮整扇花窗',description:'每按一格，自己與上下左右相鄰格都會翻面。',prompt:'讓九格都亮起',type:'lights',
    hints:['先觀察一格會影響哪些相鄰格；順序不重要。','想要全部亮起，只需要按四格；其中有中央格。','按左上、上中、正中、右下；順序不限。'],
    objects:[
      {id:'window',name:'九格花窗',icon:'▦',x:55,y:29,note:'九格都亮起時，窗後會顯出藏頁。',body:'花窗後有一道薄薄的紙影。九格全部透光時，才看得清紙上的字。'},
      {id:'hinge',name:'花窗鉸鏈',icon:'⌁',x:25,y:62,note:'按一格會翻轉自身與上下左右相鄰格。',body:'鉸鏈圖畫著十字：按下一格，<strong>自己、上、下、左、右</strong>的格片都會翻面；不會影響斜角。'},
      {id:'sketch',name:'阿嬤的窗花草圖',icon:'✎',x:74,y:63,note:'最後九格必須全部透光。',body:'草圖的最終樣子是一扇<strong>九格全亮</strong>的花窗。旁邊寫著：「光完整，字才完整。」'},
      {id:'note',name:'窗框夾縫',icon:'◈',x:18,y:33,note:'夾縫裡是阿嬤未出售祖厝的補記。',body:'夾縫露出半張紙，抬頭是「祖厝補記」。只有花窗全亮，才能抽出完整頁面。'}
    ],reward:{name:'補記從窗後抽出',icon:'✎',note:'阿嬤的補記寫明祖厝未售，並提到井邊的藏契處。',body:'花窗亮成完整的九格。補記上寫著：「祖厝未售；原契仍在井邊暗格。若見出售通知，先查印章。」'}
  },
  {
    name:'井邊紀錄',english:'THE WELL',location:'三合院・井邊',subtitle:'阿蘭留下五張事件卡，要按真正發生的先後投入井框。',objective:'重建雨夜時間線',description:'結合現場時刻與證詞，依先後點選五張事件卡。',prompt:'由最早到最晚排列五件事',type:'timeline',
    hints:['找出最早的原契入盒與最後的出售通知。','借章在原契入盒之後；阿嬤病倒在借章後；補記在病倒之後、公告之前。','原契入盒 → 張管事借章 → 阿嬤病倒 → 補記藏起 → 出售通知。'],
    objects:[
      {id:'box',name:'藏契盒日期',icon:'▣',x:29,y:26,note:'原契入盒發生在借章之前。',body:'盒蓋刻著阿嬤的字：「<strong>先把原契放回盒裡</strong>，才把印章樣本交給張管事看。」'},
      {id:'borrow',name:'借章收據',icon:'▤',x:72,y:33,note:'張管事借章之後，阿嬤才病倒。',body:'收據背面補了一行：「<strong>借章後隔日，阿嬤病倒</strong>，由阿蘭收回印章盒。」'},
      {id:'memo',name:'阿蘭的證詞',icon:'✎',x:22,y:67,note:'補記在病倒後藏好，出售通知在其後貼出。',body:'阿蘭寫著：「阿嬤病倒之後，我替她把<strong>補記藏在花窗</strong>。等我再來，門口才出現出售通知。」'},
      {id:'notice',name:'門口公告抄本',icon:'◈',x:78,y:70,note:'出售通知是五件事中最後發生的。',body:'公告抄本上的貼出日期比阿蘭藏補記的日期晚。它是整段紀錄裡的<strong>最後一件事</strong>。'}
    ],reward:{name:'井框暗格打開',icon:'⚿',note:'時間線還原，井邊暗格露出原契與一張描印紙。',body:'第五張卡片投入井框後，暗格打開。原契仍在盒中，旁邊另有一張描印印章的薄紙。'}
  },
  {
    name:'藏契暗房',english:'THE DEED ROOM',location:'三合院・藏契暗房',subtitle:'出口門前有四個問題。要帶著正確的證據離開。',objective:'辨明出售通知真偽',description:'根據原契、補記、借章單與描印紙，選出完整的推論。',prompt:'四項推論都正確，出口才開',type:'deduction',
    hints:['先分清原契、補記與出售通知的關係。','借章者是張管事；公告上的印章是描印；原契與補記都指向未售。','選張管事、描印章、祖厝未售、帶走原契與補記。'],
    objects:[
      {id:'original',name:'祖厝原契',icon:'▤',x:28,y:29,note:'原契沒有出售記錄，與門口通知內容相反。',body:'原契仍留在阿嬤的盒裡，沒有轉讓記錄。門口通知卻聲稱已經完成出售，兩者<strong>內容相反</strong>。'},
      {id:'memo',name:'阿嬤的補記',icon:'✎',x:68,y:28,note:'補記明寫祖厝未售。',body:'補記末行清楚寫著：「<strong>祖厝未售</strong>。此屋不能由旁人代我作主。」'},
      {id:'tracing',name:'描印薄紙',icon:'◌',x:75,y:66,note:'出售通知的印章是沿薄紙描出的。',body:'薄紙上的印章輪廓與出售通知上的痕跡完全吻合；墨點甚至出現在同一處。這枚章是<strong>描印</strong>上去的。'},
      {id:'receipt',name:'印章借用單',icon:'⚿',x:22,y:67,note:'張管事借看過印章樣本。',body:'借用單署名<strong>張管事</strong>。他在阿嬤病前借看印章樣本，而時間線顯示出售通知是在病後才貼出。'}
    ],reward:{name:'祖厝出口開啟',icon:'✦',note:'原契、補記與描印紙一起被帶出暗房。',body:'四個問題都對上了。你帶著原契與補記離開，門口的出售通知再也無法單憑一張紙說服所有人。'}
  }
];

const lanternOptions=[['white','白','◉'],['green','青','◆'],['red','紅','●'],['orange','橙','✦'],['blue','藍','◈']];
const slideGoal=[0,1,2,3,4,5,6,7,-1];
const slideGlyphs=['祖','屋','不','可','私','自','轉','賣'];
const pipeKinds=['straight','straight','corner','corner','straight','corner','corner','straight','straight'];
const pipeStart=[1,1,0,3,1,1,2,1,1];
const weights=[1,2,3,5,8,13];
const placeNames=[['hall','正廳'],['kitchen','灶間'],['granary','穀倉'],['well','井邊']];
const peopleOptions=[['','選擇人名'],['fu','阿福'],['ju','阿菊'],['tian','阿田'],['lan','阿蘭']];
const timelineOptions=[['deed','原契入盒'],['borrow','張管事借章'],['illness','阿嬤病倒'],['memo','補記藏起'],['notice','出售通知']];
const deductionFields=[
  ['actor','誰借章並張貼通知？',[['','選擇人物'],['steward','張管事'],['lan','阿蘭'],['fu','阿福']]],
  ['method','通知上的印章如何出現？',[['','選擇方式'],['traced','從樣本描印'],['pressed','阿嬤親自蓋章'],['carved','重新雕刻']]],
  ['status','原契與補記證明什麼？',[['','選擇結論'],['unsold','祖厝未售'],['sold','祖厝已售'],['unknown','無法判斷']]],
  ['evidence','應帶走哪兩份主要文件？',[['','選擇文件'],['deed_memo','原契與補記'],['notice_map','通知與地圖'],['receipt_recipe','收據與食譜']]]
];
const initialCourtyardState=()=>({started:false,complete:false,chapter:0,unlocked:0,solved:[],seen:[],seconds:0,hints:Array(8).fill(0),lantern:[],slider:[4,6,1,5,-1,2,0,3,7],pipes:[...pipeStart],balance:[],matching:{hall:'',kitchen:'',granary:'',well:''},lights:[true,true,true,true,true,true,true,true,true],timeline:[],deduction:{actor:'',method:'',status:'',evidence:''},highlight:false});

// 花窗從全亮狀態按四格打亂，確保每次開局都可解。
function toggleLight(bits,n){const targets=[n,n-3,n+3,n%3? n-1:-1,n%3<2?n+1:-1];for(const t of targets)if(t>=0&&t<9)bits[t]=!bits[t];}
const courtyardFresh=()=>{const state=initialCourtyardState();for(const n of [0,1,4,8])toggleLight(state.lights,n);return state;};
let courtyardState=courtyardFresh();
try{
  const saved=JSON.parse(localStorage.getItem(COURTYARD_SAVE_KEY)||'null');
  if(saved&&Number.isInteger(saved.chapter)&&saved.chapter>=0&&saved.chapter<8&&Number.isInteger(saved.unlocked)&&saved.unlocked>=0&&saved.unlocked<8){
    const fresh=courtyardFresh();
    courtyardState={...fresh,...saved,chapter:Math.min(saved.chapter,saved.unlocked),solved:Array.isArray(saved.solved)?saved.solved:[],seen:Array.isArray(saved.seen)?saved.seen:[],hints:Array.isArray(saved.hints)?saved.hints:fresh.hints,lantern:Array.isArray(saved.lantern)?saved.lantern:[],slider:Array.isArray(saved.slider)&&saved.slider.length===9?saved.slider:fresh.slider,pipes:Array.isArray(saved.pipes)&&saved.pipes.length===9?saved.pipes:fresh.pipes,balance:Array.isArray(saved.balance)?saved.balance:[],matching:{...fresh.matching,...(saved.matching||{})},lights:Array.isArray(saved.lights)&&saved.lights.length===9?saved.lights:fresh.lights,timeline:Array.isArray(saved.timeline)?saved.timeline:[],deduction:{...fresh.deduction,...(saved.deduction||{})},highlight:!!saved.highlight};
  }
}catch(_){}

const y=id=>document.getElementById(id);
const ySave=()=>{try{localStorage.setItem(COURTYARD_SAVE_KEY,JSON.stringify(courtyardState));}catch(_){}};
const yPad=n=>String(n).padStart(2,'0');
const yTime=()=>`${yPad(Math.floor(courtyardState.seconds/60))}:${yPad(courtyardState.seconds%60)}`;
const ySeen=(i,id)=>`${i}:${id}`;
let yPriorFocus=null,yModalAction=null;

function courtyardArt(index){
  const motifs=[
    '<path d="M120 315 H680" stroke="#d8b17b" stroke-width="7"/><path d="M175 315 V210 M285 315 V210 M400 315 V210 M515 315 V210 M625 315 V210" stroke="#b88e61" stroke-width="3"/><circle cx="175" cy="340" r="30" fill="#ddd0a8"/><circle cx="285" cy="340" r="30" fill="#829c7b"/><circle cx="400" cy="340" r="30" fill="#b7685d"/><circle cx="515" cy="340" r="30" fill="#c9915c"/><circle cx="625" cy="340" r="30" fill="#718da4"/>',
    '<rect x="235" y="133" width="330" height="300" fill="#5f4831" stroke="#ddc092" stroke-width="7"/><path d="M345 133 V433 M455 133 V433 M235 233 H565 M235 333 H565" stroke="#b99c70" stroke-width="6"/><text x="400" y="305" text-anchor="middle" font-size="75" fill="#e8d3a7">祖</text>',
    '<path d="M130 200 H670 M670 200 V340 H130 M130 340 V425 H670" fill="none" stroke="#5b7f75" stroke-width="36" stroke-linecap="round"/><path d="M130 200 H670 M670 200 V340 H130 M130 340 V425 H670" fill="none" stroke="#bdd2b5" stroke-width="8"/>',
    '<path d="M210 265 H590 M400 265 V405" stroke="#d8bb8c" stroke-width="12"/><path d="M250 270 L205 375 H295 Z M550 270 L505 375 H595 Z" fill="#8a6947" stroke="#d7b58a" stroke-width="5"/><circle cx="400" cy="234" r="24" fill="#bb9661"/>',
    '<rect x="200" y="165" width="400" height="295" fill="#664e34" stroke="#c8ac7f" stroke-width="7"/><path d="M245 215 H550 M245 270 H550 M245 325 H550 M245 380 H550" stroke="#c3ae85" stroke-width="5"/><text x="400" y="435" text-anchor="middle" font-size="34" fill="#e3cf9b">四人名冊</text>',
    '<path d="M195 120 H605 V445 H195 Z" fill="#343e31" stroke="#d6c18e" stroke-width="11"/><path d="M330 120 V445 M465 120 V445 M195 230 H605 M195 337 H605" stroke="#e3c48f" stroke-width="8"/><circle cx="400" cy="283" r="45" fill="#e5d29c" opacity=".6"/>',
    '<circle cx="400" cy="335" r="156" fill="#3a4d49" stroke="#d0b288" stroke-width="20"/><circle cx="400" cy="335" r="108" fill="#223d3c" stroke="#7da69e" stroke-width="9"/><path d="M300 335 H500 M400 235 V435" stroke="#9bb8a7" stroke-width="5"/><path d="M180 190 H620" stroke="#c8a474" stroke-width="9"/>',
    '<rect x="235" y="135" width="330" height="300" fill="#76543c" stroke="#d7b685" stroke-width="6"/><path d="M270 205 H530 M270 250 H530 M270 295 H510 M270 340 H475" stroke="#ecd4a6" stroke-width="6"/><circle cx="510" cy="383" r="37" fill="#b8564b" stroke="#e3b28f" stroke-width="5"/>'
  ];
  return `<svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${courtyardStages[index].name}的場景"><defs><linearGradient id="cy-wall${index}" x2="1" y2="1"><stop stop-color="#67634b"/><stop offset="1" stop-color="#203433"/></linearGradient><radialGradient id="cy-light${index}"><stop stop-color="#e2b87c66"/><stop offset="1" stop-color="#e2b87c00"/></radialGradient></defs><rect width="800" height="560" fill="url(#cy-wall${index})"/><circle cx="400" cy="285" r="355" fill="url(#cy-light${index})"/><path d="M0 135 H800 M0 470 H800 M125 135 V470 M270 135 V470 M530 135 V470 M680 135 V470" stroke="#d8b989" stroke-opacity=".15" stroke-width="5"/><path d="M0 135 L400 50 L800 135" fill="none" stroke="#292f2c" stroke-width="48"/><path d="M0 495 Q400 465 800 495 V560 H0 Z" fill="#202923" opacity=".8"/>${motifs[index]}</svg>`;
}

function courtyardRender(){
  const s=courtyardState,i=s.chapter,stage=courtyardStages[i];
  y('cy-timer').textContent=yTime();y('cy-progress-text').textContent=`${s.solved.length} / 8`;y('cy-progress-fill').style.width=`${s.solved.length/8*100}%`;y('cy-clue-count').textContent=`${s.seen.length} 條`;
  y('cy-nav').innerHTML=courtyardStages.map((entry,n)=>`<button class="room-button ${n===i?'active':''}" type="button" data-stage="${n}" ${n>s.unlocked?'disabled':''} ${n===i?'aria-current="step"':''}><span class="room-number">${yPad(n+1)}</span><span class="room-name">${entry.name}</span><span class="room-state">${s.solved.includes(n)?'已完成':n>s.unlocked?'未開啟':'調查中'}</span></button>`).join('');
  y('cy-clues').innerHTML=s.seen.length?s.seen.map(key=>{const [index,id]=key.split(':'),obj=courtyardStages[Number(index)]?.objects.find(x=>x.id===id);return obj?`<div class="clue-item"><strong>${obj.name}</strong><span>${obj.note}</span><small>${courtyardStages[Number(index)].name}</small></div>`:'';}).join(''):'<p class="empty-note">調查物件後，線索會記在這裡。</p>';
  y('cy-chapter-label').textContent=`CHAPTER ${yPad(i+1)} — ${stage.english}`;y('cy-title').textContent=stage.name;y('cy-subtitle').textContent=stage.subtitle;y('cy-count').textContent=`${yPad(i+1)} / 08`;y('cy-location').textContent=stage.location;
  y('cy-objective-no').innerHTML=`${yPad(i+1)}<span>/08</span>`;y('cy-objective').textContent=stage.objective;y('cy-objective-desc').textContent=stage.description;y('cy-prompt').textContent=stage.prompt;y('cy-status').textContent=s.solved.includes(i)?'SOLVED':'ACTIVE';
  y('cy-art').innerHTML=courtyardArt(i);
  y('cy-hotspots').innerHTML=stage.objects.map(o=>`<button class="hotspot ${s.seen.includes(ySeen(i,o.id))?'visited':''}" type="button" data-object="${o.id}" style="left:${o.x}%;top:${o.y}%" aria-label="調查${o.name}"><span class="hotspot-icon">${o.icon}</span><span>${o.name}</span><i class="hotspot-dot"></i></button>`).join('');
  y('cy-objects').innerHTML=stage.objects.map(o=>`<button class="mobile-object-button ${s.seen.includes(ySeen(i,o.id))?'visited':''}" type="button" data-object="${o.id}"><span>${o.icon}</span>${o.name}</button>`).join('');
  y('cy-footer-count').textContent=`已發現 ${stage.objects.filter(o=>s.seen.includes(ySeen(i,o.id))).length} / ${stage.objects.length} 件`;
  const hint=s.hints[i]||0;y('cy-hint-content').textContent=hint?`提示 ${hint} / 3：${stage.hints[hint-1]}`:'';y('cy-hint-content').classList.toggle('open',hint>0);y('cy-hint-button').querySelector('span:nth-child(2)').textContent=hint===3?'已顯示完整提示':hint?'再給我一點提示':'需要一點提示？';
  courtyardRenderChallenge();y('cy-feedback').textContent=s.solved.includes(i)?'此機關已解開，可切換場景重看線索。':'線索分散在場景裡。';y('cy-feedback').className='code-message';
  document.body.classList.toggle('highlight-hints',s.highlight);y('cy-highlight-toggle').setAttribute('aria-pressed',String(s.highlight));y('cy-highlight-toggle').setAttribute('aria-label',`黃字提示：${s.highlight?'開啟':'關閉'}`);y('cy-highlight-status').textContent=s.highlight?'開':'關';
}
const yOptionHtml=(options,value)=>options.map(([id,label])=>`<option value="${id}" ${id===value?'selected':''}>${label}</option>`).join('');
const isNeighbor=(a,b)=>Math.abs(Math.floor(a/3)-Math.floor(b/3))+Math.abs(a%3-b%3)===1;
function courtyardRenderChallenge(){
  const s=courtyardState,i=s.chapter,type=courtyardStages[i].type,solved=s.solved.includes(i);let html='';
  if(type==='lantern')html=`<div class="cy-readout">已點：${s.lantern.map(id=>lanternOptions.find(x=>x[0]===id)?.[1]).join(' → ')||'尚未點燈'}</div><div class="cy-choice-grid">${lanternOptions.map(([id,name,symbol])=>`<button type="button" data-action="lantern" data-value="${id}" ${s.lantern.includes(id)||solved?'disabled':''}><b>${symbol}</b>${name}</button>`).join('')}</div><button class="cy-secondary" type="button" data-action="undo" ${solved?'disabled':''}>撤回上一盞</button>`;
  if(type==='slider')html=`<div class="cy-readout">目標：祖屋不可私自轉賣 · 空格在右下</div><div class="cy-slide-grid">${s.slider.map((tile,n)=>tile===-1?'<div class="cy-empty" aria-label="空格"></div>':`<button type="button" data-action="slide" data-index="${n}" aria-label="第 ${Math.floor(n/3)+1} 列第 ${n%3+1} 格，${slideGlyphs[tile]}" ${solved||!isNeighbor(n,s.slider.indexOf(-1))?'disabled':''}>${slideGlyphs[tile]}</button>`).join('')}</div><div class="cy-small-note">只能移動空格上下左右相鄰的木牌。</div>`;
  if(type==='pipes')html=`<div class="cy-pipe-labels"><span>入口 →</span><span>→ 出口</span></div><div class="cy-pipe-grid">${s.pipes.map((turn,n)=>`<button type="button" data-action="pipe" data-index="${n}" aria-label="旋轉第 ${Math.floor(n/3)+1} 列第 ${n%3+1} 格${pipeKinds[n]==='straight'?'直':'彎'}管" ${solved?'disabled':''}><span style="transform:rotate(${turn*90}deg)">${pipeKinds[n]==='straight'?'━':'╰'}</span><small>${n+1}</small></button>`).join('')}</div><button class="cy-submit" type="button" data-action="check" ${solved?'disabled':''}>試水 →</button>`;
  if(type==='balance')html=`<div class="cy-readout">已選 ${s.balance.length} / 3 枚 · 合計 ${s.balance.reduce((a,b)=>a+b,0)} 格</div><div class="cy-choice-grid cy-weights">${weights.map(n=>`<button type="button" data-action="weight" data-value="${n}" aria-pressed="${s.balance.includes(n)}" ${solved?'disabled':''}><b>${n}</b>格${n===13?' · 釘住':''}</button>`).join('')}</div><button class="cy-submit" type="button" data-action="check" ${solved?'disabled':''}>稱重 →</button>`;
  if(type==='matching')html=`<div class="cy-selects">${placeNames.map(([id,label])=>`<label>${label}<select data-field="${id}" ${solved?'disabled':''}>${yOptionHtml(peopleOptions,s.matching[id])}</select></label>`).join('')}</div><button class="cy-submit" type="button" data-action="check" ${solved?'disabled':''}>核對名冊 →</button>`;
  if(type==='lights')html=`<div class="cy-light-grid">${s.lights.map((on,n)=>`<button type="button" data-action="light" data-index="${n}" aria-label="第 ${Math.floor(n/3)+1} 列第 ${n%3+1} 格，${on?'亮':'暗'}" aria-pressed="${on}" ${solved?'disabled':''}><span>${on?'✦':'·'}</span></button>`).join('')}</div><div class="cy-small-note">每次會翻轉自己和上下左右相鄰格。</div>`;
  if(type==='timeline')html=`<div class="cy-readout">已排：${s.timeline.map(id=>timelineOptions.find(x=>x[0]===id)?.[1]).join(' → ')||'尚未選取'}</div><div class="cy-timeline-grid">${timelineOptions.map(([id,label])=>`<button type="button" data-action="timeline" data-value="${id}" ${s.timeline.includes(id)||solved?'disabled':''}>${label}</button>`).join('')}</div><button class="cy-secondary" type="button" data-action="undo" ${solved?'disabled':''}>撤回上一張</button>`;
  if(type==='deduction')html=`<div class="cy-selects">${deductionFields.map(([id,label,options])=>`<label>${label}<select data-field="${id}" ${solved?'disabled':''}>${yOptionHtml(options,s.deduction[id])}</select></label>`).join('')}</div><button class="cy-submit" type="button" data-action="check" ${solved?'disabled':''}>打開出口 →</button>`;
  y('cy-challenge').innerHTML=html;
}

function courtyardFeedback(message,error=false){y('cy-feedback').textContent=message;y('cy-feedback').className=`code-message ${error?'error':'success'}`;}
function courtyardPipeConnected(){
  const turns=courtyardState.pipes.map(Number);if(turns.some((n,i)=>!Number.isInteger(n)||n<0||n>=(pipeKinds[i]==='straight'?2:4)))return false;
  let tile=0,entry=3;const visited=new Set();
  while(true){
    if(visited.has(tile))return false;visited.add(tile);
    const ports=pipeKinds[tile]==='straight'?(turns[tile]===0?[1,3]:[0,2]):[[0,1],[1,2],[2,3],[3,0]][turns[tile]];
    if(!ports.includes(entry))return false;
    const exit=ports.find(n=>n!==entry);
    if(tile===8&&exit===1)return visited.size===9;
    const row=Math.floor(tile/3),col=tile%3;
    const next=exit===0?(row>0?tile-3:-1):exit===1?(col<2?tile+1:-1):exit===2?(row<2?tile+3:-1):(col>0?tile-1:-1);
    if(next<0)return false;tile=next;entry=(exit+2)%4;
  }
}
function courtyardSubmit(){
  const s=courtyardState,type=courtyardStages[s.chapter].type;if(s.solved.includes(s.chapter))return;
  let correct=false,message='機關沒有反應，重新核對線索。';
  if(type==='pipes'){correct=courtyardPipeConnected();message='水路未穿過全部九段，或出口方向不對。';}
  if(type==='balance'){correct=s.balance.length===3&&s.balance.includes(3)&&s.balance.includes(5)&&s.balance.includes(8);message=s.balance.length!==3?'秤盤要放恰好三枚砝碼。':s.balance.includes(13)?'十三格大石被釘住，不能使用。':'秤桿仍然傾斜，重新計算木箱重量。';}
  if(type==='matching'){const selected=placeNames.map(([id])=>s.matching[id]);correct=selected.join(',')==='fu,ju,tian,lan';message=selected.some(x=>!x)?'四個地方都需要分配人員。':new Set(selected).size!==4?'每人只能分配到一個地方。':'有人被分到與線索不符的地方。';}
  if(type==='deduction'){const d=s.deduction;correct=d.actor==='steward'&&d.method==='traced'&&d.status==='unsold'&&d.evidence==='deed_memo';message=Object.values(d).some(x=>!x)?'四項推論都要填妥。':'至少有一項推論與原件或時間線不符。';}
  if(correct)courtyardComplete();else courtyardFeedback(message,true);
}
function courtyardComplete(){
  const s=courtyardState,i=s.chapter;if(s.solved.includes(i))return;
  s.solved.push(i);const reward=courtyardStages[i].reward;
  if(i===7){s.complete=true;ySave();courtyardRender();courtyardShowModal({eyebrow:'MECHANISM OPEN',...reward,tag:'案件已解開 · 關閉後查看結局'},()=>courtyardShowEnding());return;}
  s.unlocked=Math.max(s.unlocked,i+1);s.chapter=i+1;ySave();courtyardRender();courtyardShowModal({eyebrow:'MECHANISM OPEN',...reward,tag:`已開啟 ${courtyardStages[i+1].name}`});
}
function courtyardInspect(id){
  const s=courtyardState,i=s.chapter,obj=courtyardStages[i].objects.find(x=>x.id===id);if(!obj)return;
  const key=ySeen(i,id);if(!s.seen.includes(key)){s.seen.push(key);ySave();courtyardRender();}
  courtyardShowModal({name:obj.name,icon:obj.icon,body:obj.body,tag:`${courtyardStages[i].name} / 線索已記入筆記`});
}
function courtyardShowModal({eyebrow='EVIDENCE',name,icon='✦',body,tag=''},onClose=null){
  yPriorFocus=document.activeElement;yModalAction=onClose;y('cy-modal-eyebrow').textContent=eyebrow;y('cy-modal-title').textContent=name;y('cy-modal-icon').textContent=icon;y('cy-modal-body').innerHTML=body;y('cy-modal-tag').textContent=tag;y('cy-modal').classList.remove('hidden');y('cy-modal-close').focus();
}
function courtyardCloseModal(){y('cy-modal').classList.add('hidden');const action=yModalAction;yModalAction=null;if(action)action();else if(yPriorFocus?.isConnected)yPriorFocus.focus();}
function courtyardShowEnding(){y('cy-ending-clues').textContent=courtyardState.seen.length;y('cy-ending-time').textContent=yTime();y('cy-ending-hints').textContent=courtyardState.hints.reduce((sum,n)=>sum+(Number(n)||0),0);y('cy-ending').classList.remove('hidden');}
function courtyardRestart(confirmFirst=true){if(confirmFirst&&!window.confirm('確定要清除雨夜三合院的進度並重新開始嗎？'))return;courtyardState=courtyardFresh();ySave();y('cy-modal').classList.add('hidden');y('cy-ending').classList.add('hidden');y('cy-intro').classList.remove('hidden');courtyardRender();}

y('cy-challenge').addEventListener('click',event=>{
  const button=event.target.closest('button[data-action]');if(!button||button.disabled)return;
  const action=button.dataset.action,s=courtyardState;
  if(action==='lantern'){
    const id=button.dataset.value;if(s.lantern.includes(id)||s.lantern.length>=5)return;s.lantern.push(id);
    if(s.lantern.length===5){if(s.lantern.join(',')==='white,green,red,orange,blue'){courtyardComplete();return;}courtyardFeedback('燈影沒有連成一線，可撤回重排。',true);}
  }else if(action==='slide'){
    const index=Number(button.dataset.index),blank=s.slider.indexOf(-1);if(!isNeighbor(index,blank))return;
    [s.slider[index],s.slider[blank]]=[s.slider[blank],s.slider[index]];
    if(s.slider.every((tile,n)=>tile===slideGoal[n])){courtyardComplete();return;}
  }else if(action==='pipe'){
    const n=Number(button.dataset.index);s.pipes[n]=(Number(s.pipes[n])+1)%(pipeKinds[n]==='straight'?2:4);
  }else if(action==='weight'){
    const n=Number(button.dataset.value),at=s.balance.indexOf(n);if(at>=0)s.balance.splice(at,1);else if(s.balance.length<3)s.balance.push(n);else{courtyardFeedback('一次只能放三枚石砝碼。',true);return;}
  }else if(action==='light'){
    toggleLight(s.lights,Number(button.dataset.index));
    if(s.lights.every(Boolean)){courtyardComplete();return;}
  }else if(action==='timeline'){
    const id=button.dataset.value;if(s.timeline.includes(id)||s.timeline.length>=5)return;s.timeline.push(id);
    if(s.timeline.length===5){if(s.timeline.join(',')==='deed,borrow,illness,memo,notice'){courtyardComplete();return;}courtyardFeedback('五張卡片沒有按真正的時間排列。',true);}
  }else if(action==='undo'){
    if(s.chapter===0)s.lantern.pop();if(s.chapter===6)s.timeline.pop();
  }else if(action==='check'){courtyardSubmit();return;}
  ySave();courtyardRenderChallenge();
  const selector=(action==='slide'||action==='pipe'||action==='light')?`button[data-action="${action}"][data-index="${button.dataset.index}"]`:action==='weight'?`button[data-action="weight"][data-value="${button.dataset.value}"]`:action==='lantern'||action==='timeline'?`button[data-action="${action}"]:not(:disabled)`:`button[data-action="${action}"]`;
  y('cy-challenge').querySelector(selector)?.focus?.();
});
y('cy-challenge').addEventListener('change',event=>{const field=event.target.dataset.field;if(!field)return;if(courtyardState.chapter===4)courtyardState.matching[field]=event.target.value;if(courtyardState.chapter===7)courtyardState.deduction[field]=event.target.value;ySave();});
y('cy-hotspots').addEventListener('click',event=>{const button=event.target.closest('[data-object]');if(button)courtyardInspect(button.dataset.object);});
y('cy-objects').addEventListener('click',event=>{const button=event.target.closest('[data-object]');if(button)courtyardInspect(button.dataset.object);});
y('cy-nav').addEventListener('click',event=>{const button=event.target.closest('[data-stage]');if(!button)return;const index=Number(button.dataset.stage);if(index>courtyardState.unlocked)return;courtyardState.chapter=index;ySave();courtyardRender();window.scrollTo({top:0,behavior:'smooth'});});
y('cy-hint-button').addEventListener('click',()=>{const i=courtyardState.chapter;courtyardState.hints[i]=Math.min(3,(Number(courtyardState.hints[i])||0)+1);ySave();const level=courtyardState.hints[i];y('cy-hint-content').textContent=`提示 ${level} / 3：${courtyardStages[i].hints[level-1]}`;y('cy-hint-content').classList.add('open');y('cy-hint-button').querySelector('span:nth-child(2)').textContent=level<3?'再給我一點提示':'已顯示完整提示';});
y('cy-modal-close').addEventListener('click',courtyardCloseModal);y('cy-modal-action').addEventListener('click',courtyardCloseModal);y('cy-modal').addEventListener('click',event=>{if(event.target===y('cy-modal'))courtyardCloseModal();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!y('cy-modal').classList.contains('hidden'))courtyardCloseModal();});
y('cy-highlight-toggle').addEventListener('click',()=>{courtyardState.highlight=!courtyardState.highlight;ySave();document.body.classList.toggle('highlight-hints',courtyardState.highlight);y('cy-highlight-toggle').setAttribute('aria-pressed',String(courtyardState.highlight));y('cy-highlight-toggle').setAttribute('aria-label',`黃字提示：${courtyardState.highlight?'開啟':'關閉'}`);y('cy-highlight-status').textContent=courtyardState.highlight?'開':'關';});
y('cy-start').addEventListener('click',()=>{courtyardState.started=true;ySave();y('cy-intro').classList.add('hidden');if(courtyardState.complete)courtyardShowEnding();});
y('cy-restart').addEventListener('click',()=>courtyardRestart(true));y('cy-ending-restart').addEventListener('click',()=>courtyardRestart(false));
y('cy-notes-toggle').addEventListener('click',()=>{const panel=document.querySelector('.case-panel');const open=panel.classList.toggle('notes-open');y('cy-notes-toggle').setAttribute('aria-expanded',String(open));y('cy-notes-toggle').querySelector('span').textContent=open?'−':'＋';});
if(courtyardState.started)y('cy-intro').classList.add('hidden');courtyardRender();if(courtyardState.complete&&courtyardState.started)courtyardShowEnding();
setInterval(()=>{if(courtyardState.started&&!courtyardState.complete&&y('cy-intro').classList.contains('hidden')){courtyardState.seconds++;y('cy-timer').textContent=yTime();if(courtyardState.seconds%10===0)ySave();}},1000);
