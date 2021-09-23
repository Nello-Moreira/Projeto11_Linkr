import { BrowserRouter, Switch, Route } from "react-router-dom";
import routes from "../../routes/routes";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Timeline from "../Timeline/Timeline";
import MyPosts from "../MyPosts/MyPosts";
import TrendingPage from "../TrendingPage/TrendingPage";
import UserPosts from "../UserPosts/UserPosts";
import DeletingPostModal from "../Modal/DeletingPostModal";
import UserContext from "../../contexts/UserContext";
import PagePostsContext from "../../contexts/PagePostsContext";
import { useState } from "react";
import "../App/App.css";
import MyLikes from "../MyLikes/MyLikes";

function App() {
  const [loggedUser, setLoggedUser] = useState({
    token: "",
    user: {
      id: "",
      email: "",
      username: "",
      avatar: "",
    },
  });
  const [pagePosts, setPagePosts] = useState([]);
  const [deletingPostId, setDeletingPostId] = useState(false);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <PagePostsContext.Provider
          value={{ pagePosts, setPagePosts, deletingPostId, setDeletingPostId }}
        >
          <Switch>
            <Route exact path={routes.signUp}>
              <SignUp />
            </Route>

            <Route exact path={routes.timeline}>
              <Timeline />
            </Route>

            <Route exact path={routes.myPosts}>
              <MyPosts />
            </Route>

            <Route exact path={routes.likes}>
              <MyLikes />
            </Route>

            <Route exact path={routes.trending}>
              <TrendingPage />
            </Route>

            <Route exact path={routes.user}>
              <UserPosts />
            </Route>

            <Route path={routes.login}>
              <Login />
            </Route>
          </Switch>

          <DeletingPostModal />
        </PagePostsContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
