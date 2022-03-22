let fields = document.getElementsByClassName("form-letter__input");
const regPhone = /(^(\+\d\(\d{3}\)\d{2}\-\d{2}\-\d{3}))|(^$)/;
const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regField = /^[^\s*$]/;

const userData = {
    name: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
}

for (let i = 0; i < fields.length; i++){
    fields[i].addEventListener("change", changeHandler)
}

function changeHandler(){
    userData.name = fields[0].value;
    userData.lastName = fields[1].value;
    userData.email = fields[2].value;
    userData.phone = fields[3].value;
    userData.message = fields[4].value.trim();
    localStorage.setItem('userData', JSON.stringify(userData))
}

document.getElementsByClassName("form-letter__btn")[0].addEventListener("click", check)

function check() {
    if(getCookie("flag") === "inProcess"){
        alert(`${getCookie("name")}, your appeal is being processed!`);
        return;
    }
    let notValidFields = [];
    if(!validate(regField, fields[0].value)) notValidFields.push("First Name");
    if(!validate(regField, fields[1].value)) notValidFields.push("Last Name");
    if(!validate(regEmail, fields[2].value)) notValidFields.push("Email");
    if(!validate(regPhone, fields[3].value)) notValidFields.push("Phone");
    if(!validate(regField, fields[4].value.trim())) notValidFields.push("Message");
    if(notValidFields.length){
        alert(`Fields ${notValidFields} are filled in incorrectly, please correct`);
    } else {
        alert(`${fields[0].value} ${fields[1].value}, thanks for contacting!`);
        setCookie(fields[0].id, `${fields[0].value} ${fields[1].value}`);
        setCookie("flag", "inProcess")
        localStorage.clear();
    }
}

function validate(regexp, input){
    return regexp.test(input);
}

function checkStorage(){
    let userData = JSON.parse(localStorage.getItem("userData"));
    for(let i = 0; i < fields.length; i++){
        console.log(fields[i].id);
        for (let key in userData){
            if(fields[i].id === key)
                fields[i].value = userData[key];
        }
    }
}

function setCookie(name, value){
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

checkStorage();