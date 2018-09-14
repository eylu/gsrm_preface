import React, { Component } from "react";
import classnames from 'classnames';

import imgLogo from "../../assets/images/logo.png";
import imgLobster from "../../assets/images/categories/lobster.png";
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
  "logo": imgLogo,
  "categories/lobster": imgLobster,
  "categories/abalone": imgAbalone,
  "tmpimgs/chart": imgChart,
};