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
//se agrega fetchDishes
import { addComment, fetchDishes } from '../redux/ActionCreators';
//Esto lo que va hacer es resetear el estado 
import { actions } from 'react-redux-form';

//make the action available for use within the DishdetailComponent 
const mapDispatchToProps = (dispatch) => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  
  // se crea esta nueva propiead para hacer dispach del Tunk fetchDishes
  //para dejarlos disponibles en el main component
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))} 
  
});

//Se definie aca por que es const y sirve para mapear el estado
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
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
  }
  
 


    render() {

      const HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}  //Tambien se pasa este por paramentro
                dishesErrMess={this.props.dishes.errMess} //Tambien se pasa este por paramentro
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
      }
  
      const DishWithId = ({match}) => {
        return(
            
          <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          
           isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}

          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          addComment={this.props.addComment} //se agrega la funcion
        />
        );
      };
  
      return (
        <div>
          <Header />
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
          </div>
          <Footer />
        </div>
    
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));