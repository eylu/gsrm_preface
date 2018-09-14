import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

import _ from "lodash";
import { Button } from "reactstrap";

import { quoteType } from "../../config/enum";

const quoteTypeArray = _.map(quoteType, (key, value) => { return value });

class Dashboard extends Component {
  constructor(props) {
    super(props);
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
    console.log(data);
    alert("submit data: " + JSON.stringify(data));
    this.props.firebase.push("quotes", data)
  }

  render() {
    return (
      <div>
        <div>Dashboard Page.</div>
        <Button
          color="danger"
          onClick={() => {
            this.addData();
          }}
        >
          Add Data
        </Button>
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
)(Dashboard);
