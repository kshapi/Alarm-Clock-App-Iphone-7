const hr = document.getElementById('hr');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const digital = document.querySelector('.digital');
const setAlarm = document.getElementById('btn');
const box = document.querySelector('.check');
const delBtn = document.querySelector('.fa-trash');

let userHour;
let userMinutes;
let userPm;

//Fetching time from localStorage
window.addEventListener('load',()=> {
  //get time when page loaded
  const data = JSON.parse(localStorage.getItem('userTime')) || {
    hour : '00',
    min : '00',
    amPm : 'am'
  };
  
//check is time Out or not
  if (!data.done) {
    userHour = data.hour;
    userMinutes = data.min;
    userPm = data.amPm;
  };
  
  //Set time when page get loaded
  box.innerHTML = `
    <h4 class="endDate">${data.hour+':'+data.min + ' ' + data.amPm}</h4>
    <label class = "switch">
     <input type="checkbox" checked id="input">
     <span class="slider round"></span>
    </label>
    <i class="fa-solid fa-trash"></i>
    `;
    
});


const clock = () => {
  //New Date Object
  const date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let secends = date.getSeconds();
  let am;


  //Set Rotaion for hour minute And secends
  hr.style.transform = `rotate(${hour * 30 + minutes/12}deg)`;
  min.style.transform = `rotate(${minutes * 6}deg)`;
  sec.style.transform = `rotate(${secends * 6}deg)`;

  //Updating Time...
  hour = hour > 12 ? hour -= 12 : hour;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  secends = secends < 10 ? '0' + secends : secends;
  am = (hour > 12) ? 'PM' : 'AM';

  //Set Date...
  digital.innerText = `${hour}:${minutes}:${secends} ${am}`;
  userPm = am;
  
  
  const switchBtn = document.querySelector('.switch');
  //matching time 
  if (switchBtn.control.checked) {
    
    if (userHour == hour &&
      userMinutes == minutes &&
      userPm == am) {
    
      //play tune
      const tune = new Audio()
      tune.src = 'tone.mp3'
      tune.play()
    
      //remove User time
      userHour = '';
      userMinute = '';
      
    //reset localStorage
      const time = JSON.parse(localStorage.getItem('userTime'));
      time.done = true;
      localStorage.setItem('userTime', JSON.stringify(time))
      
    };
    
  };
  
  
};
clock();
setInterval(clock, 1000);



const validate = (e) => {
  let am =  'AM',
      pm = 'PM';
  
  //validating hour input
  if (e.target.id == 'hour') {
    
    if (e.target.value > 12 ) {
      e.target.style.border = '1px solid red';
      return;
    }else {
      e.target.style.border = null;
    };
    
  }
  //validating minute input
  else if(e.target.id == 'minute') {
    
    if (e.target.value > 59 ) {
      e.target.style.border = '1px solid red';
      return;
    } else {
      e.target.style.border = null;
    };
    
  }
  //validating Am Pm input
  else {
    
    if (e.target.value.toUpperCase() !== am && e.target.value.toUpperCase() !== pm) {
      e.target.style.border = '1px solid red';
      return;
    } else {
      e.target.style.border = null;
    };
    
  };
  
};

document.querySelectorAll('.input input').forEach(input => {
  input.addEventListener('input', validate);
});


//Inputs
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute')
const amPm = document.getElementById('amPm');


const sEt = () => {
  
  //user Values
  let hh = hourInput.value;
  let mm = minuteInput.value;
  let am = amPm.value.toUpperCase();
  
  //validate input value
  if (hh ==''){
    hourInput.style.border = '1px solid red';
  }
  if (mm == '') {
    minuteInput.style.border = '1px solid red';
  }
  if (am == '') {
    amPm.style.border = '1px solid red';
  }
  
  if (hh == '' || hh.length > 2 ||
      mm == '' || mm.length > 2 ||
      am == '' || am.length > 2 ) {
    return;
  }
  if (hh > 12 || mm > 59 ||
     (am !== 'AM' && am !== 'PM')) {
    return;
  }
  
  //Set time
  box.innerHTML = `
  <h4 class="endDate">${hh+':'+mm + ' ' + am}</h4>
  <label class = "switch">
   <input type="checkbox" checked id="input">
   <span class="slider round"></span>
  </label>
  <i class="fa-solid fa-trash"></i>`;
  
  //get userTime
  userHour = hh;
  userMinutes = mm;
  userPm = am;
  
  //Store In localStorage
  const save = {
    hour : hh,
    min : mm,
    amPm : am,
    done : false
  };
  
  //save usetTime in localStorage
  localStorage.setItem('userTime',JSON.stringify(save));
  
};

setAlarm.addEventListener('click', sEt);

//kshapii