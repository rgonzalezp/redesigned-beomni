import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
import '../imports/api/users.js';
import '../imports/api/objects.js';

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  WebApp.addHtmlAttributeHook(function() {
        return {
            "lang": "en"
        }
    })
  
});
