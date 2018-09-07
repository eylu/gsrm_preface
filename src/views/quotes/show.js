import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

import _ from "lodash";
import { Button, Badge, Table } from 'reactstrap';

import { sizes } from "../../config/enum";
import Image from "../components/image";

class QuoteShow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log(this.props)
  }

  render() {
    let quotes = this.props.quotes || {};
    console.log(quotes);
    return (

      <div className="gs-page quote-show-page">
        <div className="quote-header">
          <div className="d-flex">
            <h1>
              American Lobster
            </h1>
            <Image className="ml-2" />
          </div>
          <div>
            <div className="gs-tag mr-1">UNITED STATES</div>
            <div className="gs-tag mr-1">SHANGHAI</div>
            <div className="gs-tag">3-5 DELIVERY</div>
          </div>
        </div>
        <div className="quote-body">
          <div className="d-flex">
            <div className="quote-sizes">
              {sizes.map((size, i) => {
                return (
                  <div className="size" key={i}>
                    <span className="label">{size.label}</span>
                    <span className="max-price">
                      $10.50 lb
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="pl-4 flex1">
              <h2>EXCHANGE</h2>
              <div className="quote-list">
                <div className="quote-list-title">
                  BUYERS
                </div>
                <div className="quote-list-banner success">
                  <div className="d-flex align-items-center">
                    <div className="flex1">
                      <div className="tip">HIGHEST OFFER PRICE</div>
                      <div className="price">$35.70</div>
                    </div>
                    <Button>
                      SELL
                    </Button>
                  </div>
                </div>
                <div className="quote-list-table">
                  <Table borderless>
                    <thead>
                      <tr>
                        <th>COMPANY</th>
                        <th>OFFER PRICE</th>
                        <th>BOXES</th>
                        <th>VOLUMN</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
            <div className="pl-4 flex1">
              <h2>&nbsp;</h2>
              <div className="quote-list">
                <div className="quote-list-title">
                  SELLERS
                </div>
                <div className="quote-list-banner purple">
                  <div className="d-flex align-items-center">
                    <div className="flex1">
                      <div className="tip">LOWEST ASKING PRICE</div>
                      <div className="price">$35.70</div>
                    </div>
                    <Button>
                      BUY
                    </Button>
                  </div>
                </div>
                <div className="quote-list-table">
                  xxx<br/>xxx<br/>xxx<br/>xxx<br/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state){
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
)(QuoteShow);
