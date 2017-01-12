import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Home from '../components/Home.jsx';

/*
- This function receives the information by server and pass to the presentation component
*/

export default HomeContainer = createContainer(() => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

  // var handle = Meteor.subscribe("examplePublication");

  return {
    // loading: !handle.ready()
    // Some other DB Query goes here
  };
}, Home);
