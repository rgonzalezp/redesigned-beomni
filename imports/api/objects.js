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

  Meteor.publish('object', function objectPublication(owr) {
    console.log('Entro a publish task',owr);
    return Objects.find({
      owner:owr
    });
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

  }){
    // Make sure the user is logged in before inserting an object
   

      
    Objects.insert({
      price: price,
      email: email,
      imageurl: imageurl,
      title: title,
      description: description,
      rented: false,
      from_date: null,
      to_date:null
  
    });  

    

  },
  //object removal
  'objects.remove'(objectId,userId) {

    check(objectId, String);

    const task = Tasks.findOne(objectId);

    if (task.private && task.owner !== this.userId) {

      // If the task is private, make sure only the owner can delete it

      throw new Meteor.Error('not-authorized');

    }
 

    Objects.remove(objectId);
  },
  'objects.updateRent'(ob) {
    console.log('update objects rent: ',ob)
    Objects.update(ob.id, { $set: { from_date: ob.from ,to_date:ob.to, rented: true} });
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
  
  
  // fix this updater to work when to object is rented
  'objects.updateObjectToRented'(objectId, userId) {
    const task = Tasks.findOne(taskId);
    console.log('updateTasksBlack: ', task)
    console.log(carta)
    Tasks.update(task._id, { $set: { blackcard: carta } });
  },
  // fix this updater to update the rating of the object
  'objects.updateObjectRating'(objectId, userId,score) {
    const task = Tasks.findOne(taskId);
    console.log('updateTasksBlack: ', task)
    console.log(carta)
    Tasks.update(task._id, { $set: { blackcard: carta } });
  },

});