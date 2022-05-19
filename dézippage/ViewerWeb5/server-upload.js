const express = require('express');
const multer = require('multer');
const decompress = require("decompress");

const app = express();

async function dcmp () {
    try {
        let files = await decompress("uploads/spatz.zip", "public/data");
        console.log(files);
    } catch (error) {
        console.log(error);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, "spatz.zip");
    }
})
const upload = multer({ storage });

app.use(express.static('public'));

app.post('/', upload.array('avatar'), (req, res) => {
    dcmp();
    return res.json();
});

app.listen(3000, () => console.log("Running ..."));