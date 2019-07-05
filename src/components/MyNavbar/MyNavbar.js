import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';
import './MyNavbar.scss';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state= {
    isOpen: false,
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    const buildNavbar = () => {
      if (authed) {
        return (
            <Nav className="ml-auto" navbar>
              <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to= '/new'>New Hoard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.logMeOut}>Log Out</NavLink>
              </NavItem>
            </Nav>
            </Nav>
        );
      }
      return <Nav className="ml-auto" navbar />;
    };

    return (
  <div className="MyNavbar">
    <Navbar color="dark" light expand="md">
      <NavbarBrand href="/">React Hoarder</NavbarBrand>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
       {buildNavbar()}
      </Collapse>
    </Navbar>
  </div>
    );
  }
}

export default MyNavbar;
