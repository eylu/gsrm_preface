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

  addData() {
    let size_id = _.random(1, 9);
    let boxes = _.random(100, 150);
    let price = _.round(_.random(10.05, 25.99), 2);
    let t = _.sample(quoteTypeArray);
    const data = {
      price: price,
      boxes: boxes,
      volume: boxes * 30,
      size_id: size_id,
      type: t
    };
    console.log(data)
    this.props.firebase.push("quotes", data)
  }

  render() {
    let quotes = this.props.quotes || {};

    return (
      <div>
        <div className="d-none">
          Home Page.
          <Button
            color="danger"
            onClick={() => {
              this.addData();
            }}
          >
            Danger!
          </Button>
          <div>
            <span className="hello">这是测试样式</span>
          </div>
        </div>
        <QuoteShow />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
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
