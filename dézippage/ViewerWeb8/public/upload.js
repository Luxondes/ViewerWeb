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
  // appel de l'URL upload_files
  fetch("./upload_files", {
    method:'POST',
    body: formData
  })
    .then((res) =>
    {
      return res.json();
    })
    .then(json =>
    {
      loadFiles(json.files);
    })        // retour côté client si tout se passe bien
    .catch((err) => ("Submit Error", err)); // retour d'erreur
}

function loadFiles(urls)
{
  const container = document.getElementById('container');
  console.log(container);
  urls.forEach(url =>
  {
    let element = document.createElement('div');
    switch(url.split('.').at(-1))
    {
      case 'jpg':
        let img = document.createElement('img');
        img.src = url;
        element.appendChild(img);
        break;
      case 'txt':
        let anchor = document.createElement('a');
        anchor.href = url;
        anchor.innerHTML = url;
        element.appendChild(anchor);
        break;
      default:
        break;
    }
    container.appendChild(element);
  });
}
