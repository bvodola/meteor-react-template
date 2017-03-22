import { Meteor } from 'meteor/meteor';
import { Messages } from '../imports/api/models.js';

// =====================
// Meteor server startup
// =====================
Meteor.startup(() => {
  // code to run on server at startup
});

// ============
// Publications
// ============
Meteor.publish('users', () => {
  return Meteor.users.find({});
});

Meteor.publish('messages', () => {
  return Messages.find({});
});
