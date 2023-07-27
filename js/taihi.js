const body = document.body;
const subject = document.getElementById('subject'); // 問題文
const subjectRoma = document.getElementById('subjectRoma');
const input = document.getElementById('input'); // 入力エリア
const timer = document.getElementById('timer'); // タイマー
const missCount = document.getElementById('missCount'); // ミスの回数
const keyboard = document.getElementById('keyboard');
const finger = document.getElementById('finger');
const left_fourth = document.getElementById('left_fourth');
const left_third = document.getElementById('left_third');
const left_second = document.getElementById('left_second');
const left_first = document.getElementById('left_first');
const left_thumb = document.getElementById('left_thumb');
const right_thumb = document.getElementById('right_thumb');
const right_first = document.getElementById('right_first');
const right_second = document.getElementById('right_second');
const right_third = document.getElementById('right_third');
const right_fourth = document.getElementById('right_fourth');
const weak = document.getElementById('weak');

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

const leftFourth = ['1', 'a', 'q', 'z'];
const leftThird = ['2', 'w', 's', 'x'];
const leftSecond = ['3', 'e', 'd', 'c'];
const leftFirst = ['4', '5', 'r', 't', 'f', 'g', 'v', 'b'];
const thumb = [' '];
const rightFirst = ['6', '7', 'y', 'u', 'h', 'j', 'n', 'm'];
const rightSecond = ['8', 'i', 'k', ','];
const rightThird = ['9', 'o', 'l', '.'];
const rightFourth = ['0', '-', 'p'];

const textList = [
    'りんご',
    'バナナ',
    'みかん',
    'いちご',
    'ぶどう',
    'ちくわ',
    'しそ',
    'とろろ',
    'なずな',
    'いも',
    'ラーメン',
    'チャーハン',
    'おちゃ',
    'ティー',
    'コップ',
    'アイス',
    'ココア',
    'ラッシー'
];

let romanArray = []; // 問題文一文字分を格納
let text = ''; // 問題文を格納

let readyCountdown; // 開始時カウントダウン
let countdown; // 解答時カウントダウン
let count = 0; // 正解数
let miss = 0; // ミスの回数
let READYTIME = 4; // 開始までの秒数＋１
let TIME = 20; // 制限時間
let state = true; // キー入力有効
let readyFlag = true; // 開始したかどうかの判定
let weakKeys = new Object();

// 開始処理
function ready() {
    clearInterval(readyCountdown);

    init();

    // カウントダウン
    countdown = setInterval(function() {
        timer.textContent = '制限時間：' + --TIME + '秒';
        if(TIME <= 0) {
            state = false;
            setTimeout(function(){ finish()}, 500);
        }
    }, 1000);
}

// 問題の更新
function init() {
    const rnd = Math.floor(Math.random() * textList.length);

    subject.textContent = textList[rnd]; // 問題文を設定

    // 問題文のローマ字表示
    text = subject.textContent; // 問題文を格納
    text = kataToHira(text); // カタカナをひらがなに変換
    subjectRoma.textContent = '';
    // 全てのローマ字を表示
    for (let i=0; i=text.length; i++) {
        determine();
        subjectRoma.textContent += romanArray[0];
    }

    // 最初の文字のローマ字をセット
    text = subject.textContent; // 問題文を格納
    text = kataToHira(text);
    setChar();

    input.textContent = ''; // 入力欄をクリア

    state = true; // 入力を可能にする
}

// キーが押されたとき
window.addEventListener('keydown', (event) => {
    let key = event.key;

    if(!state) return;  // ゲーム終了後は操作できなくする

    // キーボードのハイライトをクリア
    if (!readyFlag) {
        let elem = document.getElementById("key_" + romanArray[0].slice(0, 1));
        elem.style.backgroundColor = "white";

        clearFinger(romanArray[0].slice(0, 1));
    }

    let charFlag = []; // 入力された文字と同じかどうかの判定
    let inputFlag = false; // 表示したかどうかの判定
    let nextFlag = false; // 一文字分打ち終わったかの判定

    // charFlagの初期化
    for (let i=0; i<romanArray.length; i++) {
        charFlag[i] = false;
    }

    for (let i=0; i<romanArray.length; i++) {
        // 入力キーが正しい時
        if (key == romanArray[i].slice(0, 1)) {
            if (!inputFlag) {
                input.textContent += romanArray[i].slice(0, 1); // ディスプレイに表示
                inputFlag = true;
            }

            charFlag[i] = true;

            // 一文字削る
            romanArray[i] = romanArray[i].slice(1);
            
            // かな一文字分入力し終わった時
            if (romanArray[i].length == 0) {
                setChar();
                nextFlag = 1;
                break;
            }
        }
    }

    // ミスした時
    if (!inputFlag && !readyFlag) {
        body.style.backgroundColor = "red";
        window.setTimeout(function(){
            body.style.backgroundColor = "white";
        }, 100);

        miss++;

        if (key in weakKeys) {
            weakKeys[key] += 1;
        } else {
            weakKeys[key] = 1;
        }

        elem = document.getElementById("key_" + romanArray[0].slice(0, 1));
        elem.style.backgroundColor = "lightblue";

        setFinger(romanArray[0].slice(0, 1));
    }

    // 当てはまらない解答を削除
    if (!nextFlag && inputFlag) {
        for (let i=0; i<romanArray.length; i++) {
            if (!charFlag[i]) {
                romanArray.splice(i, 1);
                charFlag.splice(i, 1);
            }
        }
        elem = document.getElementById("key_" + romanArray[0].slice(0, 1));
        elem.style.backgroundColor = "lightblue";

        setFinger(romanArray[0].slice(0, 1));
    }

    // スペースキーで開始
    if (key == " " && readyFlag == true) {
        state = false;
        readyFlag = false;
        readyCountdown = setInterval(function() {
            subject.textContent = --READYTIME;
            if(READYTIME == 1) {
                setTimeout(function(){ ready()}, 1000);
            }
        }, 1000);
    }
})

