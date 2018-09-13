import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

import _ from "lodash";
import { Button, Badge, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import classnames from 'classnames';

import noticeShow from "../../utils/notice";
import { quoteType, sizes } from "../../config/enum";
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
      quoteSize: {
        selected: sizes[0] || {},
      },
      orderFormData: {},
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

  changeSize(size, index) {
    let { quoteSize } = this.state;
    quoteSize.selected = size;
    this.setState(quoteSize);
  }

  setOrderFormData(formData) {
    let { orderFormData } = this.state;
    this.setState({
      orderFormData: formData,
    });
  }


  render() {
    let quotesHash = this.props.quotes || {};
    let quotesBuyer = [];
    let quotesSeller = [];
    _.each(quotesHash, (val, key) => {
      let quote = Object.assign({}, val, {_key: key});
      let matchSize = this.state.quoteSize.selected.id == val.size_id;
      if(quote.type == quoteType.buy && matchSize){
        quotesBuyer.push(quote);
      }
      if(quote.type == quoteType.sell && matchSize){
        quotesSeller.push(quote);
      }
    });

    quotesBuyer = _.reverse(_.sortBy(quotesBuyer, function(a){
      return a.price
    }));

    quotesSeller = _.sortBy(quotesSeller, function(a){
      return a.price
    });

    let quotesBuyerShow = _.take(quotesBuyer, 10);
    let quotesSellerShow = _.take(quotesSeller, 10);


    return (
      <div className="gs-page quote-show-page">
        <div className="quote-header">
          <div className="d-flex">
            <h1 className="gs-page-title">
              American Lobster
            </h1>
            <Image className="gs-avator ml-3" source="categories/abalone" />
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
                <div className="quote-sizes-title">SIZES</div>
                <div className="quote-sizes-list">
                  {sizes.map((size, i) => {
                    let sizeItemClass = classnames('size', {
                      "active": this.state.quoteSize.selected.id == size.id,
                    });
                    return (
                      <div className={sizeItemClass} key={i} onClick={() => this.changeSize(size, i)}>
                        <div className="size-bg">
                          <span className="label">{size.label}</span>
                          <span className="max-price">
                            ${size.last_price} lb
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex1">
              <h2 className="gs-page-sub-title mb-4">EXCHANGE</h2>
              <div className="d-flex mb-5">
                <div className="flex1" style={{marginRight: 32}}>
                  <div className="quote-list">
                    <div className="quote-list-title">
                      BUYERS
                    </div>
                    <div className="quote-list-banner success">
                      <div className="d-flex align-items-center">
                        <div className="flex1">
                          <div className="tip">HIGHEST OFFER PRICE</div>
                          <div className="price">${this.state.quoteSize.selected.max_price.toFixed(2)}</div>
                        </div>
                        <Button onClick={() => this.toggleOrderModal('buy')}>
                          SELL
                        </Button>
                      </div>
                    </div>
                    <QuoteTable type="buy" className="px-3 pt-3" data={quotesBuyerShow} />
                    <div className="quote-list-more">
                      <span onClick={() => this.toggleOrderModal('buy')}>More</span>
                    </div>
                  </div>
                </div>
                <div className="flex1">
                  <div className="quote-list">
                    <div className="quote-list-title">
                      SELLERS
                    </div>
                    <div className="quote-list-banner purple">
                      <div className="d-flex align-items-center">
                        <div className="flex1">
                          <div className="tip">LOWEST ASKING PRICE</div>
                          <div className="price">${this.state.quoteSize.selected.min_price.toFixed(2)}</div>
                        </div>
                        <Button onClick={() => this.toggleOrderModal('sell')}>
                          BUY
                        </Button>
                      </div>
                    </div>
                    <QuoteTable type="sell" className="px-3 pt-3" data={quotesSellerShow}  />
                    <div className="quote-list-more">
                      <span onClick={() => this.toggleOrderModal('sell')}>More</span>
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
                  <Image className="" source="tmpimgs/chart" />
                </div>
              </div>

            </div>
          </div>
        </div>
        <ModalOrder isOpen={this.state.modalOrder.isOrderOpen}
                    quoteType={this.state.modalOrder.type}
                    quoteSize={this.state.quoteSize.selected}
                    quotesBuyer={quotesBuyer}
                    quotesSeller={quotesSeller}
                    toggleModal={() => this.toggleOrderModal()}
                    toggleConfirmModal={() => this.toggleConfirmModal()}
                    setOrderFormData={(formData) => this.setOrderFormData(formData)}
                    />
        <ModalOrderConfirm
                    isOpen={this.state.modalOrder.isConfirmOpen}
                    quoteType={this.state.modalOrder.type}
                    toggleOrderModal={() => this.toggleOrderModal()}
                    toggleModal={() => this.toggleConfirmModal()}
                    orderFormData={this.state.orderFormData}
                    />
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
