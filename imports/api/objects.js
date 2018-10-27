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
  'objects.insert'(text,players,cartas) {

    check(text, String);
    console.log('players: ',players)
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    console.log('what is this.userId: ', this.userId)
    
    const game = Tasks.findOne({
      owner: this.userId
    });
    console.log('Game?: ',game);
    if(!game)
    {

      console.log('Do you enter??: ');
      
      Tasks.insert({
        text: text,
        createdAt: new Date(),
        players: players,
        owner: this.userId,
        username: Meteor.users.findOne(this.userId).username,
        game_on: false,
        player_1:{},
        player_2:{},
        player_3:{},
        player_4:{},
        player_1votes:0,
        player_2votes:0,
        player_3votes:0,
        player_4votes:0,
        cards:cartas,
        currentWinner:{},
        time:moment.duration( 3 , 'minutes' ),
  
      });  

    }

  },
  //object removal
  'objects.remove'(objectId,userId) {

    check(taskId, String);

    const task = Tasks.findOne(taskId);

    if (task.private && task.owner !== this.userId) {

      // If the task is private, make sure only the owner can delete it

      throw new Meteor.Error('not-authorized');

    }
 

    Tasks.remove(taskId);
  },

  'tasks.setChecked'(taskId, setChecked) {

    const task = Tasks.findOne(taskId);

    if (task.private && task.owner !== this.userId) {

      // If the task is private, make sure only the owner can check it off

      throw new Meteor.Error('not-authorized');

    }

    check(taskId, String);

    check(setChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: setChecked } });
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