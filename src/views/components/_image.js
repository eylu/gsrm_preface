import React, { Component } from "react";
import classnames from 'classnames';


import imgAbalone from "../../assets/images/categories/abalone.png";
import imgChart from "../../assets/images/tmpimgs/chart.png";

export default class Image extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className = classnames(this.props.className);
    return (
      <div className={className}>
        <img src={imgMap[this.props.source]} />
      </div>
    );
  }
}

const imgMap = {
  "categories/abalone": imgAbalone,
  "tmpimgs/chart": imgChart,
};