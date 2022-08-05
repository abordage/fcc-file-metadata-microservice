require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const fs = require('fs');
const path = require('path');

const uploadDirectory = 'uploads/';
const upload = multer({ dest: uploadDirectory })

app.use(cors({ optionsSuccessStatus: 200 }))
app.use(express.static('public'))
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  res.json({ name: req.file.originalname, type: req.file.mimetype, size: req.file.size })

  fs.readdir(uploadDirectory, (err, files) => {
    if (err) {
      throw err;
    }

    for (const file of files) {
      fs.unlink(path.join(uploadDirectory, file), err => {
        if (err) {
          throw err;
        }
      });
    }
  });

})

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})