const fs = require('fs');
const path = require('path');

class FileUploadCtrl {
    UploadImage(req, res) {
        let sampleFile;
        let uploadPath;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.send({ status: false, message: 'No files were uploaded.' });
        }
        sampleFile = req.files.image;
        const file_name = getRandomInt(999999999) + sampleFile.name
        uploadPath = path.resolve(__dirname, file_name);

        var imageBuffer = sampleFile.data;

        fs.createWriteStream(uploadPath).write(imageBuffer, (err) => {
          if (err){
            console.log(err);
            return res.send({ status: false, message: err });
          }  
          res.send({ status: true, message: 'File uploaded!', file_name: file_name });
        });
    }

    ShowImage(req, res) {
        try {
            const filePath = path.resolve(__dirname, req.params.name);;
            var img = fs.readFileSync(filePath);
            res.writeHead(200, { 'Content-Type': minetype(req.params.name) });
            res.end(img, 'binary');
        } catch (e) {
            const filePath = __dirname + '/util/' + "no-camera.png";
            var img = fs.readFileSync(filePath);
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img, 'binary');
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function minetype(name){
  name = name.substring(name.length-3,name.length).toLowerCase();
  if(name=="gif"){
      return 'image/gif';
  } else if(name=="peg"){
      return 'image/jpeg';
  } else if(name=="png"){
      return 'image/png';
  } else if(name=="jpg"){
      return 'image/jpg';
  }
}

module.exports =  FileUploadCtrl;