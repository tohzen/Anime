import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Anime from "./components/Anime/Anime";
import AnimeDetail from "./components/Anime/AnimeDetail"
// import Movie from "./components/Movie/Movie";
// import MovieDetail from "./components/Movie/MovieDetail";
import Profile from "./components/Profile/Profile";
import CreateFriend from "./components/CreateFriend/CreateFriend";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const MainRouter = (props) => {
  return (
    <Router>
      <Nav user={props.user} handleUserLogout={props.handleUserLogout} />
      <>
        {/* <Route exact path="/movie" component={Movie} /> */}
        <PrivateRoute exact path="/create-friend" component={CreateFriend} />
        <PrivateRoute exact path="/anime" component={Anime} />
        <PrivateRoute exact path="/anime-detail" component={AnimeDetail} />

        <PrivateRoute
          exact
          path="/profile"
          component={Profile}
          handleUserLogout={props.handleUserLogout}
        />
        <Route exact path="/sign-up" component={Signup} />
        {/* <Route exact path="/login" component={Login}>
          <Login handleUserLogin={props.handleUserLogin} />
        </Route> */}

        <Route
          exact
          path="/login"
          render={(routerProps) => (
            <Login {...routerProps} handleUserLogin={props.handleUserLogin} />
          )}
        />
        {/* /api/user/user-detail/get-user-by-id/:id */}
        {/* <Route exact path="/movie-detail/:movieTitle" component={MovieDetail} /> */}
        <PrivateRoute
          exact
          path="/anime-detail/:id"
          component={AnimeDetail}
        />
        <Route exact path="/" component={Home} />
      </>
    </Router>
  );
};

export default MainRouter;
