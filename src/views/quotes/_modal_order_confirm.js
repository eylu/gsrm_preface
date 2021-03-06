import React, { Component } from "react";

import _ from "lodash";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import classnames from 'classnames';

import noticeShow from "../../utils/notice";
import QuoteTable from "../components/_quote_table";


export default class ModalOrderConfirm extends Component {
  constructor(props) {
    super(props);


  }

  componentDidMount() {
    // console.log(this.props)
  }

  orderSubmit() {
    console.log(this.props.orderFormData)
    this.props.toggleModal();
    this.props.toggleOrderModal();
    setTimeout(() => {
      noticeShow('Data has pushed.');
    }, 0.6 * 1000);
  }


  render() {

    let title = titleMap[this.props.quoteType];

    return(
      <Modal isOpen={this.props.isOpen}
             toggle={() => this.props.toggleModal()}
             centered={true}
             className="modal-full"
             >
        <ModalHeader className="p0" toggle={() => this.props.toggleModal()}>
          <span className="txt">{title}</span>
        </ModalHeader>
        <ModalBody className="p0">
          <div className="page-confirm">
            <h1 className="page-confirm-head">
              Confirm your order
            </h1>
            <h3 className="page-confirm-sub-head">American Lobster</h3>
            <div className="mb-5">
              <div className="gs-tag mr-1">UNITED STATES</div>
              <div className="gs-tag">3-5 DELIVERY</div>
            </div>
            <div className="text-left">
              <QuoteTable type={this.props.quoteType} data={this.props.orderFormData.orderItems} />
            </div>
            <hr />
            <div className="text-right">
              <div className="fs-16 fw-600">${(this.props.orderFormData.total_money||0).toFixed(2)}</div>
              <div className="fs-12">TOTAL PRICE</div>
            </div>
            <div className="page-confirm-buttons">
              <Button color="primary" size="lg" block onClick={() => this.orderSubmit()}>
                CONFIRM
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export const titleMap = {
  'sell': "PURCHASE CONFIRMATION",
  'buy': "SELL CONFIRMATION",
};

