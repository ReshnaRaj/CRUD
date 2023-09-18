const Useers = require("./Model/UserModel");
module.exports.adduser = async (req, res) => {
  try {
    console.log("adduser working....");
    // console.log(req.file,"files...")
    const { name, email, phone } = req.body;
    console.log(req.file,"files of images...")
    req.file.path = await req.file.path.replace("public", "");
    const image = req.file.path.replace(/\\/g, '/');
    // const image = req.file.path;
    console.log(image);

    // console.log(image,"image path")
    // console.log(req.body,"requestbbody")
    const user = new Useers({
      name: name,
      email: email,
      phone: phone,
      image: image,
    });

    const newUser = await user.save();

    res.status(200).json({
      newUser,
      message: "New User Added",
      created: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: { message: "Something went wrong while creating the user" },
      created: false,
    });
  }
};
module.exports.getAllUser = async (req, res) => {
  try {
    const users = await Useers.find({});
    console.log(users, "oooooo");
    res.status(200).json({ users, success: true });
  } catch (error) {
    console.log(error);
  }
};
module.exports.getuniquedata = async (req, res) => {
  try {
    let userId = req.params.id;
    let userdata = await Useers.findById(userId);
    res.status(200).json({ userdata, success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports.postedituser = async (req, res, next) => {
  try {
    console.log("posting editing...")
    const id = req.params.id;
    console.log(id,"resuedd")

    const { name, email, phone } = req.body;
    console.log(req.body,"teena")
    console.log(req.file,"ttthhh")
    req.file.path = await req.file.path.replace("public", "");
    const image = req.file.path.replace(/\\/g, '/');
    
    const user = await Useers.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }

    // const images = req.file.path;
    // Update the user data
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.image = image; 
 
    await user.save();

    res
      .status(200)
      .json({ message: "User updated successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    console.log("deeetttt");
    console.log(req.params.userId, "user id...");
    Useers.deleteOne({ _id: req.params.userId }).then((response) => {
      res.json({ message: "User deleted", status: true });
    });
  } catch (error) {
    res.json({ message: "error", status: false });
  }
};
