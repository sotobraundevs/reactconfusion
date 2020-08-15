import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

  constructor(props) {
     super(props);
    // Esto va setear el estado llamado toggleNav
    this.toggleNav = this.toggleNav.bind(this);
    //Esta setea el estaddo 
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      isNavOpen: false,
      isModalOpen: false //Se crea la variable
  };

//manejo del envio del formulario
  this.handleLogin = this.handleLogin.bind(this);

  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }
//se implementa esta funciona modal para setear el estado
  

toggleModal() {
  this.setState({
    isModalOpen: !this.state.isModalOpen
  });
}

//Manejo del envio del la info
handleLogin(event) {
  this.toggleModal();
  alert("Username: " + this.username.value + " Password: " + this.password.value
      + " Remember: " + this.remember.checked);
  event.preventDefault();

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
                                
                                {/* Se agregar el boton */}
                    <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
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

       {/* //Se cree el modal */}
       <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.handleLogin}>

                    // Campos del modal
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
       </div>
    </React.Fragment>
    );
  }
}

export default Header;


