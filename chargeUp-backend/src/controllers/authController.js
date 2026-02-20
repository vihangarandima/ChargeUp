// backend/src/routes/authRoutes.js
// backend/src/controllers/authController.js
const User = require("../models/User"); // Import the Blueprint we just made

// This function handles the "Sign Up" logic
exports.registerUser = async (req, res) => {
  try {
    // 1. The Frontend sends us Name, Email, and Password
    const { name, email, password } = req.body;

    // 2. Check if this user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Create a new user using our Blueprint
    user = new User({
      name,
      email,
      password,
    });

    // 4. Save it to the database!
    await user.save();

    // 5. Tell the frontend "Success!"
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add this right below your register function!
const login = async (req, res) => {
  try {
    // 1. Grab the email and password the user typed in the app
    const { email, password } = req.body;

    // 2. Look inside MongoDB to see if this email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found! Please sign up." });
    }

    // 3. Check if the password matches
    // (Assuming you used bcrypt to encrypt the password during register)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password! Try again." });
    }

    // 4. Success! Tell the frontend to let them in.
    res.status(200).json({
      message: "Login successful!",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login." });
  }
};
module.exports = { register, login };
