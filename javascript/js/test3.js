let parentClicks = 0;
let childClicks = 0;

document
  .getElementById("parent")
  .addEventListener("click", function() {
  document
    .getElementById("parent-count")
    .innerText = (++parentClicks) + '';
});

document
  .getElementById("child")
  .addEventListener("click", function(e) {
  e.preventDefault();
  e.stopPropagation();
  
  document
    .getElementById("child-count")
    .innerText = (++childClicks) + '';
});