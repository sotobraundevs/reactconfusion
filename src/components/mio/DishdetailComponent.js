import React, { Component } from 'react';

import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';

class Dishdetail  extends Component {

  constructor(props) {
      super(props);    
  }

     
     render(){
      

      const menucoments = this.props.comments.map((comment) => {
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
  }



export default Dishdetail ;