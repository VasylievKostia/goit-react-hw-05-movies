import './App.css';

import { NavLink, Route, Switch } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import Spinner from './components/Spinner/Spinner';
// import { CastPage } from './components/pages/CastPage/CastPage';
// import { HomePage } from './components/pages/HomePage/HomePage';
// import { SearchPage } from './components/pages/SearchPage/SearchPage';

const HomePage = lazy(() => import('./components/pages/HomePage/HomePage' /* webpackChunkName: 'HomePage' */))
const SearchPage = lazy(() => import('./components/pages/SearchPage/SearchPage' /* webpackChunkName: 'SearchPage' */))
const MovieDetails = lazy(()=>import('./components/pages/MovieDetails/MovieDetails' /* webpackChunkName: 'MoviesDetails' */))
// const Cast = lazy(() => import ('./components/Cast/Cast' /* webpackChunkName: 'Cast' */))
function App() {
  return (
    <div className="App">
      <nav className="Navigation">
        <ul className="NavList">
          <li className="Item">
            <NavLink exact to="/" className="Link" activeClassName="ActiveLink">Home</NavLink>
          </li>
          <li className="Item">
            <NavLink exact to="/movies" className="Link" activeClassName="ActiveLink">Search</NavLink>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<Spinner/>}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/movies" component={SearchPage} />
        <Route path="/movies/:movieId">
            
        <MovieDetails/>
        </Route>
        <Route><p className="error">Page Not Found</p></Route>
      </Switch>
      </Suspense>
    </div>
  );
}

export default App;
