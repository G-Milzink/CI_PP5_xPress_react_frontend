import { Container } from 'react-bootstrap';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import './api/axiosDefaults';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>} />
          <Route exact path="/login" render={() => <h1>Log In</h1>} />
          <Route exact path="/signup" render={() => <h1>Sign Up</h1>} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;