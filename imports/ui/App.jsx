import React , {Component} from 'react';
import { Router, Route, browserHistory } from 'react-router'
import Loading from './layouts/Loading.jsx';

import Main from './layouts/Main.jsx';
import Home from './components/Home.jsx';

const Routes = (
	<Route>
		<Route component={Main}>
			<Route path='/' component={Home} />
		</Route>
	</Route>
);

class App extends Component {
	render() {
		return (<Router history={browserHistory} routes={Routes} />);
	}
}

export default App;
export { Routes };
