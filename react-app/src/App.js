import { Routes, Route } from 'react-router-dom';


import Main from './componets/pages/Main';
import About from './componets/pages/About';
import ProductById from './componets/pages/ProductById';
import SignIn from "./componets/pages/SignIn"
import SignUp from './componets/pages/SignUp'


import { userSessionFunction } from './store/user';


import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userSessionFunction());
  }, [dispatch])

  return (
    <Routes>
      <Route path="/*" element={ <Main />  } />
      {/* <Route path="/*" element={ <Main />  }/> */}
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />} />

    </Routes>
  );
}

export default App;
