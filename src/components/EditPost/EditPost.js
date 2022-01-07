import "./editpost.css"
import { useState } from "react";
import { GlobalCtx } from "../../App"
import { useContext } from "react"
import { useHistory } from "react-router-dom";


function EditPost({post, getPosts, id}) {

    const { gState, setGState } = useContext(GlobalCtx)
    const { url, token, username} = gState
    let history = useHistory()

    const [updateMode, setUpdateMode] = useState(false);
 
    const [editForm, setEditForm] = useState(post);

    const editPost =  (onePost) =>{
        console.log(onePost)
          fetch(url + `/posts/${id}`, {
            method: "put",
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
        setEditForm({ ...editForm, [event.target.name]: event.target.value });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        editPost(editForm, post.id);
        setEditForm({
            title: "",
            content: "",
            img_url: "",
    })
    setUpdateMode(false)
    history.push("/allposts")
    };

    
    return (
        <div className="editpost">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="title" placeholder={editForm.title}className="writeInput" autoFocus={true} value={editForm.title} onChange={handleChange}/><br/>
                </div>
                <div className="form-group">
                    <input type="text" className="writeInput" name="img_url" placeholder={editForm.img_url} value={editForm.img_url} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <textarea className="writeInput writeText" type="text" name="content" placeholder={editForm.content} value={editForm.content} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                <button className="update-btn">Update</button>
                </div>
            </form>
        </div>
    )
}

export default EditPost