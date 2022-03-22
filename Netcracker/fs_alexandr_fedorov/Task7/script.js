let form = document.getElementsByTagName("form")[0];
let table = document.getElementsByTagName("table")[0];
let buttons = document.getElementsByTagName("button");
let rIndex = 0;
let priceField = form[3];
let addButton = buttons[0];
let editButton = buttons[1];
let deleteButton = buttons[2];
let secondClick = false;
const columnNum = 4;
const noRows = 1;

addButton.addEventListener("click", addNode);
editButton.addEventListener("click", editNode);
deleteButton.addEventListener("click", deleteNode);

function addNode(){
    validate();
    for(let i = 0; i < form.length; i++){
        if(form[i].classList.contains("invalid")) return;
    }
    let tr = document.createElement("tr"), td;
    for(let i = 0; i < columnNum; i++){
        td = document.createElement("td");
        td.innerHTML = form.elements[i].value;
        tr.appendChild(td);
    }
    table.appendChild(tr);
    for (let i = 0; i < columnNum; i++){
        form.elements[i].value = "";
    }
    selectedRowToInput();
}

function editNode(){
    validate();
    for(let i = 0; i < form.length; i++){
        if(form[i].classList.contains("invalid")) return;
    }
    for(let i = 0; i < columnNum; i++){
        table.rows[rIndex].cells[i].innerHTML = form.elements[i].value;
    }
}

function deleteNode(){
    if(table.rows.length === noRows) return;
    for(let i = 0; i < columnNum; i++){
        form.elements[i].value = "";
    }
    table.rows[rIndex].classList.remove("selected");
    table.deleteRow(rIndex);
    rIndex = 0;
    secondClick = false;
    disableButton(editButton);
    disableButton(deleteButton);
    enableButton(addButton);
}

function selectedRowToInput()
{
    for(let i = 1; i < table.rows.length; i++)
    {
        table.rows[i].onclick = function(){
            table.rows[rIndex].classList.remove("selected");
            if(secondClick){
                rIndex = 0;
                for (let i = 0; i < columnNum; i++) {
                    form.elements[i].value = "";
                }
                enableButton(addButton);
                disableButton(deleteButton);
                disableButton(editButton);
                secondClick = false;
            }
            else {
                rIndex = this.rowIndex;
                this.classList.add("selected");
                for (let i = 0; i < columnNum; i++) {
                    form.elements[i].value = this.cells[i].innerHTML;
                }
                disableButton(addButton);
                enableButton(deleteButton);
                enableButton(editButton);
                secondClick = true;
            }
        };
    }
}

function validate(){
    for (let i = 0; i < form.length; i++) {
        let field = form[i];
        if (!field.value) {
            field.classList.add("invalid");
            continue;
        }
        else {
            field.classList.remove("invalid");
        }
    }
}

function disableButton(button){
    button.disabled = true;
    button.classList.add("disabled")
}

function enableButton(button){
    button.disabled = false;
    button.classList.remove("disabled")
}

document.body.onload = () => {
    for(let i = 0; i < form.length; i++){
        form[i].onchange = enableButton(addButton);
    }
}


