import de from '../languages/lang_de-DE.js';
import eng from '../languages/lang_en-US.js';


// All elements for language changing
const germanButton = document.getElementById('langDe');
const englishButton = document.getElementById('langEng')
const subjectSpan = document.getElementById('subjectSpan');
const todoSpan = document.getElementById('todoSpan');
const dateSpan = document.getElementById('dateSpan');
const addTodo = document.getElementById('addTodo');
const subjectTH = document.getElementById('subjectTH');
const todoTH = document.getElementById('todoTH');
const deadlineTH = document.getElementById('deadlineTH');

let lastLang = '';

germanButton.addEventListener('click', changeGerman);
englishButton.addEventListener('click', changeEnglish);

function changeGerman() {
    
    lastLang = 'de-DE';
    localStorage.setItem('lastLang', lastLang);
    translate();
}

function changeEnglish() {
    lastLang = 'en-US';
    localStorage.setItem('lastLang', lastLang);
    translate();
}

function translate() {
    lastLang = localStorage.getItem('lastLang');
    if(lastLang === 'de-DE') {
        germanButton.innerText = de.germanButton;
        englishButton.innerText = de.englishButton;
        subjectSpan.innerText = de.subjectSpan;
        todoSpan.innerText = de.todoSpan;
        dateSpan.innerText = de.dateSpan;
        subjectTH.innerText = de.subjectTH;
        todoTH.innerText = de.todoTH;
        deadlineTH.innerText = de.deadlineTH;
        addTodo.innerText = de.addTodo;
    }
    if (lastLang === 'en-US') {
        germanButton.innerText = eng.germanButton;
        englishButton.innerText = eng.englishButton;
        subjectSpan.innerText = eng.subjectSpan;
        todoSpan.innerText = eng.todoSpan;
        dateSpan.innerText = eng.dateSpan;
        subjectTH.innerText = eng.subjectTH;
        todoTH.innerText = eng.todoTH;
        deadlineTH.innerText = eng.deadlineTH;        
        addTodo.innerText = eng.addTodo;
    }
}

function revertLanguage() {
    translate();
}
revertLanguage();