'use strict';

///хранилище (store)
let userNameArr = [];

// У нас есть сущность cards и нам надо проверить точно ана есть или нет и перезаписываем массив для перезаписи массива и  отрисовки актуальных данных на странице и в локал
document.addEventListener('DOMContentLoaded',()=>{
  let arrLocal =localStorage.getItem('cards')
  if(arrLocal){
    userNameArr = JSON.parse(arrLocal)
    CreateListPage(userNameArr)
  }
})

// controller
const btn = document.querySelector('.btn_add');
const container = document.querySelector('.container');
const modal = document.querySelector('.wrapper_modal');
const btnCloseModal = document.querySelector('.btn_cl');
const editUserName = document.querySelector('#editUserName');
const editFirstUserName = document.querySelector('#editFirstUserName');
const editDateUserName = document.querySelector('#editDateUserName');
const editEmailUserName = document.querySelector('#editEmailUserName');
const btnSendForm = document.querySelector('.btn_sendForm')
const buttonPoisk = document.getElementById('buttonpoisk');
const inputPoisk = document.querySelector('#poisk');
const radio = document.querySelectorAll('.radio-input');

inputPoisk.addEventListener('input', poisk)
function poisk(event) {
  if (event.target.value == "") {
    CreateListPage(userNameArr);
  }
}


buttonPoisk.addEventListener('click', poiskInfo);
btn.addEventListener('click', () => {


  addUserName();
  CreateListPage(userNameArr);
  const inputPoisk = document.getElementById('poisk');
  if (inputPoisk.value = '') {
    CreateListPage(userNameArr);
  }
});
container.addEventListener('click', (event) => {
  delElPagae(event);
  editPage(event);
});
btnCloseModal.addEventListener('click', closeModal);
btnSendForm.addEventListener('click', redirectlistPage)

btn.addEventListener('click', () => {
  // перебирает все элементы радио
  for (let i = 0; i < radio.length; i++) {
    // console.log(radio[i].checked); // просмотрим velue каждого элемента на каждой итерации если поставить вместо velue checked, то увидим значение выбранного в радио элемента.
    if (radio[i].checked) {
       console.log(radio[i].value);
    }
  }
});

//model
///добавляет данные в массив

function showRadio(arrRadio){
  let result = 'Не выбрано';
  arrRadio.forEach(item=>{
    if(item.checked){
      result = item.value;
      return result
    }
  })
  return result
}



function addUserName() {
  const lastName = document.querySelector('#lastName');
  const userName = document.querySelector('#userName');
  const dataName = document.querySelector('#dataName');
  const emailName = document.querySelector('#emailName');
  const radioArr = document.querySelectorAll('.radio-input');



  const obj = {
    lastName: lastName.value,
    userName: userName.value,
    dataName: dataName.value,
    emailName: emailName.value,
    radio: showRadio(radioArr),
    id: getRandomInt(10000),
  };


  userNameArr.push(obj);
  const arr = JSON.stringify(userNameArr)
  lastName.value = '';
  userName.value = '';
  dataName.value = '';
  emailName.value = '';
  
}
///перебирает массив и отрисовывает элементы на странице
function CreateListPage(arr) {
  if(arr.length>=0)
    localStorage.setItem('cards',JSON.stringify(arr))
  container.innerHTML = '';
  if (arr.length > 0) {
    arr.forEach((item) => {
      createTemplate(item);
    });
  } else {
    container.innerHTML = '<h3>Пользователей нет</h3>';
  }
}



//принимает на каждой итерации элемент массива и добавляет на страницу
function createTemplate({ lastName, userName, dataName, emailName, radio, id }) {
  const div = document.createElement('div');

  div.insertAdjacentHTML(
    'beforeend',
    `
    <li class="classLi">
  <spann class='spannEdit'>${userName} &nbsp;&nbsp; ${lastName}&nbsp;&nbsp;${dataName}&nbsp;&nbsp;${emailName}&nbsp;&nbsp;${radio}</spann> <button id='${id}' class='btnDel'>DEL</button>
  <button id='${id}' class='btnEdit'>Edit</button>
  </li>
  `
  );
  container.appendChild(div);
}
///делегирование событий   
function delElPagae(event) {
  if (event.target.classList.contains('btnDel')) {
    const { id } = event.target;
    userNameArr = clearArrUser(userNameArr, id);
    CreateListPage(userNameArr);
    
  }
}
//Свойство target возвращает элемент , в котором произошло событие .

function editPage(event) {
  if (event.target.classList.contains('btnEdit')) {
    modal.classList.remove('none');
    const { id } = event.target;
    sendValueToFormModal(id);
  }
}

function redirectlistPage(event) {
  const { id } = event.target;
  const redirectEditObj = filterObj(userNameArr, id);
  redirectEditObj.userName = editUserName.value;
  redirectEditObj.lastName = editFirstUserName.value;
  redirectEditObj.dataName = editDateUserName.value;
  redirectEditObj.emailName = editEmailUserName.value;
  CreateListPage(userNameArr)
  closeModal();
}


function sendValueToFormModal(id) {
  const editObj = filterObj(userNameArr, id);
  editUserName.value = editObj.userName;
  editFirstUserName.value = editObj.lastName;
  btnSendForm.id = editObj.id
  console.log(editObj.id);

}

function poiskInfo() {
  const inputPoisk = document.querySelector('#poisk');
  if (inputPoisk.value != '' && inputPoisk.value.length >= 2) {
    const newArr = userNameArr.filter(item => {
      if (item.userName.includes(inputPoisk.value)) {
        return true
      }
      return false
    });
    if (newArr.length > 0) {
      CreateListPage(newArr);
    }
  } else {
    CreateListPage(userNameArr);
  }
}




// function InputChange() {
//   if (inputPoisk.value <= 0) {
//     CreateListPage(userNameArr);
//   }
// }
// InputChange();

function clearArrUser(arr, id) {
  return arr.filter((item) => {
    if (item.id == id) {
      return false;
    }
    return true;
  });
}

function filterObj(arr, id) {
  let obj;
  arr.forEach((item) => {
    if (item.id == id) {
      obj = item;
    }
  });
  return obj;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function closeModal() {
  modal.classList.add('none');
}



