import { useState } from 'react'
import SignUp from './Pages/SignUp'
import Users from './Pages/Users'
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import LogIn from './Pages/LogIn'
import Chat from './Components/Chat'
import Posts from './Pages/Posts'
import SearchPosts from './Components/SearchPosts'
import Statistics from './Pages/Statistics'
import Post from './Pages/Post'
import './App.css'
import CategoryPage from './Pages/Category';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn/>}/>    
          <Route path="/SignUp" element={<SignUp/>}/>      
          <Route path="/Users" element={<Users/>}/>    
          <Route path="/LogIn" element={<LogIn/>}/>
          <Route path="/Chat" element={<Chat/>}/> 
          <Route path="/Posts" element={<Posts/>}/>   
          <Route path="/SearchPosts" element={<SearchPosts/>}/>  
          <Route path="/Statistics" element={<Statistics/>}/>
          <Route path="/Category" element={<CategoryPage/>}/>   
          <Route path="/Post/:id" element={<Post/>}/>   
        </Routes>
      </Router>
    </div>
      
  )
}

export default App
