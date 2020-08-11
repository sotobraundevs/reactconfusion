import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



function RenderDish({dish}) {
    
  
   console.log(dish);
    if (dish != null)
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
}

function RenderComments({comments}) {
  
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
      </ul>
    );
  } else return <div></div>;
  
}

const  DishDetail = (props) => {
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
            <RenderComments comments={props.comments} />
        </div>
    </div>
    </div>
);
  }

export default DishDetail;
