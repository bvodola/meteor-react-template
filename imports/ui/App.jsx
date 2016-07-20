import React , {Component} from 'react';
import { Router, Route, browserHistory } from 'react-router'

import Main from './layouts/Main.jsx';
import Home from './components/Home.jsx';


class App extends Component {
	render() {
		return(
			<Router history={browserHistory}>
				<Route component={Main}>
					<Route path='/' component={Home} />
				</Route>
			</Router>
		);
	}
}

export default App;