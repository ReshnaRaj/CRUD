const router = require("express").Router();
const {
  adduser,
  postedituser,
  deleteUser,
  getAllUser,
  getuniquedata,
} = require("../Usercontroller");
const { uploadImage } = require("../Middleware/Multer");

router.post("/adduser", uploadImage.single("image"), adduser);
router.get("/alluser", getAllUser);
router.delete("/deleteuser/:userId", deleteUser);
router.get('/getuniquedata/:id',getuniquedata)
router.post("/postedituser/:id", uploadImage.single("image"),postedituser);
module.exports = router;
