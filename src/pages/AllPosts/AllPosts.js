import "./allposts.css"
import Posts from "../../components/Posts/Posts"
import { useEffect } from "react"


function AllPosts({getPosts, posts}) {

    return (
        <>
        
        <div className="allposts">

            <Posts posts={posts} />
        </div>
        </>
    )
}

export default AllPosts

