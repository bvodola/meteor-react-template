import 'react-hot-loader/patch';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App, { Routes } from '../imports/ui/App.jsx';
import { AppContainer } from 'react-hot-loader';

// =====================
// Server Side Rendering
// =====================
// import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';

/*
	To add SSR, uncomment the line above and add the react-router-ssr package
	with the command: meteor add reactrouter:react-router-ssr.
	Use this before launching your app in production
*/

Meteor.startup(() => {

	let enableSSR = false;
	let enableHMR = !enableSSR;


	// If the Hot Module Replacement is enabled
	if(enableHMR) {
		render(<AppContainer><App /></AppContainer>, document.getElementById('app'));

		if (module.hot) {
			module.hot.accept('../imports/ui/App.jsx', () => {
				const NextApp = require('../imports/ui/App.jsx').default;
				render(
					<AppContainer>
						<NextApp />
					</AppContainer>,
					document.getElementById('app')
				);
			});
		}

		}

		// If the Hot Module Replacement is not enabled
		else {
			ReactRouterSSR.Run(Routes, {rootElement: 'app'});
			render(<App enableSSR={enableSSR} />, document.getElementById('app'));
		}

});
