import { BrowserRouter, Switch, Route } from "react-router-dom";
import routes from "../../routes/routes";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Timeline from "../Timeline/Timeline";
import MyPosts from "../MyPosts/MyPosts";
import TrendingPage from "../TrendingPage/TrendingPage";
import UserContext from "../../contexts/UserContext";
import { useState } from "react";
import "../App/App.css";
import UserPosts from "../UserPosts/UserPosts";

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

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
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

          <Route exact path={routes.user}>
            <UserPosts />
          </Route>

          <Route exact path={routes.likes}>
            meus likes
          </Route>

          <Route exact path={routes.trending}>
            <TrendingPage />
          </Route>

          <Route path={routes.login}>
            <Login />
          </Route>

        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
