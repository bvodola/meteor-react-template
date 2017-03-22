  import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../App.jsx';

export default AppContainer = createContainer(() => {

  var handle = Meteor.subscribe("users");

  return {
    loading: !handle.ready(),
    currentUser: Meteor.user()
  };
}, App);
