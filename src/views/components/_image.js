import React, { Component } from "react";

import imgAbalone from "../../assets/images/categories/abalone.png";

export default class Image extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className = [this.props.className, "gs-avator"].join(' ');
    return (
      <div className={className}>
        <img src={imgAbalone} />
      </div>
    );
  }
}