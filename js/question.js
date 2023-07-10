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
    'ー' : '-'
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
    'いも'
];

let romanArray = [];
let text = '';

let count = 0; // 正解数
let TIME = 20; // 制限時間
let state = true; // キー入力有効

// 開始処理
function init() {
    const rnd = Math.floor(Math.random() * textList.length);

    subject.textContent = textList[rnd];
    text = subject.textContent; // 問題文を格納
    setChar();

    input.textContent = '';
}

// ゲーム開始
init();

// キーが押されたとき
window.addEventListener('keydown', (event) => {
    let key = event.key;

    if(!state) return;  // ゲーム終了後は操作できなくする

    // ローマ字の一文字目がヘボン式か訓令式か判定
    for (let i=0; i<romanArray.length; i++) {
        if (key == romanArray[i].slice(0, 1)) {
            input.textContent += romanArray[i].slice(0, 1);
            for (let j=0; j<romanArray.length; j++) {
                romanArray[j] = romanArray[j].slice(1);
            }
            if (romanArray[i].length == 0) {
                setChar();
            }
        }
    }
})

// 判定するかな一文字の設定
function setChar() {
    let oneChar = text.slice(0, 1); // かな一文字目を取り出す
    console.log(oneChar);
    let romanMapArray = JSON.parse(JSON.stringify(romanMap)); // ヘボン式と訓令式をローマ字に変換し、配列に格納
    romanArray = romanMapArray[oneChar];

    // 文章を入力し終えたら次の問題へ
    if (text.length == 0) {
        count++;
        setTimeout(function(){ init() }, 100);
    }

    text = text.slice(1); // 一文字削る
}

// カウントダウン
const countdown = setInterval(function() {
    timer.textContent = '制限時間：' + --TIME + '秒';
    if(TIME <= 0) finish();
}, 1000);

// 終了処理
function finish() {
    clearInterval(countdown);
    input.textContent = '';
    subject.textContent = '正解数は' + count + '個でした！';

    state = false; // キー入力無効
}