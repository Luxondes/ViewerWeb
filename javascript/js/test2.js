let p = document.createElement("p");

document.getElementById("main").appendChild(p);

p.innerHTML = "Mon <strong>grand</strong> contenu";
p.classList.add("important");
p.style.color = "green";