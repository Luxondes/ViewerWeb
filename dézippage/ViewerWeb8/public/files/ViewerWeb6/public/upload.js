function init()
{
  console.log('init');
  const form = document.getElementById("form");
  form.addEventListener("submit", submitForm);
}

function submitForm(event)
{
  console.log("FILES SUBMITTED");
  event.preventDefault();
  // recuperation des fichiers sélectionnés par l'utilisateur
  const files = document.getElementById("files");
  // création d'un objet FormData qui va contenir les données
  const formData = new FormData();
  for(let i=0; i<files.files.length; i++)
  {
    formData.append("files", files.files[i]);
  }
  console.log(formData);
  // appel de l'URL upload_files
  fetch("./upload_files", {
    method:'POST',
    body: formData
  })
    .then((res) => console.log(res))        // retour côté client si tout se passe bien
    .catch((err) => ("Submit Error", err)); // retour d'erreur
}
