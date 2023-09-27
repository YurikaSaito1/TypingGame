const body = document.body;
const subject = document.getElementById('subject'); // 問題文
const hiraSubject = document.getElementById('hiraSubject');
const subjectRoma = document.getElementById('subjectRoma');
const input = document.getElementById('input'); // 入力エリア
const timer = document.getElementById('timer'); // タイマー
const missCount = document.getElementById('missCount'); // ミスの回数
const keyboard = document.getElementById('keyboard');
const shift = document.getElementById('key_shift');
const ctrl = document.getElementById('key_ctrl');
const alt = document.getElementById('key_alt');
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
const second = document.getElementById('second');
const weak = document.getElementById('weak');
const number = document.getElementById('number');
const accuracyRate = document.getElementById('accuracyRate');
const wpm = document.getElementById('wpm');
//const level = document.getElementById('level');
const photo = document.getElementById('photo');
const retryButton = document.getElementById('retry');
const levelTableArea = document.getElementById('levelTableArea');

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
    'ー' : ['-'], '、' : [','], '。' : ['.'], ';' : [';'], ':' : [':'],
    '(' : ['('], ')' : [')'], '{' : ['{'], '}' : ['}'], '[' : ['['], ']' : [']']
};

const leftFourth = ['1', 'a', 'q', 'z'];
const leftThird = ['2', 'w', 's', 'x'];
const leftSecond = ['3', 'e', 'd', 'c'];
const leftFirst = ['4', '5', 'r', 't', 'f', 'g', 'v', 'b'];
const thumb = [' '];
const rightFirst = ['6', '7', 'y', 'u', 'h', 'j', 'n', 'm'];
const rightSecond = ['8', 'i', 'k', ',', '('];
const rightThird = ['9', 'o', 'l', '.', ')'];
const rightFourth = ['0', '-', 'p', '[', ';', ':', ']', '{', '}'];

const shiftArray = ['(', ')', '{', '}']

const textList = [
    //['コントロールゼット', 'Ctrl + z'],
    //['コントロールシー', 'Ctrl + c'],
    //['コントロールブイ', 'Ctrl + v'],
    //['オルトティー', 'Alt + t'],
    /*['ヴォイド', 'void'],
    ['セットアップ', 'setup'],
    ['ループ', 'loop'],
    ['デジタルライト', 'digitalWrite'],
    ['ディレイ', 'delay'],
    ['カンマ', ','],
    ['セミコロン', ';'],
    ['コロン', ':'],
    ['小カッコ', '()'],
    ['中カッコ', '{}'],
    ['角カッコ', '[]'],
    ['二井見先生', 'にいみせんせい'],
    ['畠中さん', 'はたなかさん']*/
    ['アーク', 'arc'],
    ['ライン', 'line'],
    ['ブレーク', 'break'],
    ['ランダム', 'random'],
    ['イント', 'int'],
    ['フレームレート', 'frameRate'],
    ['フォー', 'for'],
    ['ストローク', 'stroke'],
    ['ストロークウェイト', 'strokeWeight'],
    ['レクトモード', 'rectMode'],
    ['センター', 'CENTER'],
    ['マウスプレッスド', 'mousePressed'],
    ['プリントライン', 'println'],
    ['フレームカウント', 'frameCount'],
    ['イフ', 'if'],
    ['小カッコ', '()'],
    ['中カッコ', '{}'],
    ['コロン', ':'],
    ['セミコロン', ';'],
    ['ピリオド', '.'],
    ['カンマ', ',']
];

let array = [];
let k = 0;

let romanArray = []; // 問題文一文字分を格納
let text = ''; // 問題文を格納
let hiraText = ''

let readyCountdown; // 開始時カウントダウン
let countdown; // 解答時カウントダウン
let count = 0; // 正解数
let miss = 0; // ミスの回数
let READYTIME = 4; // 開始までの秒数＋１
const TIME = 20; // 制限時間
let time = 0;
let state = true; // キー入力有効
let readyFlag = true; // 開始したかどうかの判定
let shiftFlag = false;
let ctrlFlag = false; // ctrlが必要かどうか
let altFlag = false;
let weakKeys = new Object();
let num = 0; // 文字数
let levelTable;

