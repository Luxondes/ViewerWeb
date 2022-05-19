const express = require('express');
const multer = require('multer');
const decompress = require("decompress");
const app = express();

// configuration de l'espace de travail de multer
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/test', (req, res) =>
{
  console.log("TEST");
  res.send({rep:"test", success:true});
});

// On traite les requetes POST vers l'URL upload_files,
app.post("/upload_files",
  upload.array("files"), // copie des fichiers par multer dans son répertoire de travail
  uploadFiles);

function uploadFiles(req, res)
{
  // Pour chaque fichier chargé on fait appel à la fonction de décompression
  req.files.forEach(file => unzip(file));
  res.json({success:true});
}

function unzip(file)
{
  console.log(file.path);
  // Décompression dans le répertoire unzip
  decompress(file.path, "unzip").then(files =>
  {
    console.log("unzip ok");
  })
}

app.listen(3000, () => console.log("Running ..."));


// Fonction décompression
//
// async function dcmp(up) {
//     try {
//         let files = await decompress(up, "public");
//         console.log(files);
//     } catch (error) {
//         console.log(error);
//     }
// };
