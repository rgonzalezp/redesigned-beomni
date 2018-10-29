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
    	console.log("entro");
      Users.insert({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: cryptr.encrypt(password),
        avatar_url: avatar_url
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

  },'users.updateAvatar'({
    firstName,
    lastName,
    email
  }) {

    console.log(firstName);
    console.log( lastName);
    console.log(email);


    Users.update( {'email': email }, { $set: { firstName: firstName, lastName: lastName } });
    return true;
  },
  'users.findUser'({  
    email
  }) {

    const user = Users.findOne({
      email: email
    });
    return user;
  },
  'users.validateUser'({
    email,
    password
  }) {
    check(email, String);
    check(password, String);

    let user = null;

    user = Users.findOne({
      email: email
    });

    if (!user) {
      throw new Meteor.Error('There is no account associated with this email');
    } else {
      if (cryptr.decrypt(user.password) !== password) {
        throw new Meteor.Error('The password is incorrect, make sure you typed the correct information.');
      }
    }

    delete user.clave;

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
  return token ? jwt.verify(token, 'secretKeyAgain') : null;
}