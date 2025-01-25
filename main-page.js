let quesCont = document.querySelector("#que");
let optionCont = document.querySelector("#opt");
let btnCont = document.querySelector("#btn");
let footer = document.querySelector("footer");
let previousBtn = footer.querySelectorAll("button")[0];
let nextBtn = footer.querySelectorAll("button")[1];
let submitBtn = footer.querySelectorAll("button")[2];
let visited = document.querySelector("#visit");
let notVisited = document.querySelector("#nvisit");
let answered = document.querySelector("#answered");
let notAnswered = document.querySelector("#nanswered");

//localStorage
let data = JSON.parse(localStorage.getItem("data"));
let oneuser = JSON.parse(localStorage.getItem("oneuser"));
function local(){
 
  console.log(data,oneuser);
  if(oneuser){
    if(!oneuser.quiz){
      main();
    }else{
      alert("test completed")
      window.location.href="./result.htm"
    }
    
  }else{
    alert("login first");
    window.location.href="./login.html";
  }
}
local();


console.log(
  quesCont,
  optionCont,
  btnCont,
  footer,
  previousBtn,
  nextBtn,
  submitBtn
);
console.log(visited, notAnswered, notVisited, answered);
async function main() {
  let datafromjson = await fetch("./question.json");
  let storage = await datafromjson.json();
  console.log(storage);
  let index = 0;

  //   create question button
  function btncreate() {
    storage.map((e) => {
      let btn = document.createElement("button");
      btn.id = e.id;
      btn.innerHTML = e.id;
      btnCont.append(btn);
    });
  }
  btncreate();
  let allBtn = btnCont.querySelectorAll("button");
  /* Creating Question and option */

  function queNdOpt() {
    quesCont.innerHTML = storage[index].question;
    storage[index].visited = true;
    optionCont.innerHTML = "";
    storage[index].option.map((e) => {
      let opt = document.createElement("input");
      let label = document.createElement("label");
      opt.type = "radio";
      opt.name = "options";
      opt.value = e;
      if (opt.value == storage[index].userAns) {
        opt.checked = true;
      }
      label.innerHTML = e;
      let div = document.createElement("div");
      div.append(opt, label);
      optionCont.append(div);
    });
    legends();
  }
  queNdOpt();
  nextBtn.addEventListener("click", () => {
    notSaved();

    saveAns();
    index = (index + 1) % storage.length;
    queNdOpt();
  });
  previousBtn.addEventListener("click", () => {
    notSaved();
    saveAns();
    index = (index - 1 + storage.length) % storage.length;
    queNdOpt();
  });
  //particular butn
  allBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      notSaved();
      saveAns();
      index = btn.id - 1;
      queNdOpt();
    });
  });
  function saveAns() {
    let options = optionCont.querySelectorAll("input");
    options.forEach((Opt) => {
      if (Opt.checked) {
        storage[index].userAns = Opt.value;
        allBtn.forEach((e) => {
          if (index == e.id - 1) {
            e.style.backgroundColor = "green";
          }
        });
      }
    });

    console.log(storage[index]);
  }
  function notSaved() {
    allBtn.forEach((e) => {
      if (index == e.id - 1) {
        e.style.backgroundColor = "purple";
      }
    });
  }
  function legends() {
    let visitedCount = 0;
    let notVisitedCount = storage.length;
    let answeredCount = 0;
    let notAnsweredCount = storage.length;
    storage.map((e) => {
      if (e.visited) {
        visitedCount++;
        notVisitedCount--;
      }
      if (e.userAns) {
        answeredCount++;
        notAnsweredCount--;
      }
    });

    visited.innerHTML = visitedCount;
    notVisited.innerHTML = notVisitedCount;
    answered.innerHTML = answeredCount;
    notAnswered.innerHTML = notAnsweredCount;
  }
  function timer() {
    let time = 10 * 60;
    let hr = document.querySelector("#hr");
    let min = document.querySelector("#min");
    let sec = document.querySelector("#sec");
    let interval = setInterval(() => {
      time--;
      hr.innerHTML = `${Math.floor(time / 3600)}`;
      min.innerHTML = `${Math.floor((time % 3600) / 60)}`;
      sec.innerHTML = `${Math.floor(time % 60)}`;

      if (time == 0) {
        clearInterval(interval);
        oneuser.quiz=storage;
        
        localStorage.setItem("oneuser",JSON.stringify(oneuser))
        window.location.href="./result.htm"
      }
    }, 1000);
  }
  timer();
  //submit
  submitBtn.addEventListener("click",()=>{
    let confirmation=confirm("R u Sure You Want To Submit!!!!!");
    if(confirmation){
      oneuser.quiz=storage;
      localStorage.setItem("oneuser",JSON.stringify(oneuser))
      window.location.href="./result.htm"
      console.log(oneuser);
    }
  })
}

