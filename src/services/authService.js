const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (username, password, email) => {
  try {
    const existUser = await User.findOne({ email });
    if(existUser){
        return { success: false, message: 'Email already exists!' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email});
    await newUser.save();
    return { success: true, message: 'User registered successfully.' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, message: 'Invalid username or password.' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, message: 'Invalid username or password.' };
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { success: true, token, message: "User LoggedIn Successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = { signup, login };
