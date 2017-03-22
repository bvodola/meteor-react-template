import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../App.jsx';

/*
- This function receives the information by server and pass to the presentation component
*/

export default AppContainer = createContainer(() => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

  let handle = Meteor.subscribe("users");

  return {
    loading: !handle.ready(),
    user: Meteor.user()
  };
}, App);
