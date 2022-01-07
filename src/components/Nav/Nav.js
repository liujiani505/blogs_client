import "./nav.css"
import React from "react";
import {Link} from "react-router-dom"
import { GlobalCtx } from "../../App"
import { useContext } from "react"


function Nav(props) {
  
  const {gState, setGState} = useContext(GlobalCtx) 

  const logout =(  <Link to="/" className="logout" onClick={()=>{
      window.localStorage.removeItem("token")
      setGState({...gState, token: null, username: null, userId: null})
  }}>LOGOUT</Link>)

    return (
      <div className="nav">
        <div className="navLeft">
        <Link className="link" to="/">
            <h6>EYE ON ART</h6>
        </Link>
        </div>
        <div className="navRight">
          <ul>
            <li>
              <Link className="link" to="/">Home</Link>
            </li>
            <li>
              <Link className="link" to="/allposts">Posts</Link>
            </li>
            <li>
              <Link className="link" to="/new">New</Link>
            </li>
            <li>
              { !gState.token && <Link className="link" to="/login">LOGIN</Link>} 
            </li>
            <li>
              { !gState.token && <Link className="link" to="/register">REGISTER</Link>}
            </li>
            <li>
              {gState.token ? logout: null} 
            </li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default Nav;