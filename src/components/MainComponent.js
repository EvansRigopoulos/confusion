import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponents';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Footer from './Footer.Component';
import Contact from './ContactComponent';
import About from './AboutComponent'
import  {connect} from 'react-redux';
import { Switch, Route, Redirect,withRouter} from 'react-router-dom';
import { DISHES } from '../shared/dishes';
import {addComment,fetchDishes} from '../redux/ActionCreators';


const mapStateToProps = state => {
 return {
     dishes:state.dishes,
     comments: state.comments,
     promotions :state.promotions,
     leaders: state.leaders
 }       
}


const mapDispatchToProps = (dispatch) => ({
  
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes:() => {dispatch(fetchDishes())}
  });
class Main extends Component {

    constructor(props) {
        super(props);
   

    }

  componentDidMount(){
      this.props.fetchDishes();
      /*At the point after it gets 
      mounted the fetchDishes will 
      be called and this will result 
      in a call to fetch the dishes and then 
      load it into my redux's store at the point, 
      and then when that becomes available, 
      then it'll become available for my application.*/
  }
    render() {

  
        const HomePage = () => {
            return(
                <Home 
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
          }
          const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                  isLoading={this.props.dishes.isLoading}
                  errMess={this.props.dishes.errMess}
                  comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                  addComment={this.props.addComment}
                />
            );
          };
        const Leaders = () =>{
            return(
                <About leaders={this.props.leaders} />
            )
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />           
                    <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />          
                    <Route exact path='/contactus' component={Contact} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        )

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));