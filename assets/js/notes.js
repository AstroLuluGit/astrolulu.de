function saveNotes() {
    const textField = document.getElementById("eddlNotes").value;
    localStorage.setItem('textField', textField);
};

const eddlNotes = document.getElementById("eddlNotes")
    
eddlNotes.addEventListener("keyup", () => {
saveTimer = setTimeout(callSave, 2500);
});
eddlNotes.addEventListener("keydown", () => {
    let saveTimer = null;
    clearTimeout(saveTimer);
});

function callSave() {
    saveNotes();
    clearTimeout(saveTimer);
}

function displayNotes() {
    const storedStuff = localStorage.getItem('textField');
    document.getElementById("eddlNotes").value = storedStuff;
};
displayNotes();