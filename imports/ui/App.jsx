import React , {Component} from 'react';
import { Router, Route, browserHistory } from 'react-router'
import Loading from './layouts/Loading.jsx';

import Main from './layouts/Main.jsx';
import Home from './components/Home.jsx';


const Routes = (
	<Router history={browserHistory}>
		<Route component={Main}>
			<Route path='/' component={Home} />
		</Route>
	</Router>
);

class App extends Component {
	render() {
		return Routes;
	}
}

export default App;