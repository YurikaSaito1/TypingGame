const subject = document.getElementById('subject');
const form = document.getElementById('form');
const timer = document.getElementById('timer');
const textList = [
    'apple',
    'banana',
    'orange',
    'green apple',
    'strawberry'
];

let count = 0;
let TIME = 20;
let state = true;

function init() {
    const rnd = Math.floor(Math.random() * textList.length);

    subject.textContent = textList[rnd];
    form.input.value = '';
    form.input.focus();
}

init();

form.btn.addEventListener('click', function(e) {
    if(!state) return;
    
    if(form.input.value === subject.textContent) {
        count++;
        init();
    } else {
        subject.textContent = '間違いです！';
        setTimeout(function(){ init() },1000)
    }
})

const countdown = setInterval(function() {
    timer.textContent = '制限時間：' + --TIME + '秒';
    if(TIME <= 0) finish();
}, 1000);

function finish() {
    clearInterval(countdown);
    subject.textContent = '正解数は' + count + '個でした！';

    state = false;
}