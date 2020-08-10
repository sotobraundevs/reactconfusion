import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

  constructor(props) {
     super(props);
    // Esto va setear el estado llamado toggleNav
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }


  render() {
    return(
    <React.Fragment>
        {/* md Se colapsa solo para small y extra small */}
<div>
      <Navbar dark expand="md">
        <div className="container">
            {/* Este boton se va a mostrar solo para small y extra small */}
            <NavbarToggler onClick={this.toggleNav}/>

            {/* mr-auto para que el espaciado se realice automaticamente */}
            <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
              {/* se define isopen para que guarde el estado */}
              <Collapse isOpen={this.state.isNavOpen} navbar>
                  <Nav navbar>
                      <NavItem>
                          <NavLink className="nav-link" to="/home">
                          <span className="fa fa-home fa-lg"></span> Home
                          </NavLink>
                      </NavItem>

                      <NavItem>
                          <NavLink className="nav-link" to="/aboutus">
                          <span className="fa fa-info fa-lg"></span> About Us
                          </NavLink>
                      </NavItem>

                      <NavItem>
                          <NavLink className="nav-link" to="/menu">
                          <span className="fa fa-list fa-lg"></span> Menu                          
                          </NavLink>
                      </NavItem>

                      <NavItem>
                          <NavLink className="nav-link" to="/contactus">
                          <span className="fa fa-address-card fa-lg"></span> Conctact
                          </NavLink>
                      </NavItem>
                    </Nav>
              </Collapse>
               



                      


          
        </div>
      </Navbar>
      <Jumbotron>
           <div className="container">
               <div className="row row-header">
                   <div className="col-12 col-sm-6">
                       <h1>Ristorante con Fusion</h1>
                       <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                   </div>
               </div>
           </div>
       </Jumbotron>
       </div>
    </React.Fragment>
    );
  }
}

export default Header;


