import { Container } from 'react-bootstrap';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import PostEditForm from './pages/posts/PostEditForm';
import CollageCreateForm from './pages/collages/CollageCreateForm';
import ProfilePage from './pages/profiles/ProfilePage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import ChangeUsernameForm from "./pages/profiles/ChangeUsernameForm";
import ChangeUserPasswordForm from "./pages/profiles/ChangeUserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import PageNotFound from './components/PageNotFound';
import CollagePage from './pages/collages/CollagePage';

function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (

    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <PostsPage message="No results...Try using a different keyword." />}
          />
          <Route
            exact
            path="/feed"
            render={() => <PostsPage
              message="No results...Try using a different keyword or start following a profile."
              filter={`owner__followed__owner__profile=${profile_id}&`}
            />}
          />
          <Route
            exact
            path="/liked"
            render={() => <PostsPage
              message="No results...Try using a different keyword or like an xPression."
              filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_on&`}
            />}
          />
          <Route exact path="/login" render={() => <LogInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/collages/create" render={() => <CollageCreateForm />} />
          <Route exact path="/collages/:id" render={() => <CollagePage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <ChangeUsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <ChangeUserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <PageNotFound />} />
        </Switch>
      </Container>
    </div>

  );
}

export default App;