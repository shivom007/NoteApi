const express = require('express')
const authService = require('../services/authService');

const signup = async (req, res) => {
  
   try {
    const { username, password, email } = req.body;
    const result = await authService.signup(username, password, email);
    if (result.success) {
      res.status(201).json({ success: true, message: result.message });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  
    try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    if (result.success) {
      res.status(200).json({ success: true, token: result.token, message: result.message });
    } else {
      res.status(401).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { signup, login };
