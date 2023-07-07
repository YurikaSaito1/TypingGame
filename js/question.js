const subject = document.getElementById('subject'); // 問題文
const input = document.getElementById('input'); // 入力エリア
//const form = document.getElementById('form'); // 入力フォーム
const timer = document.getElementById('timer'); // タイマー
const textList = [
    'apple',
    'banana',
    'orange',
    'green apple',
    'strawberry'
];
let textSplit;

let count = 0; // 正解数
let TIME = 20; // 制限時間
let state = true; // キー入力有効
let textNum = 0; // 何文字目の入力か

// 開始処理
function init() {
    const rnd = Math.floor(Math.random() * textList.length);

    subject.textContent = textList[rnd];
    textSplit = subject.textContent.split(''); // 問題文を１文字ずつ格納
    textNum = 0;

    input.textContent = '';

    /*form.input.value = '';
    form.input.focus();*/
}

// ゲーム開始
init();

// 送信ボタンが押されたとき
/*form.btn.addEventListener('click', function(e) {
    if(!state) return; // ゲーム終了後は送信できなくする
    
    if(form.input.value === subject.textContent) {
        count++;
        init();
    } else {
        subject.textContent = '間違いです！';
        setTimeout(function(){ init() },1000)
    }
})*/

// キーが押されたとき
window.addEventListener('keydown', (event) => {
    let key = event.key;

    if(!state) return;

    if (key == textSplit[textNum]) {
        input.textContent += key;
        console.log('ok');
        textNum++;
    } else {
        console.log('NG');
    }
    if (textNum >= textSplit.length) {
        count++;
        setTimeout(function(){ init() },100)
    }
})

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