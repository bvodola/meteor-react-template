import { Meteor } from 'meteor/meteor';

// =====================
// Meteor server startup
// =====================
Meteor.startup(() => {
  // code to run on server at startup
});

// ===================
// Meteor publications
// ===================
Meteor.publish('users', () => {
  return Meteor.users.find({});
})
