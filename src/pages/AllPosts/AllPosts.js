import "./allposts.css"
import Posts from "../../components/Posts/Posts"


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

