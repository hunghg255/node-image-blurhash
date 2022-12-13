const express = require('express');
const fs = require('fs');
const { getPlaiceholder } = require('plaiceholder');
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
var cors = require('cors');

const app = express();
const port = 5001;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/blurhash', upload.single('file'), async (req, res) => {
  fs.writeFileSync(
    'public/copy_img.png',
    req.file.buffer,
    'base64',
    function (err) {
      console.log(err);
    }
  );

  const blurhash = await getPlaiceholder('/copy_img.png');
  res.json({ blurhash });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
