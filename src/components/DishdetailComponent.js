import React, { Component } from 'react';

import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';

class Dishdetail  extends Component {

  constructor(props) {
      super(props);    
  }

     
     render(){
      
      if (this.props.dish != null) {

        
      const menucoments = this.props.dish.comments.map((comment) => {
        return (
          <div key= {comment.id} className="col-12 m-1">
        <ul class="list-unstyled">
            <li>{comment.comment}</li>
            <li>--{comment.author} ,  
            {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
                }).format(new Date(comment.date))}

            </li>
        </ul>    
              
            
          </div>

          
          
          
        );
    });
  

        return(

          <div className="container">
            <div className="row">{menucoments}</div>
            
          
          </div>
        )
     }

     else {
      //  block of code to be executed if the condition is false
      return(
        <div className="container">
        <div className="row"></div>
        
      
      </div>

      )

    }
    }

    
  }



export default Dishdetail ;