// 判定するかな一文字の設定
function setChar() {
    // 文章を入力し終えたら次の問題へ
    if (text.length == 0) {
        count++;
        setTimeout(function(){ init() }, 100);
    } else {
        determine();

        var elem = document.getElementById("key_" + romanArray[0].slice(0, 1));
        elem.style.backgroundColor = "lightblue";

        setFinger(romanArray[0].slice(0, 1));
    }
}

// カタカナをひらがなに変換
function kataToHira(str) {
    return str.replace(/[\u30A1-\u30FA]/g, ch =>
        String.fromCharCode(ch.charCodeAt(0) - 0x60)
    );
    }

function determine() {
    let romanMapArray = JSON.parse(JSON.stringify(romanMap)); // ヘボン式と訓令式をローマ字に変換し、配列に格納
    if (text.slice(1, 2).match(/[ぃぇぉゃゅょ]/)) {
        let nextChar = text.slice(0, 2);
        romanArray = romanMapArray[nextChar];
        text = text.slice(2); // 二文字削る
    } else if (text.slice(0, 1).match(/[っ]/)) {
        let romanArray1 = romanMapArray['っ'];
        let nextChar = text.slice(1, 2);
        let romanArray2 = romanMapArray[nextChar];
        for (let i=0; i<romanArray1.length; i++) {
            for (let j=0; j<romanArray2.length; j++) {
                romanArray[i * romanArray2.length + j] = romanArray1[i] + romanArray2[j];
            }
        }
        for (let i=0; i<romanArray2.length; i++){
            romanArray2[i] = romanArray2[i].slice(0, 1) + romanArray2[i];
        }
        romanArray = romanArray2.concat(romanArray);
        text = text.slice(2);
    } else {
        let oneChar = text.slice(0, 1); // かな一文字目を取り出す
        romanArray = romanMapArray[oneChar];
        text = text.slice(1); // 一文字削る
    }
}

function setFinger(roman) {
    let finger = checkFinger(roman);
    if (finger == 'thumb') {
        left_thumb.style.backgroundColor = "lightblue";
        right_thumb.style.backgroundColor = "lightblue";
    } else {
        finger.style.backgroundColor = "lightblue";
    }
}

function clearFinger(roman) {
    let finger = checkFinger(roman);
    if (finger == 'thumb') {
        left_thumb.style.backgroundColor = "white";
        right_thumb.style.backgroundColor = "white";
    } else {
        finger.style.backgroundColor = "white";
    }
}

function checkFinger(roman) {
    if (leftFourth.includes(roman))         return left_fourth;
    else if (leftThird.includes(roman))     return left_third;
    else if (leftSecond.includes(roman))    return left_second;
    else if (leftFirst.includes(roman))     return left_first;
    else if (thumb.includes(roman))         return 'thumb';
    else if (rightFirst.includes(roman))    return right_first;
    else if (rightSecond.includes(roman))   return right_second;
    else if (rightThird.includes(roman))    return right_third;
    else if (rightFourth.includes(roman))   return right_fourth;
}

function getWeakKey() {
    let weakRanking = [];
    if (weakKeys.length === 0) {
        return 'なし';
    } else {
        var array = Object.keys(weakKeys).map((k) => ({key: k, value: weakKeys[k]}));
        array.sort((a, b) => b.value - a.value);
        //weakKeys = Object.assign({}, ...array.map((item) => ({[item.key]: item.value,})))
        for (let i=0; i<array.length, i<3; i++) {
            weakRanking[i] = array[i].key;
        }
        return weakRanking;
    }
}

// 終了処理
function finish() {
    clearInterval(countdown);
    subjectRoma.textContent = '';
    input.textContent = '';
    timer.textContent = '';
    keyboard.remove();
    finger.remove();
    subject.textContent = '正解数は' + count + '個でした！';
    missCount.textContent = 'ミスは' + miss + '回でした';
    weak.textContent = '苦手キー：' + getWeakKey();
}