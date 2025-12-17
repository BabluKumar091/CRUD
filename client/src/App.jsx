import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserCreate from './UserCreate';
import User from './User';
import UserUpdate from './UserUpdate';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<User/>}></Route>
        <Route path={"/create"} element={<UserCreate/>}></Route>
        <Route path={"/update/:id"} element={<UserUpdate/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
