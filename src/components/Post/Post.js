import "./post.css";
import { Link } from "react-router-dom" 

function Post({post}) {


  return (
    <div className="post">
      <Link to={`/post/${post.id}`} className="link">
        <img className="postImage" src={post.img_url}/>
        <div className="postInfo">
            
            <span className="postTitle">
                {post.title}
            </span>
            <hr/>
            <span className="postAuthor">by {post.user.username}</span>
            <span className="postDate">{new Date(post.created_at).toDateString()}</span>
        </div>
        <div className="postDescription">
            <p>{post.content}</p>
        </div>
      </Link>
    </div>
  );
}

export default Post