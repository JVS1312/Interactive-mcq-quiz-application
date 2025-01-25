let header = document.querySelector("header");
let main = document.querySelector("main");
let navDiv=document.querySelector("nav>div")
let dataFromLocalStorage = JSON.parse(localStorage.getItem("oneuser"));
console.log(dataFromLocalStorage,navDiv);
if (dataFromLocalStorage) {
  if (dataFromLocalStorage.quiz) {
    let score = 0;
    dataFromLocalStorage.quiz.forEach((e) => {
      let questions = document.createElement("h3");
      questions.innerHTML=e.question;
      let userAns=document.createElement("h2")
      userAns.innerHTML=`Your Answer : ${e.userAns}`
      let crtAns=document.createElement("h2")
      crtAns.innerHTML=`Correct Answer :${e.crtAns}`
      let div=document.createElement("div")
      div.append(questions,userAns,crtAns)
      main.append(div)
      if (e.userAns == e.crtAns) {
        div.className="correct"
        score++;
        // console.log(score);
      }else{
        div.className="wrong"
      }
    });
    let name = document.createElement("h2");
    name.innerHTML = `NAME : ${dataFromLocalStorage.firstName}`;

    let displayScore = document.createElement("h2");
    displayScore.innerHTML = `Score : ${score}/${dataFromLocalStorage.quiz.length} `;

    header.append(name, displayScore);
    let width=0;
    let scorePercentage=(score/dataFromLocalStorage.quiz.length)*100;

    let interval =setInterval(()=>{
        navDiv.style.width=`${width}%`;
        width++;
        if(width>=scorePercentage){
            navDiv.style.width=`${width}%`;
            clearInterval(interval);
        }
    },200);
  }
}
