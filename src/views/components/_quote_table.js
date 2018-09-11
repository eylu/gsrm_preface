import React, { Component } from "react";
import { Button, Badge, Table, Modal, ModalHeader, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import _ from "lodash";

export default class QuoteTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instantItem: null,
    };
  }

  quoteItemClick(quote, key) {
    console.log(key, quote);
    this.setState({
      instantItem: quote,
    });
  }


  renderItemList(list){
    if(_.isEmpty(list)) {
      return(
        <tbody>
          <tr>
            <td colSpan="4">
              <div className="gs-empty">No data.</div>
            </td>
          </tr>
        </tbody>
      );
    }

    return(
      <tbody>
        {
          _.map(this.props.data, (quote, key) => {
            let button = null;
            if(this.props.forsingle) {
              button = (
                <td className="text-right">
                  <Button outline color="secondary" size="sm" className="btn-mini" onClick={() => this.quoteItemClick(quote, key)}>Instant Sell</Button>
                </td>
              );
            }
            return (
              <tr key={key} className={this.state.instantItem && this.state.instantItem._key == quote._key ? 'active': ''}>
                <td>
                  <span>Verified User</span>
                  <span className="gs-tag gs-tag-outer purple ml-3">
                    4.8
                  </span>
                </td>
                <td>
                  <span>${quote.price.toFixed(2)}</span>
                  <span className="fs-10"> lb</span>
                </td>
                <td className="text-right">
                  {quote.boxes}
                </td>
                <td className="text-right">
                  <span>{quote.volumn || quote.volume}</span>
                  <span className="fs-10"> lb</span>
                </td>
                {button}
              </tr>
            );
          })
        }
      </tbody>
    );

  }

  render() {
    let priceTip = priceMap[this.props.type];
    let classWrapper = classnames('quote-list-table', this.props.className);


    return (
      <div className={classWrapper}>
        <Table borderless responsive>
          <thead className="gs-table-thead-small">
            <tr>
              <td>COMPANY</td>
              <td>{priceTip}</td>
              <td className="text-right">BOXES</td>
              <td className="text-right">VOLUMN</td>
            </tr>
          </thead>
          {this.renderItemList(this.props.data)}
        </Table>
      </div>
    );
  }
}

const priceMap = {
  sell: "ASKING PRICE",
  buy: "OFFER PRICE",
};