import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'}>
          Login
        </Route>

        <Route exact path={'/cadastro'}>
          cadastro
        </Route>

        <Route exact path={'/timeline'}>
          timeline
        </Route>

        <Route exact path={'/my-posts'}>
          meus posts
        </Route>

        <Route exact path={'/user/:id'}>
          posts de outro usuário
        </Route>

        <Route exact path={'/my-likes'}>
          meus likes
        </Route>

        <Route exact path={'/hashtag/:hashtag'}>
          trendings
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
