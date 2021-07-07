import React from 'react';
import Login from './Login';
import Register from './Register';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Route exact path='/' component={Login} />
      <Route exact path='/register' component={Register} />
    </div>
  );
}

export default App;
