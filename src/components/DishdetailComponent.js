import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  Media,
} from "reactstrap";



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
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish}/>
        </div>
        <div className="col-12 col-md-5 m-1">

        <RenderComments comments={props.selectedDish.comments} />
          {/* {this.renderComments(
            this.props.dishSelected === null
              ? null
              : this.props.dishSelected.comments
          )} */}
        </div>
      </div>
    );
  }

export default DishDetail;
