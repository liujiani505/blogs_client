import "./single.css";
import SinglePost from "../../components/SinglePost/SinglePost";


function Single({id, posts, getPosts, showing, setShowing}) {
  return (
    <div className="single">
      <SinglePost id={id} posts={posts} getPosts={getPosts}/>
    </div>
  );
}

export default Single