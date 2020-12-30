import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/Home.js'
import Results from './components/Results.js'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/results' component={Results}></Route>
      </Switch>
    </BrowserRouter>

  )
}

export default App;
