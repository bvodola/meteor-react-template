import 'react-hot-loader/patch';
import { AppContainer as HotLoader } from 'react-hot-loader';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import AppContainer from '../imports/ui/containers/AppContainer.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

Meteor.startup(() => {

	let enableHMR = true;

	// If the Hot Module Replacement is enabled
	if(enableHMR) {
		render(<HotLoader><AppContainer /></HotLoader>, document.getElementById('app'));

		if (module.hot) {
			module.hot.accept('../imports/ui/containers/AppContainer.jsx', () => {
				const NextAppContainer = require('../imports/ui/containers/AppContainer.jsx').default;
				render(
					<HotLoader>
						<NextAppContainer />
					</HotLoader>,
					document.getElementById('app')
				);
			});
		}

	}

	// If the Hot Module Replacement is not enabled
	else {
		render(<AppContainer />, document.getElementById('app'));
	}

});
