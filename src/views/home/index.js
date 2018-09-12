import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

import _ from "lodash";
import { Button } from "reactstrap";

import { quoteType } from "../../config/enum";
import QuoteShow from "../quotes/show";

const quoteTypeArray = _.map(quoteType, (key, value) => { return value });
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log(this.props)
  }



  render() {
    let quotes = this.props.quotes || {};

    return (
      <div>
        <div className="d-none">
          Home Page.
        </div>
        <QuoteShow />
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