// 開始処理
function ready() {
    clearInterval(readyCountdown);

    for (let i=0; i<textList.length; i++) {
        array[i] = i;
    }
    let a = array.length;
    while(a) {
        let j = Math.floor(Math.random()*a);
        let t = array[--a];
        array[a] = array[j];
        array[j] = t;
    }
    
    countdown = setInterval(function() {
        timer.textContent = '経過時間：' + ++time + '秒';
    }, 1000);

    init();
}

// 問題の更新
function init() {
    if (k == textList.length) {
        finish();
    } else {
        hiraSubject.textContent = textList[array[k]][0]; // 問題文を設定
        subject.textContent = textList[array[k]][1];
        // 問題文のローマ字表示
        text = subject.textContent; // 問題文を格納
        text = kataToHira(text); // カタカナをひらがなに変換
        subjectRoma.textContent = '';
        // 全てのローマ字を表示
        for (let i=0; i=text.length; i++) {
            determine();
            if (ctrlFlag) {
                subjectRoma.textContent += 'Ctrl + ';
            } else if (altFlag) {
                subjectRoma.textContent += 'Alt + ';
            }
            subjectRoma.textContent += romanArray[0];
        }

        // 最初の文字のローマ字をセット
        text = subject.textContent; // 問題文を格納
        text = kataToHira(text);
        setChar();

        input.textContent = ''; // 入力欄をクリア

        state = true; // 入力を可能にする
    }
    k++;
}

