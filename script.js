

let department = document.querySelector('#department');
let fio = document.querySelector('#fio');
let storageType = document.querySelector('#storage-type');
let expirationDate = document.querySelector('#expiration-date');
let submitButton = document.querySelector('#userinfo-submit');
let infoContainer = document.querySelector('#info-container');
let outputArea = document.querySelectorAll('.output-area');

let usersPool = [];

class User{
    constructor (dep, fam, storage, expDate) {
        this.department = dep;
        this.fio = fam;
        this.storageType = storage;
        this.expirationDate = expDate;
    }
}

submitButton.addEventListener('click', function(){
    let ggg = usersPool.length; 
    console.log(ggg);
   usersPool.push(new User(department.value, fio.value, storageType.value, expirationDate.value));
   
   
//    let outputDiv = document.createElement('div');
//    outputDiv.className = "output-area";
//    outputDiv.textContent = 

infoContainer.insertAdjacentHTML('afterbegin', `<div class="output-block"><div class="output-area">${usersPool[ggg].department}</div>
<div class="output-area">${usersPool[ggg].fio}</div>
<div class="output-area">${usersPool[ggg].storageType}</div>
<div class="output-area">${usersPool[ggg].expirationDate}</div>
</div>`);
   
   
   // outputArea[0].textContent = usersPool[0].department;
    // outputArea[1].textContent = usersPool[0].fio;
    // outputArea[2].textContent = usersPool[0].storageType;
    // outputArea[3].textContent = usersPool[0].expirationDate;

});