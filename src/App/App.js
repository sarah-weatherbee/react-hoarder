import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import NewHoard from '../components/NewHoard/NewHoard';
import EditHoard from '../components/EditHoard/EditHoard';
import SingleHoard from '../components/SingleHoard/SingleHoard';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import './App.scss';
import fbConnection from '../helpers/data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecher = props => (authed === false
    ? (<Component {...props}/>)
    : (<Redirect to ={ { pathname: '/home', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecher(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecher = props => (authed === true
    ? (<Component {...props}/>)
    : (<Redirect to ={ { pathname: '/auth', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecher(props)} />;
};


class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
        <React.Fragment>
          <MyNavbar authed={authed}/>
          <div className='container'>
            <div className="row">
              <Switch>
                <PublicRoute path='/auth' component={Auth} authed={authed}/>
                <PrivateRoute path='/home' component={Home} authed={authed}/>
                <PrivateRoute path='/new' component={NewHoard} authed={authed}/>
                <PrivateRoute path='/edit/:id' component={EditHoard} authed={authed}/>
                <PrivateRoute path='/hoard/:id' component={SingleHoard} authed={authed}/>
                <Redirect from= "*" to= "/auth"/>
              </Switch>
            </div>
          </div>
        </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
