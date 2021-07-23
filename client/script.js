let department = document.querySelector('#department');
let fio = document.querySelector('#fio');
let storageType = document.querySelector('#storage-type');
let expirationDate = document.querySelector('#expiration-date');
let submitButton = document.querySelector('#userinfo-submit');
let infoContainer = document.querySelector('#info-container');


// ----------------------------ADD ROW FUNCTION-------------------------------------------------------
function addRow(i, department, fio, storageType, expirationDate, userId) {

  function createBlock(content, divClassName, i) {
    let name = document.createElement('div');
    name.textContent = `${content}`;
    name.className = `output-area ${divClassName} ${divClassName}-${i}`;
    return name;
  }

  function createDelBlock(divClassName, i) {
    let imgDel = new Image(14, 14);
    imgDel.src = 'src/img/del.png';
    imgDel.className = `output-area ${divClassName} ${divClassName}-${i}`;
    return imgDel;
  }

  let divDepartment = createBlock(department, 'divDepartment', i);
  let divFio = createBlock(fio, 'divFio', i);
  let divStorageType = createBlock(storageType, 'divStorageType', i);
  let divExparationDate = createBlock(expirationDate, 'divExparationDate', i);
  let divDelButton = createDelBlock('userinfo-delete', i);

  divOutpuBlock = document.createElement('div');
  divOutpuBlock.append(divDepartment, divFio, divStorageType, divExparationDate, divDelButton);
  divOutpuBlock.className = `output-block output-block-${i}`;

  infoContainer.prepend(divOutpuBlock);

  let delButton = document.querySelector(`.userinfo-delete-${i}`);
  delButton.addEventListener('click',

    async function () {

      // let sureDelete = confirm("Вы хотите удалить запись?");
      // if (sureDelete) {

      let response = await fetch(`http://localhost:80/person/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      }).then(() => {
        let delOutputBlock = document.querySelector(`.output-block-${i}`);
        infoContainer.removeChild(delOutputBlock);
        console.log(`${fio} : Deleted!`);
        //console.log(userId);
      });
      // }
    }
  );
};


let usersPool = [];
class User {
  constructor(dep, fam, storage, expDate) {
    this.department = dep;
    this.fio = fam;
    this.storageType = storage;
    this.expirationDate = expDate;
  }
}


// -----------------------SUBMIT-----------------------------------------
submitButton.addEventListener('click', async function () {
  
  if(true){
  
  let usersPoolLength = usersPool.length;
  console.log(department.value);
  usersPool.push(new User(department.value, fio.value, storageType.value, expirationDate.value));

  let response = await fetch('http://localhost:80/person', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(usersPool[usersPoolLength])
  });

  let result = await response.json();

 // console.log(result);

  let outputBlocksTmp = document.querySelectorAll('.output-block');
  addRow(outputBlocksTmp.length, department.value, fio.value, storageType.value, expirationDate.value, result._id);

 // console.log("Writed!");
  } else {alert('Вы ввели что-то неправильно!');}
});


//-----------------------PEOPLE LIST---------------------------------------
function peopleList() {
  fetch('http://localhost:80/people')
    .then((response) => {
      return response.json();
    })
    .then((data) => { // we getting massive of objects from our database in variable "data"

      for (let i = 0; i < data.length; i++) {
        //         infoContainer.insertAdjacentHTML('afterbegin', `<div class="output-block">
        // <div class="output-area">${data[i].department}</div>
        // <div class="output-area">${data[i].fio}</div>
        // <div class="output-area">${data[i].storageType}</div>
        // <div class="output-area">${data[i].expirationDate}</div>
        // <div class="output-area"><input type="button" value="Удалить" id="userinfo-delete-${i}"></div>
        // </div>`);
        addRow(i, data[i].department, data[i].fio, data[i].storageType, data[i].expirationDate, data[i]._id);
      };
    });
};

peopleList();