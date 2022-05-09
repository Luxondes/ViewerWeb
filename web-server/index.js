const express = require("express");
const app = express();
const cors = require('cors');

const decompress = require("decompress");
let files;
(async () => {
    try {
        files = await decompress("public/coub.zip", "public/img");
        console.log(files);
    } catch (error) {
        console.log(error);
    }
})();


app.use(cors());

app.get('/', function(req, res, next) {
    res.json({
      zip: files
    });
    next();
  });

app.use(express.static('public'));

app.listen(3000, () => console.log("server listening on port 3000"));