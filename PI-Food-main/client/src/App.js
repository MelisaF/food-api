import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { AboutMe } from './components/AboutMe';
import { Detail } from './components/Detail';
import { Form } from './components/Form';
import { Home } from './components/Home';
import { LandingPage } from './components/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component= { LandingPage }/>
        <Route path='/home' component= { Home }/>
        <Route path='/recipe' component= { Form }/>
        <Route path='/recipes/:id' component= { Detail }/>
        <Route path='/aboutMe' component= { AboutMe }/>
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
