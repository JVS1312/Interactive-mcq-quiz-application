let user = document.querySelectorAll("input")[0];
let password = document.querySelectorAll("input")[1];
let form = document.querySelector("form");

let euser = document.querySelectorAll("span")[0];

let epass = document.querySelectorAll("span")[1];

let eform = document.querySelectorAll("span")[2];

let dataFromLocalStorage = JSON.parse(localStorage.getItem("data"));

console.log(user, form, euser, epass, eform, password, dataFromLocalStorage);

form.addEventListener("submit", (e) => {
  eform.innerHTML = "";
  euser.innerHTML = "";
  epass.innerHTML = "";

  let matching = dataFromLocalStorage.find((e) => {
    if (
      (e.mobileNum == user.value && e.pass == password.value) ||
      (e.mail == user.value && e.pass == password.value)
    ) {
      return true;
    }
  });

  if (user.value == "" && password.value == "") {
    euser.innerHTML = "mobile is required";
    epass.innerHTML = "password is required";
    e.preventDefault();
  } else if (user.value == "") {
    euser.innerHTML = "mobile is required";

    e.preventDefault();
  } else if (password.value == "") {
    epass.innerHTML = "password is required";
    e.preventDefault();
  } else if (matching) {
    alert("welcome to the page");
    localStorage.setItem("oneuser", JSON.stringify(matching));
  } else {
    eform.innerHTML = "user data invalid";
    e.preventDefault();
  }
});
