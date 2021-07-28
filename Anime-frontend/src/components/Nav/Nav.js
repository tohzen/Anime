import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";
export class Nav extends Component {
  render() {
    //console.log(this.props);

    return (
      <nav className="Navbar">
        <div className="h1-logo">
          <h1>
            <Link to="/">Welcome to Anime Space!</Link>
          </h1>
        </div>
        <div className="right-side-nav">
          <ul>
            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/anime">
                  Find new Anime!!!!
                </NavLink>
              ) : (
                ""
              )}
            </li>

            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/create-friend">
                  Create Friend
                </NavLink>
              ) : (
                ""
              )}
            </li>

            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/profile">
                  Welcome Back - {this.props.user.email}
                </NavLink>
              ) : (
                <NavLink activeClassName="selected" to="/sign-up">
                  Sign up
                </NavLink>
              )}
            </li>
            <li>
              {this.props.user ? (
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/login"
                  onClick={this.props.handleUserLogout}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Nav;
