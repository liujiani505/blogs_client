import "./singlepost.css"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GlobalCtx } from "../../App"
import { useContext } from "react"
import { useHistory } from "react-router-dom";
import EditPost from "../EditPost/EditPost"

function SinglePost({posts, id, getPosts}, props) {

    let history = useHistory()
 
    const { gState, setGState } = useContext(GlobalCtx)
    const { url, token, username, userId} = gState
    const [updateMode, setUpdateMode] = useState(false);

    if (!posts){
        return <h1> NO POSTS</h1>
    }
    const post = posts.find((singlePost) => {
        console.log(singlePost.id, id)
        return singlePost.id == id
    })
    console.log(post)
    const deletePost = async () =>{
        await fetch(url + "/posts/" + post.id, {
           method: "delete",
           headers: {
               "Authorization": "bearer " + token
           },
       })
       .then(() => getPosts())
    }

    const removePost = () => {
        deletePost(post.id)
        history.push("/allposts")
    }
    return (
        <div className="singlePost">
            { updateMode ? (
                <EditPost posts={posts} post={post} id={id} getPosts={getPosts} />
            ) :(
                <div className="singlePostWrapper">
                <div className="imageWrapper">
                    <img className="singlePostImage" src={post.img_url} />
                </div>

                <h1 className="singlePostTitle">{post.title}

                    <div className="singlePostEdit"> 
                {post.user.username == username &&
                    <>            
                        <i className="singlePostIcon far fa-edit" id="edit-btn" onClick={()=>setUpdateMode(true)}></i>
                        <i className="singlePostIcon far fa-trash-alt" id="delete-btn" onClick={removePost}></i>.
                    </>
                }
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author: <b>{post.user.username}</b></span>
                    <span className="singlePostDate">{new Date(post.created_at).toDateString()}</span>
                </div>

                <p className="singlePostDescription">{post.content}</p>
            </div>
            )}

        </div>
    )
}

export default SinglePost