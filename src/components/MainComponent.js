import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { TransitionGroup, CSSTransition } from 'react-transition-group';


//Esto lo que va hacer es resetear el estado 
import { actions } from 'react-redux-form';

//se agrega fetchDishes
import { fetchFeedbacks, postFeedback, postComment, addComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

//make the action available for use within the DishdetailComponent 
const mapDispatchToProps = (dispatch) => ({
  
  //addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)), 

  postFeedback: (feedbackId, firstname, lastname, telnum, email, agree, contactType,
    message) => dispatch(postFeedback(feedbackId, firstname, lastname, telnum, email, agree, contactType,
      message)), 
  
  // se crea esta nueva propiead para hacer dispach del Tunk fetchDishes
  //para dejarlos disponibles en el main component
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))} , 
//se agregan los nuevos
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()), 
  fetchLeaders: () => dispatch(fetchLeaders()), 
  fetchFeedbacks: () => dispatch(fetchFeedbacks())
  
});

//Se definie aca por que es const y sirve para mapear el estado
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders, 
    feedbacks: state.feedbacks
  }
}

class Main extends Component {

  constructor(props) {
    super(props);  
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();   
    this.props.fetchLeaders(); 
    this.props.fetchFeedbacks();
  }
  
 


    render() {

      const HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}  //Tambien se pasa este por paramentro
                dishesErrMess={this.props.dishes.errMess} //Tambien se pasa este por paramentro
                
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}                
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}
                
                leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMess={this.props.leaders.errMess}
            />
        );
      }
  
      const DishWithId = ({match}) => {
        return(
            
          <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          
           isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}

          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}         
          commentsErrMess={this.props.comments.errMess}
          //addComment={this.props.addComment} //se agrega la funcion
          postComment={this.props.postComment}
        />
        );
      };
  
      return (
        <div>
          <Header />

          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <div>
              <Switch location={this.props.location}>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => <Contact 
                                                                        resetFeedbackForm={this.props.resetFeedbackForm} 
                                                                        postFeedback={this.props.postFeedback}
                                                                        fetchFeedbacks={this.props.fetchFeedbacks}
                                                                    //    feedbacks={this.props.feedbacks.feedbacks.filter((feedback) => feedback.agree)[1]}
                                                                     //   feedbacksErrMess={this.props.feedbacks.errMess}

                                                                        />} />
                  <Redirect to="/home" />
              </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
          

{/* 
          <div>
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />} />
                <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                <Route path='/menu/:dishId' component={DishWithId} />
                                         
                <Route exact path='/contactus' component={() =>  // esto va hacer que resete el form
                <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                <Redirect to="/home" />
            </Switch>
          </div> */}
          <Footer />
        </div>
    
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));