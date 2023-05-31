
import './components/LoginScreen'
import LoginScreen from './components/LoginScreen';

import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login.component'
import SignUp from './components/signup.component'
import IQReactor from './components/IQReactor'
import ColorTapper from './components/ColorTapper'
import NumberMemoryGame from './components/NumberMemoryGame'
import ReactionTimeTester from './components/ReactionTimeTester'
import SimonSays from './components/SimonSays'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              positronX
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/IQ-Reactor" element={<IQReactor />} /> 
              <Route path="/Color-Tapper" element={<ColorTapper />} /> 
              <Route path="/Number-Memory-Game" element={<NumberMemoryGame />} />
              <Route path="/Reaction-Time-Tester" element={<ReactionTimeTester />} />
              <Route path="/Simon-Says" element={<SimonSays />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App