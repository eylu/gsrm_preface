import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

import _ from "lodash";
import { Button } from "reactstrap";

import { categories } from "../../config/enum";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log(this.props)
  }

  renderCategory(category, index) {
    return(
      <div key={index} className="category">
        <Link to={`/quotes/${category.id}`}>
          <h2 className="category-name">{category.name}</h2>
        </Link>
      </div>
    );
  }

  renderCategoryList() {
    return (
      <div className="category-list clearfix">
        {categories.map((category, i) => {
          return this.renderCategory(category, i);
        })}
      </div>
    );
  }



  render() {


    return (
      <div className="gs-page">
        {this.renderCategoryList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quotes: state.firebase.data.quotes
  };
}

export default compose(
  firebaseConnect(props => {
    return ["quotes"];
  }),
  connect(mapStateToProps)
)(Home);
