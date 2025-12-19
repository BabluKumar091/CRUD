import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserCreate from './UserCreate';
import User from './User';
import UserUpdate from './UserUpdate';
function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<User key={refreshKey} />}></Route>
        <Route path={"/create"} element={<UserCreate onUpdate={() => setRefreshKey(prev => prev + 1)} />}></Route>
        <Route path={"/update/:id"} element={<UserUpdate onUpdate={() => setRefreshKey(prev => prev + 1)} />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
