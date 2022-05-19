const express = require('express');
const multer = require('multer');
const decompress = require("decompress");
const app = express();

app.use(express.static('public'));

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