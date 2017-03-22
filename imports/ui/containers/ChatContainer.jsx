import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Chat from '../components/Chat.jsx';
import { Messages } from '../../api/models.js';

export default ChatContainer = createContainer(() => {

  var handle = Meteor.subscribe("messages");

  return {
    loading: !handle.ready(),
    messages: Messages.find({}).fetch()
  };
}, Chat);
