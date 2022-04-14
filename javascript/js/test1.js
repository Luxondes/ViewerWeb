let listeEl = document.querySelector("article > ul.important > li")

console.log(listeEl.nextElementSibling);

console.log("#main-content", document.getElementById("main-content"));

console.log(".important", document.getElementsByClassName("important"));

console.log("article", document.getElementsByTagName("article"));

const liItem = document.querySelector("article ul.important > li");
console.log("article ul.important > li", liItem);

console.log("nextElementSibling", liItem.nextElementSibling);