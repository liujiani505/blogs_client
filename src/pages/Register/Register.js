import "./register.css"
import React, { useState } from "react";
import { GlobalCtx } from "../../App"
import { useContext } from "react"


function Register(props) {

    const {gState, setGState} = useContext(GlobalCtx)
    const {url} = gState

    const blankForm = {
            username: "",
            password: ""
    }

    const [form, setForm] = useState(blankForm)
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()   
        const {username, password} = form

        //register
       fetch(`${url}/users`, {
           method: "post",
           headers: {
               "Content-type": "application/json"
           },
           body: JSON.stringify({username, password})
       })
       .then(response => response.json())
       .then(data => {
           console.log(data)
           setForm(blankForm)
           props.history.push("/login")
       })
    }

    return (
        <div className="register" onSubmit={handleSubmit}>
            <form className ="registerForm">
                <label>Username</label>
                <input type="text" name="username" placeholder="Enter your username" value={form.username} onChange={handleChange}/>
                <label>Password</label>
                <input type="text" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange}/>
                <button className="registerButton">Register</button>
            </form>
        </div>
    )
}

export default Register