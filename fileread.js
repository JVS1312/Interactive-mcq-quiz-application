let fs=require("fs");
console.log("hi");
// let text=fs.readFileSync("./demo.txt","utf-8");
// console.log(text);
// let html=fs.readFileSync("./login.html","utf-8");
// console.log(html);

let textAsync=fs.readFile("./demo.txt","utf-8",(e,data)=>{
    console.log(data);
});


console.log("bye");
fs.writeFileSync("./demo2.txt",`hi hello ${new Date()}`);
fs.writeFileSync("./demo3.txt",`file is autoo created ${new Date()}`)

