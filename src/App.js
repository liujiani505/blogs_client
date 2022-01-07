import React from "react"
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { useState , useEffect} from "react"
import Nav from "./components/Nav/Nav"
import Home from "./pages/Home/Home"
import Single from "./pages/Single/Single"
import NewPost from "./pages/NewPost/NewPost"
import AllPosts from "./pages/AllPosts/AllPosts"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

export const GlobalCtx = React.createContext(null)

function App() {

  const [gState, setGState] = useState({url: "https://jl-blogs-api.herokuapp.com", token: null, username: null, userId: null})

  useEffect(()=>{
    const token = JSON.parse(window.localStorage.getItem("token"))
    console.log(token)
    if (token){
      setGState({...gState, token: token.token, username: token.user.username, userId: token.user.id})
    }
  },[])

const {url, token, username, userId } = gState
const [posts, setPosts] = useState(null)

const getPosts = async () => {
    const response = await fetch(url + "/posts", {
        method: "get",
        headers: {
            Authorization: "bearer " + token,
        }
    })
    const fetchedPosts = await response.json()
    setPosts(fetchedPosts)
    console.log(fetchedPosts)
    setGState({...gState, posts: fetchedPosts})
}

useEffect(()=> {
    if(!token) {
        return;
    }
    getPosts();
}, [token])


  return (
    <GlobalCtx.Provider value={{gState, setGState}}>
    <div className="App">
      <Router>
        <Nav />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/allposts" render={(rp) => (
              gState.token? 
              <AllPosts {...rp} posts={posts} getPosts={getPosts}
              /> 
              : <Login />
           )}
            />

            <Route path="/register" render={(rp) => <Register {...rp}/>}>
            </Route>

            <Route path="/login" render={(rp) => <Login {...rp}/>}>
            </Route>

            <Route path="/new" render={(rp) => (
              gState.token? 
              <NewPost {...rp} posts={posts} getPosts={getPosts}
              /> 
              : <Login />
            )}
            />
            <Route path="/post/:id" 
            render={({match}) => ( posts ?
              <Single id={match.params.id} posts={posts} getPosts={getPosts}/>
              : null
            )}/>

          </Switch>
      </Router>
    </div>
    </GlobalCtx.Provider>
  );
}

export default App;
