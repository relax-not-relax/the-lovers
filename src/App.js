import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import './App.css';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar/index.jsx';
import AccountMgnFeature from './features/AccountMgn';
import LoginFeature from './features/Auth/components/Login';
import RegisterFeature from './features/Auth/components/Register';
import CreateFeature from './features/CreatePost';
import HomeFeature from './features/Home';

function App() {

  const storedUser = localStorage.getItem('userTheLovers');
  const userObject = JSON.parse(storedUser);

  if (userObject && userObject.email) {
    return (
      <div className="App">
        <Sidebar />
        <Switch>
          <Redirect from='/' to='/feeds' exact />
          <Route path='/feeds' component={HomeFeature} exact />
          <Route path='/create' component={CreateFeature} />
          <Route path='/account' component={AccountMgnFeature} />
        </Switch>
        <Profile />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Redirect from='/login' to='/' exact />
        <Route path='/' component={LoginFeature} exact />
        <Route path='/register' component={RegisterFeature} />
      </div>
    );
  }
}

export default App;
