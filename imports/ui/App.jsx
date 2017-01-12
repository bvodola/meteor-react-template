import React , {Component} from 'react';
import { Router, Route, browserHistory } from 'react-router'

import Loading from './layouts/LoadingLayout.jsx';
import Main from './layouts/MainLayout.jsx';
import HomeContainer from './containers/HomeContainer.jsx';

// =================
// Routes Definition
// =================
const Routes = (
	<Route>
		<Route component={Main}>
			<Route path='/' component={HomeContainer} />
		</Route>
	</Route>
);

// =============
// App Component
// =============
class App extends Component {
	render() {
		return (<Router history={browserHistory} routes={Routes} />);
	}
}

export default App;
export { Routes };
