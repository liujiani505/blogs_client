import "./login.css"
import React, { useState } from "react";
import { GlobalCtx } from "../../App"
import { useContext } from "react"
import { useHistory } from "react-router-dom";


function Login(props) {

    let history = useHistory()
    const {gState, setGState} = useContext(GlobalCtx)
    const {url} = gState

    const blankForm = {
            username: "",
            password: ""
    }

    const [form, setForm] = useState(blankForm)

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const {username, password} = form

         //Login
        fetch(`${url}/login`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            window.localStorage.setItem("token", JSON.stringify(data))
            setGState({...gState, token: data.token, username: data.user.username, userid: data.user.id})
            setForm(blankForm)
            history.push("/allposts")
        })
    }

    return (
        <div className="login" onSubmit={handleSubmit}>
            <form className ="loginForm">
                <label>Username</label>
                <input type="text" name="username" placeholder="Enter your username" value={form.username} onChange={handleChange} />
                <label>Password</label>
                <input type="text" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange}/>
                <button className="loginButton">Login</button>
            </form>
        </div>
    )
}

export default Login