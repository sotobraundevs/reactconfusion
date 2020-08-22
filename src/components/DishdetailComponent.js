import React, { Component  ,  useState, useEffect } from "react";
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button ,  Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label, Row, Col, } from 'reactstrap';

import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
//se importa el loding component
import { Loading } from './LoadingComponent';

import { baseUrl } from '../shared/baseUrl';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {

  constructor(props) {
    super(props);
   
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
    
      isModalOpen: false //Se crea la variable
  };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }


  handleSubmit(values) {
    // console.log('Current State is: ' + JSON.stringify(values));
    // alert('Current State is: ' + JSON.stringify(values));
    // se agregar la accion para que se agregue a la lista de commnentarios
  //  this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    // event.preventDefault();
}


  render(){ 
    return (
      <React.Fragment>
       <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span>  Submit Comment</Button>


        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>

        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                <Control.select as="select" model=".favoriteColor" className="mr-sm-2"    custom>
                                    <option></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                  </Control.select>
                                </Col>
                            </Row>
                            
                            
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                             minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                         />
                                </Col>
                            </Row>                          
                            

                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
       
        </ModalBody>
    </Modal>
</React.Fragment>
  );



}
 

}

function RenderDish({dish}) {
    
  
   console.log(dish);
    if (dish != null)
      return (
        <Card>
           <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
}
//Se le pasa la accion y el id
function RenderComments({comments, postComment, dishId}) {



  console.log(comments);
  if (comments !== null) {
    return (
      <ul className="list-unstyled">
        <h4>Comments</h4>
        {comments.map((comment) => (
          <li>
            {comment.comment}
            <p>
              -- {comment.author},{" "}
              {new Date(comment.date).toDateString().slice(4)}
            </p>
          </li>
        ))}
       
            {/* Se el pasa el id y la accion */}
        {/* <CommentForm dishId={dishId} addComment={addComment} /> */}

        <CommentForm dishId={dishId} postComment={postComment} />
    

      </ul>   
      
       

    );
  } else return <div></div>;
  
}


const  DishDetail = (props) => {

      //si esto es true se retorna true
        if (props.isLoading) {
          return(
              <div className="container">
                  <div className="row">            
                      <Loading />
                  </div>
              </div>
          );
      }
      else if (props.errMess) {
          return(
              <div className="container">
                  <div className="row">            
                      <h4>{props.errMess}</h4>
                  </div>
              </div>
          );
      }
      else if (props.dish != null) 
 //si esta todo ok muestra el dishdetal

  
  return (
    <div className="container">
    <div className="row">
        <Breadcrumb>

            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
        </div>                
    </div>
    <div className="row">
        <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} 
             //   addComment={props.addComment}  // Se le pasa la accion y el id
                  postComment={props.postComment}
                dishId={props.dish.id}

            />
        </div>
    </div>
    </div>
);
  }

export default DishDetail;
