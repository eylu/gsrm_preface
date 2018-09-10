import React, { Component } from "react";

import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

import _ from "lodash";
import { Button, Badge, Table, Modal, ModalHeader, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import { quoteType } from "../../config/enum";
import QuoteTable from "../components/_quote_table";


class ModalOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'tab1',
      fromData: {},
    };
  }

  componentDidMount() {
    // console.log(this.props)
  }

  getQuoteData(){
    return this.props.quoteType == quoteType.sell ? this.props.quotesSeller : this.props.quotesBuyer;
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  boxChangHandler(val) {
    console.log(val)
    let quantity =  parseInt(val);
    let quoteData = this.getQuoteData();
    let boxesSum = _.sumBy(quoteData, 'boxes');
    if(quantity > boxesSum){
      quantity = boxesSum;
      alert('Too much !!!');
    }

    let orderData = takeArrayBySum(quoteData, 'boxes', quantity);
    let { fromData } = this.state;
    fromData.orderItems = orderData;
    fromData.quantity = quantity;
    fromData.total_boxes = _.sumBy(orderData, 'boxes');
    fromData.total_volumn = _.sumBy(orderData, 'volumn');
    fromData.total_money = _.sumBy(orderData, function(it){ return it.volumn * it.price });

    this.setState({fromData});

  }

  orderSubmit() {
    this.props.setOrderFormData(this.state.fromData);
    // this.props.toggleModal();
    this.props.toggleConfirmModal();
  }


  render() {
    let pushTip = pushMap[this.props.quoteType];
    let listTitle = listTitleMap[this.props.quoteType];
    let quoteData = this.getQuoteData();

    return(
      <Modal isOpen={this.props.isOpen}
             toggle={() => this.props.toggleModal()}
             centered={true}
             className="modal-full"
             >
        <ModalHeader className="p0" toggle={() => this.props.toggleModal()}>
          <Nav className="gs-tab">
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'tab1' })}
                onClick={() => { this.toggle('tab1'); }}
              >
                MARKET PRICE
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'tab2' })}
                onClick={() => { this.toggle('tab2'); }}
              >
                {pushTip}
              </NavLink>
            </NavItem>
          </Nav>
        </ModalHeader>
        <ModalBody className="p0">
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="tab1">
              <div className="d-flex">
                <div className="flex1 quote-modal-item">
                  <div className="fs-20 fw-600 mb-3">
                    {listTitle}
                  </div>
                  <div className="modal-table">
                    <QuoteTable type={this.props.quoteType} data={quoteData} />
                  </div>
                </div>
                <div className="flex1 quote-modal-item quote-modal-form gs-form">
                  <div className="fields">
                    <div className="field">
                      <label className="input-title d-flex align-items-center">
                        <div className="flex1">Size</div>
                        <div className="input-title-tip">30 lb/box</div>
                      </label>
                      <input className="input" value={this.props.quoteSize.label} readOnly />
                    </div>
                  </div>
                  <div className="fields">
                    <div className="field">
                      <label className="input-title">
                        Boxes
                      </label>
                      <div>
                        <input className="input" placeholder="0" value={this.state.fromData.quantity} onChange={(e) => this.boxChangHandler(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 pb-5">
                    {(this.state.fromData.orderItems||[]).map((item, i) => {

                      return (
                        <div className="row no-gutters text-nowrap mb-2 fs-16 fw-500" key={i}>
                          <div className="col col-3">
                            {item.boxes} <span className="fs-18">Boxes</span>
                          </div>
                          <div className="col col-2 text-right">
                            {item.volumn} <span className="fs-12">lb</span>
                          </div>
                          <div className="col col-4 text-right">
                            @ $ {item.price} <span className="fs-12">lb</span>
                          </div>
                          <div className="col col-3 text-right">
                            $ {(item.price * item.volumn).toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                    <hr className="strong" />
                    <div className="row no-gutters text-nowrap fs-18 fw-500">
                      <div className="col col-3">
                        {this.state.fromData.total_boxes || 0} Boxes
                        <div className="fs-12 fw-400 color-info-dark">TOTAL BOXES</div>
                      </div>
                      <div className="col col-2 text-right">
                        {this.state.fromData.total_volumn || 0} lb
                        <div className="fs-12 fw-400 color-info-dark">TOTAL VOL.</div>
                      </div>
                      <div className="col col-4 text-right">
                        $ 10.00 lb
                        <div className="fs-12 fw-400 color-info-dark">AVG PRICE</div>
                      </div>
                      <div className="col col-3 fw-600 text-right">
                        $ {(this.state.fromData.total_money||0).toFixed(2)}
                        <div className="fs-12 fw-400 color-info-dark">TOTAL PRICE</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button color="primary" size="lg" block onClick={() => this.orderSubmit()}>
                      ORDER
                    </Button>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="tab2">
              Tab2
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    );
  }
}


export default compose(
  firebaseConnect(props => {
    return [
      "quotes"
    ];
  })
)(ModalOrder);

export const listTitleMap = {
  'sell': "SELLERS",
  'buy': "BUYERS",
};
export const pushMap = {
  'sell': "OFFER OWN PRICE",
  'buy': "ASKING PRICE",
};

function takeArrayBySum(list , key , sum = 0) {
  let result = [];
  (list||[]).forEach(function(item) {
    if(sum >= item[key]) {
      result.push(item);
    }
    if(sum < item[key] && sum > 0){
      let o = Object.assign({}, item)
      o[key] = sum;
      o.volumn = sum * 30;
      result.push(o);
    }
    sum -= item[key];
  });

  return result;
}