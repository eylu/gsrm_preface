import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log(this.props)
  }

  render() {
    return (
      <div>
        Home Page.
        <div>
          <Link to="dashboard">
            Dash
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  console.log(state)
  return {
    quotes: state.firebase.data.quotes,
  }
}

export default compose(
  firebaseConnect(props => {
    return [
      "quotes"
    ];
  }),
  connect(mapStateToProps)
)(Home);
