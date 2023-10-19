import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import './App.css';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar/index.jsx';
import LoginFeature from './features/Auth/components/Login';
import RegisterFeature from './features/Auth/components/Register';
import CreateFeature from './features/CreatePost';
import HomeFeature from './features/Home';

function App() {
  const user = {
    id: 1,
    username: 'Test',
    email: 'test@example.com',
  };

  localStorage.setItem('user', JSON.stringify(user));
  //localStorage.removeItem('user');

  const storedUser = localStorage.getItem('user');
  const userObject = JSON.parse(storedUser);

  // Kiểm tra xem userObject có tồn tại và userObject.username có tồn tại
  if (userObject && userObject.username) {
    return (
      <div className="App">
        <Sidebar />
        <Switch>
          <Redirect from='/' to='/feeds' exact />
          <Route path='/feeds' component={HomeFeature} exact />
          <Route path='/create' component={CreateFeature} />
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
