import React, { Component } from "react";
import Menu from "./MenuComponents";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import Footer from "./FooterComponent";
import DishDetail from "./DishDetailComponent";
import AboutUs from "./AboutUsComponent";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { addComment, fetchDishes } from "../redux/ActionCreators";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

const mapDispatchToProps = dispatch => ({
  addComment(dishId, rating, author, comment) {
    dispatch(addComment(dishId, rating, author, comment));
  },
  fetchDishes() {
    dispatch(fetchDishes());
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter(promo => promo.featured)[0]}
          leader={this.props.leaders.filter(leader => leader.featured)[0]}
        />
      );
    };

    const DishWithId = ({ match }) => {
      const paramId = match.params.dishId;
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              dish => dish.id === parseInt(paramId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter(
            comment => comment.dishId === parseInt(paramId, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />} />
          <Route
            path="/aboutus"
            component={() => <AboutUs leaders={this.props.leaders} />}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
