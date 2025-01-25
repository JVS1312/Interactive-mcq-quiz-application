let first = document.querySelectorAll("input")[0];
let last = document.querySelectorAll("input")[1];
let email = document.querySelectorAll("input")[2];
let mobile = document.querySelectorAll("input")[3];
let createPass = document.querySelectorAll("input")[4];
let confirmPass = document.querySelectorAll("input")[5];
let form = document.querySelector("form");

//error span
let efirst = document.querySelectorAll("span")[0];
let elast = document.querySelectorAll("span")[1];
let eemail = document.querySelectorAll("span")[2];
let emobile = document.querySelectorAll("span")[3];
let ecreatePass = document.querySelectorAll("span")[4];
let econfirmPass = document.querySelectorAll("span")[5];
//storage
let data = [];
let dataFromLocalStorage = JSON.parse(localStorage.getItem("data"));
console.log(dataFromLocalStorage);
if (dataFromLocalStorage) {
  data = dataFromLocalStorage;
}
console.log(first, last, email, mobile, createPass, confirmPass, form);

form.addEventListener("submit", async (e) => {
  let flag = true;
  // in square bracket write what you want i.e what is allowed ...... in curly bracket write the min and max length you want
  let regx = /^[a-zA-Z]{2,15}$/;

  // first name
  if (first.value == "") {
    efirst.innerHTML = "first name required";
    e.preventDefault();
    flag = false;
  } else if (regx.test(first.value)) {
    efirst.innerHTML = "";
  } else {
    efirst.innerHTML = "only characters allowed min 2 max 15 allowed";
    e.preventDefault();
    flag = false;
  }

  // last name
  if (last.value == "") {
    elast.innerHTML = "last name required";
    e.preventDefault();
    flag = false;
  } else if (regx.test(last.value)) {
    elast.innerHTML = "";
  } else {
    elast.innerHTML = "only characters allowed min 2 max 15 allowed";
    e.preventDefault();
    flag = false;
  }

  // email
  if (email.value == "") {
    eemail.innerHTML = "email is required";
    e.preventDefault();
    flag = false;
  } else {
    eemail.innerHTML = "";
  }
  //email match avoid
  let emailMatch = data.some((e) => {
    if (e.mail == email.value) {
      return e;
    }
  });
  if (emailMatch) {
    eemail.innerHTML = "email already exist";
    e.preventDefault();
    flag = false;
  }

  //mobile

  let mobileRex = /^[6-9][0-9]{9}$/;
  if (mobile.value == "") {
    emobile.innerHTML = "mobile is required";
    e.preventDefault();
    flag = false;
  } else if (mobileRex.test(mobile.value)) {
    emobile.innerHTML = "";
  } else {
    emobile.innerHTML =
      "number should start from 6-9 totally 10 numbers allowed";
    e.preventDefault();
    flag = false;
  }
  //mobile match avoid
  let mobileMatch = data.some((e) => {
    if (e.mobileNum == mobile.value) {
      return e;
    }
  });
  if (mobileMatch) {
    emobile.innerHTML = "mobile number already exist";
    e.preventDefault();
    flag = false;
  }
  //password
  let passRex = /^[a-zA-Z0-9]{6,20}$/;
  if (createPass.value == "") {
    ecreatePass.innerHTML = "password is required";
    e.preventDefault();
    flag = false;
  } else if (passRex.test(createPass.value)) {
    ecreatePass.innerHTML = "";
  } else {
    ecreatePass.innerHTML =
      "password strength should be 6-20 and no special characters allowed";
    e.preventDefault();
    flag = false;
  }

  // confirm password
  if (confirmPass.value == "") {
    econfirmPass.innerHTML = "confirm password is required";
    e.preventDefault();
    flag = false;
  } else if (confirmPass.value == createPass.value) {
    econfirmPass.innerHTML = "";
  } else {
    econfirmPass.innerHTML = "password not matching";
    e.preventDefault();
    flag = false;
  }
  if (flag) {
    let obj = {
      firstName: first.value,
      lastName: last.value,
      mail: email.value,
      mobileNum: mobile.value,
      pass: createPass.value,
      quiz:null,
    };
    data.push(obj);
    localStorage.setItem("data", JSON.stringify(data));
    // let postdata= await fetch("endpoint",{
    //     method:"POST",
    //     headers:{"Content-Type":"application/json"},
    //     body:JSON.stringify(data),
    // });
    // let responseData=await.postData.json()
  }
});
