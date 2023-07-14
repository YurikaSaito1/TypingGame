const subject = document.getElementById('subject'); // 問題文
const input = document.getElementById('input'); // 入力エリア
const timer = document.getElementById('timer'); // タイマー

const romanMap = {
    'あ' : ['a'], 'い' : ['i'], 'う' : ['u'], 'え' : ['e'], 'お' : ['o'],
    'か' : ['ka'], 'き' : ['ki'], 'く' : ['ku'], 'け' : ['ke'], 'こ' : ['ko'],
    'さ' : ['sa'], 'し' : ['shi', 'si'], 'す' : ['su'], 'せ' : ['se'], 'そ' : ['so'],
    'た' : ['ta'], 'ち' : ['chi', 'ti'], 'つ' : ['tsu', 'tu'], 'て' : ['te'], 'と' : ['to'],
    'な' : ['na'], 'に' : ['ni'], 'ぬ' : ['nu'], 'ね' : ['ne'], 'の' : ['no'],
    'は' : ['ha'], 'ひ' : ['hi'], 'ふ' : ['fu', 'hu'], 'へ' : ['he'], 'ほ' : ['ho'],
    'ま' : ['ma'], 'み' : ['mi'], 'む' : ['mu'], 'め' : ['me'], 'も' : ['mo'],
    'や' : ['ya'], 'ゆ' : ['yu'], 'よ' : ['yo'],
    'ら' : ['ra'], 'り' : ['ri'], 'る' : ['ru'], 'れ' : ['re'], 'ろ' : ['ro'],
    'わ' : ['wa'], 'を' : ['wo'], 'ん' : ['nn'],
    'が' : ['ga'], 'ぎ' : ['gi'], 'ぐ' : ['gu'], 'げ' : ['ge'], 'ご' : ['go'],
    'ざ' : ['za'], 'じ' : ['ji', 'zi'], 'ず' : ['zu'], 'ぜ' : ['ze'], 'ぞ' : ['zo'],
    'だ' : ['da'], 'ぢ' : ['di'], 'づ' : ['du'], 'で' : ['de'], 'ど' : ['do'],
    'ば' : ['ba'], 'び' : ['bi'], 'ぶ' : ['bu'], 'べ' : ['be'], 'ぼ' : ['bo'],
    'ぱ' : ['pa'], 'ぴ' : ['pi'], 'ぷ' : ['pu'], 'ぺ' : ['pe'], 'ぽ' : ['po'],
    'ぁ' : ['la', 'xa'], 'ぃ' : ['li', 'xi'], 'ぅ' : ['lu', 'xu'],
    'ぇ' : ['le', 'xe'], 'ぉ' : ['lo', 'xo'],
    'ゃ' : ['lya', 'xya'], 'ゅ' : ['lyu', 'xyu'], 'ょ' : ['lyo', 'xyo'], 'っ' : ['ltu', 'xtu'],
    'うぉ' : ['who'],
    'きゃ' : ['kya', 'kilya', 'kixya'], 'きゅ' : ['kyu', 'kilyu', 'kixyu'],
    'きょ' : ['kyo', 'kilyo', 'kixyo'],
    'しゃ' : ['sya', 'sha', 'shilya', 'shixya','silya', 'sixya'],
    'しゅ' : ['syu', 'shu', 'shilyu', 'shixyu', 'silyu', 'sixyo'],
    'しょ' : ['syo', 'sho', 'shilyo', 'shixyo', 'silyo', 'sixyo'],
    'ちゃ' : ['tya', 'cha', 'tilya', 'tixya', 'chilya', 'chixya'],
    'ちゅ' : ['tyu', 'chu', 'tilyu', 'tixyu', 'chilyu', 'chixyu'],
    'ちょ' : ['tyo', 'cho', 'tilyo', 'tixyo', 'chilyo', 'chixyo'], 
    'てぃ' : ['thi', 'teli', 'texi'],
    'にゃ' : ['nya'], 'にゅ' : ['nyu'], 'にょ' : ['nyo'],
    'ー' : ['-'], '、' : [','], '。' : ['.']
};

const textList = [
    'りんご',
    'ばなな',
    'みかん',
    'いちご',
    'ぶどう',
    'ちくわ',
    'しそ',
    'とろろ',
    'なずな',
    'いも',
    'らーめん',
    'ちゃーはん',
    'おちゃ',
    'てぃー'
];

let romanArray = [];
let text = '';

let count = 0; // 正解数
let TIME = 20; // 制限時間
let state = true; // キー入力有効

// 開始処理
function init() {
    const rnd = Math.floor(Math.random() * textList.length);

    subject.textContent = textList[rnd]; // 問題文を設定
    text = subject.textContent; // 問題文を格納
    setChar();

    input.textContent = ''; // 入力欄をクリア
}

// ゲーム開始
init();

// キーが押されたとき
window.addEventListener('keydown', (event) => {
    let key = event.key;

    if(!state) return;  // ゲーム終了後は操作できなくする

    let charFlag = [];
    let inputFlag = 0;
    let nextChar = 0;

    for (let i=0; i<romanArray.length; i++) {
        charFlag[i] = 0;
    }

    // ローマ字の一文字目がヘボン式か訓令式か判定
    for (let i=0; i<romanArray.length; i++) {
        if (key == romanArray[i].slice(0, 1)) {
            if (inputFlag == 0) {
                input.textContent += romanArray[i].slice(0, 1);
                inputFlag = 1;
            }

            charFlag[i] = 1;

            romanArray[i] = romanArray[i].slice(1);
            
            if (romanArray[i].length == 0) {
                setChar();
                nextChar = 1;
                break;
            }
        }
    }
    if (nextChar == 0) {
        if (inputFlag == 1) {
            for (let i=0; i<romanArray.length; i++) {
                if (charFlag[i] == 0) {
                    romanArray.splice(i, 1);
                }
            }
        }
    }
})

// 判定するかな一文字の設定
function setChar() {
    // 文章を入力し終えたら次の問題へ
    if (text.length == 0) {
        count++;
        setTimeout(function(){ init() }, 100);
    }

    let romanMapArray = JSON.parse(JSON.stringify(romanMap)); // ヘボン式と訓令式をローマ字に変換し、配列に格納
    if (text.slice(1, 2).match(/[ぃぇぉゃゅょ]/)) {
        let twoChar = text.slice(0, 2);
        romanArray = romanMapArray[twoChar];
        text = text.slice(2); // 二文字削る
    } else {
        let oneChar = text.slice(0, 1); // かな一文字目を取り出す
        romanArray = romanMapArray[oneChar];
        text = text.slice(1); // 一文字削る
    }
}

// カウントダウン
const countdown = setInterval(function() {
    timer.textContent = '制限時間：' + --TIME + '秒';
    if(TIME <= 0) {
        state = false;
        setTimeout(function(){ finish()}, 500);
    }
}, 1000);

// 終了処理
function finish() {
    clearInterval(countdown);
    input.textContent = '';
    subject.textContent = '正解数は' + count + '個でした！';
}