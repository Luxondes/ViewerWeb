let dropArea = document.getElementById("drop-area");
let menu = document.getElementById ("menu");
let hiddenMenu = false;





;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);   
  document.body.addEventListener(eventName, preventDefaults, false);
})

;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
})

dropArea.addEventListener('drop', handleDrop, false);

menu.addEventListener('click', hidden);

function hidden(){
  if (!hiddenMenu){
    dropArea.classList.add('hidden');
    hiddenMenu = true;
    console.log('hidden');
  }else{
    dropArea.classList.remove('hidden');
    hiddenMenu = false;
    console.log('not hidden anymore');
  }
}

function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  dropArea.classList.add('highlight');
}

function unhighlight(e) {
  dropArea.classList.remove('highlight');
}

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
}





function handleFiles(files) {
  files = [...files];
  files.forEach(uploadFile);
  files.forEach(previewFile);
}

function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let img = document.createElement('img');
    img.src = reader.result;
    img.setAttribute('id','img');

    const glr = document.getElementById('gallery');
    if (glr.firstElementChild) glr.removeChild(glr.firstElementChild);
    
    document.getElementById('gallery').appendChild(img);
    console.log(img.src);
  }
}

function uploadFile(file, i) {
    let formData = new FormData();
    formData.append('file', file);
  }