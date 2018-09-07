import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

import _ from "lodash";
import { Button } from "reactstrap";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log(this.props)
  }

  addData(data) {
    console.log(data);
    this.props.firebase.push("quotes", data)
  }

  render() {
    let quotes = this.props.quotes || {};
    const data = {
      price: 24.54,
      boxes: 120,
      volume: 3600,
      size_id: 1,
      type: "sell"
    };
    console.log('firebase',this.props.firebase)
    return (
      <div>
        Home Page.
        <div>
          <Button
            color="danger"
            onClick={() => {
              this.addData(data);
            }}
          >
            Danger!
          </Button>
          <div>
            <span className="hello">这是测试样式</span>
          </div>
          <ul>
            {_.map(quotes, function(quote, k) {
              return (
                <div key={k} data-key={k}>
                  {quote.a} - {quote.b}
                </div>
              );
            })}
          </ul>
        </div>
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
