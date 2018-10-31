import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Objects = new Mongo.Collection('objects');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('objects', function objectsPublication() {
    return Objects.find({

      $or: [

        { private: { $ne: true } },

        { owner: this.userId },

      ],

    });
  });

  Meteor.publish('object', function objectPublication(owner) {
    console.log('Entro a publish task',owner);
    return Objects.find({ owner });
  });

}

Meteor.methods({

  //fix methods to work with objects.
  'objects.insert'({
    price,
    email,
    imageurl,
    title,
    description,
    alttext
  }) {
    // Make sure the user is logged in before inserting an object
   if(!Meteor.user()) return new Meteor.Error("Unauthorized");
      
    Objects.insert({
      price,
      email,
      imageurl,
      title,
      description,
      alttext,
      rented: false,
    });  
  },
  //object removal
  'objects.remove'(objectId,userId) {

    check(objectId, String);

    const task = Tasks.findOne(objectId);

    if (task.private && task.owner !== /*Why 'this'?*/ this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    Objects.remove(objectId);
  },

  'tasks.setChecked'(objectId, setChecked) {

    const task = Objects.findOne(objectId);

    if (task.private && task.owner !== this.userId) {

      // If the task is private, make sure only the owner can check it off

      throw new Meteor.Error('not-authorized');

    }

    check(objectId, String);

    check(setChecked, Boolean);

    Objects.update(objectId, { $set: { checked: setChecked } });
  },
  
  
  //TODO fix this updater to work when to object is rented
  'objects.updateObjectToRented'(objectId, userId) {
    const task = Tasks.findOne(taskId);
    console.log('updateTasksBlack: ', task)
    console.log(carta)
    Tasks.update(task._id, { $set: { blackcard: carta } });
  },
  //TODO fix this updater to update the rating of the object
  'objects.updateObjectRating'(objectId, userId,score) {
    const task = Tasks.findOne(taskId);
    console.log('updateTasksBlack: ', task)
    console.log(carta)
    Tasks.update(task._id, { $set: { blackcard: carta } });
  },

});