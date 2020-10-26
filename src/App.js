import React, { useEffect, useState } from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if(window.localStorage.getItem('token')){
      setSessionToken(window.localStorage.getItem('token'));
    }
  }, []);
  
  const updateToken = (newToken) => {
    window.localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  }

  const clearToken = () => {
    window.localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return (sessionToken === window.localStorage.getItem('token') ? <WorkoutIndex token={sessionToken}/> :
      <Auth updateToken={updateToken}/>)
      
  }

  return (
    <div>       {/*clearToken for prop??? */}
      <Sitebar clickLogout={clearToken}/>
      {protectedViews()}
    </div>
  );
}

export default App;
