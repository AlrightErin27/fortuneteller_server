//Require Packages//
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthLockedRoute = require("./api-v1/AuthLockedRoute");

//GET "/users" --test endpoint

//POST "/users/register" --create a new user

//POST "/users/login" --validate credentials

//GET "/auth-locked" --redirect if a bad token is found

module.exports = router;
