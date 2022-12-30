import { Provider } from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from "./containers/home";
import Error404 from "./containers/errors/eror404";

import Signup from './containers/auth/singup';
import Login from './containers/auth/login';
import Activate from './containers/auth/activate';
import ResetPassword from './containers/auth/resetPassword';
import ResetPasswordConfirm from './containers/auth/resetPasswordConfirm';
import Shop from './containers/Shop'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/*Error Display*/}
          <Route path="*" element={<Error404/>}/>
          <Route exact path="/" element={<Home/>}/>

          {/*Authentication*/}
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/activate/:uid/:token' element={<Activate/>}/>
          <Route exact path='/reset_password' element={<ResetPassword/>}/>
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>
          <Route exact path='/shop' element={<Shop/>}/>


        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
