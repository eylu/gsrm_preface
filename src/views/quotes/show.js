import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

import _ from "lodash";
import { Button, Badge, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { sizes } from "../../config/enum";
import Image from "../components/_image";
import QuoteTable from "../components/_quote_table";
import ModalOrder from "./_modal_order";
import ModalOrderConfirm from "./_modal_order_confirm";

class QuoteShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOrder: {
        isOrderOpen: false,
        isConfirmOpen: false,
        type: '',

      },
    };
  }

  componentDidMount() {
    // console.log(this.props)
  }

  toggleOrderModal(type) {
    let { modalOrder } = this.state;
    modalOrder.isOrderOpen = !modalOrder.isOrderOpen;
    if(type) {
      modalOrder.type = type;
    }
    this.setState(modalOrder)
  }

  toggleConfirmModal() {
    let { modalOrder } = this.state;
    modalOrder.isConfirmOpen = !modalOrder.isConfirmOpen;
    this.setState(modalOrder)
  }


  render() {
    let quotes = this.props.quotes || {};
    console.log(quotes);
    return (

      <div className="gs-page quote-show-page">
        <div className="quote-header">
          <div className="d-flex">
            <h1 className="gs-page-title">
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
            <div>
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
            </div>
            <div className="flex1 pl-4">
              <h2 className="gs-page-sub-title mb-4">EXCHANGE</h2>
              <div className="d-flex mb-5">
                <div className="flex1">
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
                        <Button onClick={() => this.toggleOrderModal('buyer')}>
                          SELL
                        </Button>
                      </div>
                    </div>
                    <QuoteTable type="buyer" className="px-3 pt-3" />
                    <div className="quote-list-more">
                      More
                    </div>
                  </div>
                </div>
                <div className="pl-4 flex1">
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
                        <Button onClick={() => this.toggleOrderModal('seller')}>
                          BUY
                        </Button>
                      </div>
                    </div>
                    <QuoteTable type="seller" className="px-3 pt-3" />
                    <div className="quote-list-more">
                      More
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="gs-page-sub-title mb-4">LATEST SALES OF AMERICAN LOBSTER</h2>
              <div>
                <div className="">
                  <div className="gs-tag mr-2">DAY</div>
                  <div className="gs-tag mr-2 transparent">WEEK</div>
                  <div className="gs-tag mr-2 transparent">MONTH</div>
                  <div className="gs-tag mr-2 transparent">YEAR</div>
                </div>
                <div className="quote-chart">

                </div>
              </div>

            </div>
          </div>
        </div>
        <ModalOrder isOpen={this.state.modalOrder.isOrderOpen} quoteType={this.state.modalOrder.type} toggleModal={() => this.toggleOrderModal()} toggleConfirmModal={() => this.toggleConfirmModal()} />
        <ModalOrderConfirm isOpen={this.state.modalOrder.isConfirmOpen} quoteType={this.state.modalOrder.type} toggleModal={() => this.toggleConfirmModal()} />
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
