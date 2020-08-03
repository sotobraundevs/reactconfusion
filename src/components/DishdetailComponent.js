import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    constructor(props) {

        super(props);

    }
    

    render() {
        const {selectedDish} = this.props
        return(
            <React.Fragment>
            <div className="col-12 col-md-5 m-1">
            <Card>
            <CardImg width="100%" object src={selectedDish.image} alt={selectedDish.name}/>
            <CardBody>
              <CardTitle>{selectedDish.name}</CardTitle> 
              <CardText>{selectedDish.description}</CardText>      
            </CardBody>
                   
           </Card>
           </div>
           <div className="col-12 col-md-5 m-1">
               <h1>comments</h1>
               {selectedDish.comments.map((comment)=>{
                   var date = new Date(comment.date)
                   var month = date.toLocaleString('default', {month: 'short'});
                   var year = date.getFullYear()
                   var datenum = date.getDate()
                   return (
                       <div>
                           <p>{comment.comment}</p>
                           <p>--{month},{datenum},{year}</p>
                        </div>   
                   )
               }
                )}
           </div>
           </React.Fragment>

        );
    }
}
export default Dishdetail;