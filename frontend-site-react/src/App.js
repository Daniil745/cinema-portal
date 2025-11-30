import * as React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Mainer from './components/mainer';
import Mainpage from './components/Mainpage';
import Allfilms from './components/Allfilms';
import Myfilms from './components/Myfilms';
import Searchfriend from './components/Searchfriend';
import Error from './components/Error';
import Addnewfilm from './components/Addnewfilm';
import Myonefilm from './components/Myonefilm';
import Logout from './components/Logout';
import Settingsaccount from './components/Settingsaccount';
import Myfriends from './components/Myfriends';
import Showusercollection from './components/Showusercollection';
import Editfilm from './components/Editfilm';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Mainer />}>
          <Route index element={<Mainpage />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="logout" element={<Logout />} />
          <Route path="myfriends" element={<Myfriends />} />
          <Route path="settingsaccount" element={<Settingsaccount />} />
          <Route path="allfilms" element={<Allfilms />} />
          <Route path="editfilm" element={<Editfilm />} />
          <Route path="showusercollection" element={<Showusercollection />} />
          <Route path="myfilms" element={<Myfilms />} />
          <Route path="addnewfilm" element={<Addnewfilm />} />
          <Route path="searchfriend" element={<Searchfriend />} />
          <Route path="myonefilm" element={<Myonefilm />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;