import "./posts.css";
import Post from "../Post/Post";

function Posts({posts}) {

  const loaded= () => {

    return (
      <div className="posts">
        {posts ? posts.map((post, index) => (
          <Post post={post} index={index} />
        )) : null}
          
      </div>
    );
  }
  return posts? loaded() : <p>Loading...</p>
}

export default Posts

