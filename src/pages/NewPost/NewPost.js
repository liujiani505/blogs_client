import "./newpost.css"
import { useState } from "react";
import { GlobalCtx } from "../../App"
import { useContext } from "react"
import { useHistory } from "react-router-dom";


function NewPost({getPosts}, props) {

    const { gState, setGState } = useContext(GlobalCtx)
    const { url, token} = gState
    let history = useHistory()
 
    const [newForm, setNewForm] = useState({
        title: "",
        content: "",
        img_url: "",
    });
    

    const createPost =  (onePost) =>{
        console.log(onePost)
          fetch(url + "/posts/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify(onePost),
        })
        .then(response => response.json())
            .then(data =>  {
                getPosts()
            })
    }

    const handleChange = (event) => {
        setNewForm({ ...newForm, [event.target.name]: event.target.value });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        createPost(newForm);
        setNewForm({
            title: "",
            content: "",
            img_url: "",
    })
    history.push("/allposts")
    };

    return (
        <div className="newpost">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="title" placeholder="Title" className="writeInput" autoFocus={true} value={newForm.title} onChange={handleChange}/><br/>
                </div>
                <div className="form-group">
                    <input type="text" className="writeInput" name="img_url" placeholder="Image URL" value={newForm.img_url} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <textarea className="writeInput writeText" type="text" name="content" placeholder="Tell your story..." value={newForm.content} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                <button className="publish-btn">Publish</button>
                </div>
            </form>
        </div>
    )
}

export default NewPost