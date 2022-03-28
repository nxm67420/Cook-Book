//React imports
import {BrowserRouter, Switch, Route } from 'react-router-dom'

//page components
import Navbar from './components/Navbar'
import Home from './Pages/home/Home'
import Create from './Pages/create/Create'
import Search from './Pages/search/Search'
import Recipe from './Pages/recipe/Recipe' 

//styles
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>

          <Route exact path="/">
            <Home/>
          </Route>

          <Route path="/create">
            <Create/>
          </Route>

          <Route path="/search">
            <Search/>
          </Route>

          <Route path="/recipes/:id">
            <Recipe/>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
