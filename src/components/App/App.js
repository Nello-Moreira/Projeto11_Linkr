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
import { GlobalStyle } from "./globalStyles";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./globalStyles";

function App() {
    const [loggedUser, setLoggedUser] = useState({
        token: "",
        user: {
            id: "",
            email: "",
            username: "",
            avatar: "",
        },
        theme: {
            mode: "",
            color: "",
        },
    });
    const [pagePosts, setPagePosts] = useState([]);
    const [deletingPostId, setDeletingPostId] = useState(false);
    const [previousPage, setPreviousPage] = useState(false);

    const [theme, setTheme] = useState({ mode: darkTheme });

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter>
                <UserContext.Provider
                    value={{ loggedUser, setLoggedUser, setTheme }}
                >
                    <PagePostsContext.Provider
                        value={{
                            pagePosts,
                            setPagePosts,
                            deletingPostId,
                            setDeletingPostId,
                        }}
                    >
                        <Switch>
                            <Route exact path={routes.signUp}>
                                <SignUp />
                            </Route>

                            <Route exact path={routes.timeline}>
                                <Timeline />
                            </Route>

                            <Route exact path={routes.myPosts}>
                                <MyPosts setPreviousPage={setPreviousPage} />
                            </Route>

                            <Route exact path={routes.likes}>
                                <MyLikes setPreviousPage={setPreviousPage} />
                            </Route>

                            <Route exact path={routes.trending}>
                                <TrendingPage
                                    setPreviousPage={setPreviousPage}
                                />
                            </Route>

                            <Route exact path={routes.user}>
                                <UserPosts setPreviousPage={setPreviousPage} />
                            </Route>

                            <Route path={routes.login}>
                                <Login previousPage={previousPage} />
                            </Route>
                        </Switch>

                        <DeletingPostModal />
                    </PagePostsContext.Provider>
                </UserContext.Provider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
