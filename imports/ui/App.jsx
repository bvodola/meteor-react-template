import React , {Component} from 'react';
import { Router, Route, browserHistory } from 'react-router'

import Loading from './layouts/LoadingLayout.jsx';
import Home from './components/Home.jsx';

// =================
// Routes Definition
// =================
const Routes = (
	<Route>
		<Route path='/' component={Home} />
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
