import React, { Component } from "react";
import { Button, Badge, Table, Modal, ModalHeader, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

export default class QuoteTable extends Component {
  constructor(props) {
    super(props);
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
          <tbody>
            <tr>
              <td>
                <span>BigShift</span>
                <span className="gs-tag gs-tag-outer purple ml-3">
                  4.8
                </span>
              </td>
              <td>
                <span>$12.55</span>
                <span className="fs-10"> lb</span>
              </td>
              <td className="text-right">20</td>
              <td className="text-right">
                <span>600</span>
                <span className="fs-10"> lb</span>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

const priceMap = {
  seller: "ASKING PRICE",
  buyer: "OFFER PRICE",
};