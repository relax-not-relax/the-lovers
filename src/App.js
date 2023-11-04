import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import './App.css';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar/index.jsx';
import AccountMgnFeature from './features/AccountMgn';
import LoginFeature from './features/Auth/components/Login';
import RegisterFeature from './features/Auth/components/Register';
import CartFeature from './features/Cart';
import CheckoutFeature from './features/Checkout';
import CreateFeature from './features/CreatePost';
import HomeFeature from './features/Home';
import MyPostsFeature from './features/MyPosts';
import OrdersFeature from './features/Orders';
import UserViewFeature from './features/UserView';

function App() {

  const storedUser = localStorage.getItem('userTheLovers');
  const userObject = JSON.parse(storedUser);

  if (userObject && userObject.email) {
    return (
      <div className="App">
        <Sidebar />
        <Switch>
          <Redirect from='/' to='/feeds' exact />
          <Route path='/feeds' component={HomeFeature} />
          <Route path='/create' component={CreateFeature} />
          <Route path='/account' component={AccountMgnFeature} />
          <Route path='/cart' component={CartFeature} />
          <Route path='/posts' component={MyPostsFeature} />
          <Route path='/profile' component={UserViewFeature} />
          <Route path='/orders' component={OrdersFeature} />
          <Route path='/checkout' component={CheckoutFeature} />
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
