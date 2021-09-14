import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from '../../routes/routes';
import Timeline from '../Timeline/Timeline';
import SignUp from '../SignUp/SignUp';
import '../App/App.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.login}>
          Login
        </Route>

        <Route exact path={routes.signUp}>
          <SignUp />
        </Route>

        <Route exact path={routes.timeline}>
          <Timeline />
        </Route>

        <Route exact path={routes.myPosts}>
          meus posts
        </Route>

        <Route exact path={routes.user}>
          posts de outro usuário
        </Route>

        <Route exact path={routes.likes}>
          meus likes
        </Route>

        <Route exact path={routes.trending}>
          trendings
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
