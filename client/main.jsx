import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import AppContainer from '../imports/ui/containers/AppContainer.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

Meteor.startup(() => {
	render(<AppContainer />, document.getElementById('app'));
});
