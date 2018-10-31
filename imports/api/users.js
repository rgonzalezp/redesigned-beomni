import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';

const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKey');

export const Users = new Mongo.Collection('storageUsers');

if (Meteor.isServer) {
	//publish
	}
Meteor.methods({
  'users.addUser'({
    firstName,
    lastName,
    email,
    password,
    avatar_url
  }) {

    try {
      Users.insert({
        firstName,
        lastName,
        email,
        password: cryptr.encrypt(password),
        avatar_url
      });
      console.log("added user", email);
      return true;
    } catch (err) {
      if (err) {
        if (err.code === 11000) {
          throw new Meteor.Error("This user already exists");
        } else {
          throw new Meteor.Error("There was an unexpected error with the system, please try again later");
        }
      }
    }

  },'users.updateUser'({
    firstName,
    lastName,
    email,
    url
  }) {

    console.log(firstName);
    console.log( lastName);
    console.log(email);
    console.log(url)


    Users.update( {'email': email }, { $set: { 
      firstName,
      lastName,
      avatar_url:url
    } });
    return true;
  },
  'users.findUser'({  
    email
  }) {
    console.log(email);
    return Users.findOne({email});
  },
  'users.validateUser'({
    email,
    password
  }) {
    check(email, String);
    check(password, String);

    let user = null;

    user = Users.findOne({email});

    if (!user) {
      throw new Meteor.Error('There is no account associated with this email');
    } else {
      if (cryptr.decrypt(user.password) !== password) {
        throw new Meteor.Error('The password is incorrect, make sure you typed the correct information.');
      }
    }

    delete user.clave;
    //Wouldn't it be
    //delete user.password; ?

    let token = jwt.sign(user, 'secretKeyAgain');

    return token;
  },
  'users.decode'(token) {
    let user = decodeToken(token);
    if (user) {
      let nUser = Users.findOne({
        _id: user._id
      });

      if (nUser) {
        delete nUser.password;
        return nUser;
      } else {
        return null
      }
    } else {
      return null;
    }
  }
});

function decodeToken(token) {
  return token && jwt.verify(token, 'secretKeyAgain');
}