import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from '../../routes/routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.login}>
          Login
        </Route>

        <Route exact path={routes.signUp}>
          cadastro 2
        </Route>

        <Route exact path={routes.timeline}>
          timeline
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
