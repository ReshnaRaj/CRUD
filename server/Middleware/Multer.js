const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("multer getting...")
//     cb(null, 'public/uploads');  
//   },
//   filename: function (req, file, cb) {
//     console.log("working..")
//     cb(null, `$Date.now() + '-' + file.originalname`); 
//   },
// });
// const upload = multer({ storage: storage });
//  module.exports={upload}
const FILE_TYPE_MAP = {
  'image/png':'png',
  'image/jpeg':'jpeg',
  'image/jpg':'jpg'
}
const storage = multer.diskStorage({
destination: function (req,file, cb) {
  const isValid = FILE_TYPE_MAP[file.mimetype]
  let uploadError = new Error('invalid image type')
  if(isValid){
    uploadError = null
  }else{
    return error='invalid file'
  }
  cb(uploadError, './public/uploads')
},
filename: function (req, file, cb) {
  console.log(file);
  const filename = file.originalname.split(' ').join('-')
  const extension = FILE_TYPE_MAP[file.mimetype]
  cb(null, `${filename.split('.')[0]}-${Date.now()}.${extension}`)
}
})
const uploadImage = multer({ storage:storage})
module.exports={uploadImage}



 