// キーが押されたとき
window.addEventListener('keydown', (event) => {
    let key = event.key;

    if(!state) return;  // ゲーム終了後は操作できなくする

    let charFlag = []; // 入力された文字と同じかどうかの判定
    let inputFlag = false; // 表示したかどうかの判定
    let nextFlag = false; // 一文字分打ち終わったかの判定

    // charFlagの初期化
    for (let i=0; i<romanArray.length; i++) {
        charFlag[i] = false;
    }

    if (event.ctrlKey && ctrlFlag) {
        if (event.code == "Key" + romanArray[0].slice(0, 1).toUpperCase()) {
            if (!inputFlag) {
                input.textContent += "Ctrl + " + romanArray[0].slice(0, 1); // ディスプレイに表示
                inputFlag = true;
                num++;
            }

            charFlag[0] = true;

            var elem = keyMatch(romanArray[0].slice(0, 1));
            elem.style.backgroundColor = "white";
            shift.style.backgroundColor = "white";
            ctrl.style.backgroundColor = "white";
            alt.style.backgroundColor = "white";
            clearFinger(romanArray[0].slice(0, 1));

            // 一文字削る
            romanArray[0] = romanArray[0].slice(1);
            
            // かな一文字分入力し終わった時
            if (romanArray[0].length == 0) {
                setChar();
                nextFlag = 1;
            }
            ctrlFlag = false;
        }
    } else if (event.altKey && altFlag) {
        if (event.code == "Key" + romanArray[0].slice(0, 1).toUpperCase()) {
            if (!inputFlag) {
                input.textContent += "Alt + "; // ディスプレイに表示
                inputFlag = true;
                num++;
            }

            charFlag[0] = true;

            var elem = keyMatch(romanArray[0].slice(0, 1));
            elem.style.backgroundColor = "white";
            shift.style.backgroundColor = "white";
            ctrl.style.backgroundColor = "white";
            alt.style.backgroundColor = "white";
            clearFinger(romanArray[0].slice(0, 1));

            // 一文字削る
            romanArray[0] = romanArray[0].slice(1);
            
            // かな一文字分入力し終わった時
            if (romanArray[0].length == 0) {
                setChar();
                nextFlag = 1;
            }
            altFlag = false;
        }
    } else {
        for (let i=0; i<romanArray.length; i++) {
            // 入力キーが正しい時
            if (key == romanArray[i].slice(0, 1) && !ctrlFlag) {
                if (!inputFlag) {
                    input.textContent += romanArray[i].slice(0, 1); // ディスプレイに表示
                    inputFlag = true;
                    num++;
                }

                charFlag[i] = true;

                var elem = keyMatch(romanArray[0].slice(0, 1));
                elem.style.backgroundColor = "white";
                shift.style.backgroundColor = "white";
                ctrl.style.backgroundColor = "white";
                alt.style.backgroundColor = "white";
                clearFinger(romanArray[0].slice(0, 1));

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
    }

    // ミスした時
    if (!inputFlag && !readyFlag && key != 'Control' && key != 'Shift' && key != 'Alt') {
        body.style.backgroundColor = "lightpink";
        window.setTimeout(function(){
            body.style.backgroundColor = "white";
        }, 100);

        miss++;

        if (key in weakKeys) {
            weakKeys[romanArray[0].slice(0, 1)] += 1;
        } else {
            weakKeys[romanArray[0].slice(0, 1)] = 1;
        }

        keyboardColorChange();

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
        keyboardColorChange();

        setFinger(romanArray[0].slice(0, 1));
    }

    // スペースキーで開始
    if (key == " " && readyFlag == true) {
        readyFlag = false;
        readyCountdown = setInterval(function() {
            subject.textContent = --READYTIME;
            if(READYTIME == 1) {
                setTimeout(function(){ ready()}, 1000);
            }
        }, 1000);
    }
}, {passive: false});

// 判定するかな一文字の設定
function setChar() {
    // 文章を入力し終えたら次の問題へ
    if (text.length == 0) {
        count++;
        setTimeout(function(){ init() }, 100);
    } else {
        determine();

        keyboardColorChange();

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
    } else if (text.slice(0, 1).match(/^[ぁ-んー　]*$/)){
        let oneChar = text.slice(0, 1); // かな一文字目を取り出す
        romanArray = romanMapArray[oneChar];
        text = text.slice(1); // 一文字削る
    } else if (text.slice(0, 4).match(/Ctrl/)) {
        ctrlFlag = true;
        romanArray[0] = text.slice(7, 8);
        text = text.slice(8);
    } else if (text.slice(0, 3).match(/Alt/)) {
        altFlag = true;
        romanArray[0] = text.slice(6, 7);
        text = text.slice(7);
    } else {
        romanArray[0] = text.slice(0, 1);
        text = text.slice(1);
    }
}

function setFinger(roman) {
    let finger = checkFinger(roman);
    if (finger == 'thumb') {
        left_thumb.style.backgroundColor = "#ffd280";
        right_thumb.style.backgroundColor = "#ffd280";
    } else {
        finger.style.backgroundColor = "#ffd280";
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
    if (leftFourth.includes(roman.toLowerCase()))         return left_fourth;
    else if (leftThird.includes(roman.toLowerCase()))     return left_third;
    else if (leftSecond.includes(roman.toLowerCase()))    return left_second;
    else if (leftFirst.includes(roman.toLowerCase()))     return left_first;
    else if (thumb.includes(roman.toLowerCase()))         return 'thumb';
    else if (rightFirst.includes(roman.toLowerCase()))    return right_first;
    else if (rightSecond.includes(roman.toLowerCase()))   return right_second;
    else if (rightThird.includes(roman.toLowerCase()))    return right_third;
    else if (rightFourth.includes(roman.toLowerCase()))   return right_fourth;
}

function keyMatch(key) {
    switch (key) {
        case '(':
            return document.getElementById("key_8");
        case ')':
            return document.getElementById("key_9");
        case '{':
            return document.getElementById("key_[");
        case '}':
            return document.getElementById("key_]");
        default:
            return document.getElementById("key_" + romanArray[0].slice(0, 1).toLowerCase());
    }
}

function shiftMatch(key) {
    if (shiftArray.includes(key) || key.match(/^[A-Z]+$/)) {
        shiftFlag = true;
        return true;
    } else {
        shiftFlag = false;
        return false;
    }
}

function keyboardColorChange() {
    var elem = keyMatch(romanArray[0].slice(0, 1));
    elem.style.backgroundColor = "#ffd280";
    var shiftFlag = shiftMatch(romanArray[0].slice(0, 1));
    if (shiftFlag) {
        shift.style.backgroundColor = "#ffd280";
    } else if (ctrlFlag) {
        ctrl.style.backgroundColor = "#ffd280";
    } else if (altFlag) {
        alt.style.backgroundColor = "#ffd280";
    }
}

function getWeakKey() {
    let weakRanking = [];
    if (Object.keys(weakKeys).length === 0) {
        return 'なし';
    } else {
        var array = Object.keys(weakKeys).map((k) => ({key: k, value: weakKeys[k]}));
        array.sort((a, b) => b.value - a.value);
        //weakKeys = Object.assign({}, ...array.map((item) => ({[item.key]: item.value,})))
        for (let i=0; i<array.length; i++) {
            weakRanking[i] = array[i].key;
            if (i >= 2) break;
        }
        return weakRanking;
    }
}

function getAccuracyRate() {
    if (num === 0) {
        return 0;
    } else {
        let accuracy = Math.round(num / (num + miss) * 1000) / 10;
        return accuracy;
    }
}

function getWpm() {
    let ans = Math.round(count / time * 60 * 10) / 10;
    return ans;
}

/*function getLevel() {
    let ans = '';
    switch (true) {
        case time <= 12:
            return 'A+';
        case 12 < time && time <= 16:
            return 'A';
        case 16 < time && time <= 20:
            return 'A-';
        case 20 < time && time <= 24:
            return 'B+';
        case 24 < time && time <= 28:
            return 'B';
        case 28 < time && time <= 32:
            return 'B-';
        case 32 < time && time <= 36:
            return 'C+';
        case 36 < time && time <= 40:
            return 'C';
        case 40 < time && time <= 44:
            return 'C-';
        case 44 < time && time <= 48:
            return 'D+';
        case 48 < time && time <= 52:
            return 'D';
        case 52 < time && time <= 56:
            return 'D-';
        case 56 < time && time <= 60:
            return 'E+';
        case 60 < time && time <= 64:
            return 'E';
        case 64 < time:
            return 'E-';
    }
}*/

function getLevel() {
    switch(true) {
        case time <= 20:
            return 'A';
        case 20 < time && time <= 30:
            return 'B';
        case 30 < time && time <= 40:
            return 'C';
        case 40 < time && time <= 50:
            return 'D';
        case 50 < time && time <= 60:
            return 'E';
        case 60 < time:
            return 'F';
    }
}

// 終了処理
function finish() {
    clearInterval(countdown);
    subjectRoma.textContent = '';
    hiraSubject.textContent = '';
    input.textContent = '';
    timer.textContent = '';
    keyboard.style.display = "none";
    finger.style.display = "none";
    subject.textContent = '今回のタイピング結果';
    second.textContent = 'クリア秒数：' + time + '秒';
    missCount.textContent = 'ミス：' + miss + '回';
    weak.textContent = '苦手キー：' + getWeakKey();
    number.textContent = '入力文字数：' + num;
    accuracyRate.textContent = '正確率：' + getAccuracyRate() + '％';
    wpm.textContent = 'WPM：' + getWpm();
    //level.textContent = 'レベル：' + getLevel();

    const rnd = Math.floor(Math.random() * 39);
    photo.src = "img/" + rnd + ".jpg";

    retryButton.style.display = "block";

    levelTableArea.style.display = "block";
    levelTable = document.getElementById('level_' + getLevel());
    levelTable.style.backgroundColor = 'orange';
    state = false;
}

function retry() {
    keyboard.style.display = "block";
    finger.style.display = "block";
    subject.textContent = '';
    second.textContent = '';
    missCount.textContent = '';
    weak.textContent = '';
    number.textContent = '';
    accuracyRate.textContent = '';
    wpm.textContent = '';
    level.textContent = '';
    photo.src = '';
    subject.textContent = 'スペースキーを押して下さい';
    READYTIME = 4;
    k = 0;
    array = [];
    count = 0;
    miss = 0;
    time = 0;
    weakKeys = new Object();
    num = 0;
    retryButton.style.display = "none";
    levelTable.style.backgroundColor = 'white';
    levelTableArea.style.display = "none";
    readyFlag = true;
    state = true;
}