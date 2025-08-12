const express = require("express");
const router = express.Router();
const {registerUser, loginUser, getUserProfile, updateUserProfile} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile-update", protect, updateUserProfile);

router.post("/upload-image",upload.single("image"), async (req, res) => {
    if(!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl, message: "Image uploaded successfully" });

})
module.exports = router;
