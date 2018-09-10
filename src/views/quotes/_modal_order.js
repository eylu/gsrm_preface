import React, { Component } from "react";

import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

import _ from "lodash";
import { Button, Badge, Table, Modal, ModalHeader, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import QuoteTable from "../components/_quote_table";


class ModalOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'tab1'
    };
  }

  componentDidMount() {
    // console.log(this.props)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  orderSubmit() {
    this.props.toggleModal();
    this.props.toggleConfirmModal();
  }


  render() {
    let pushTip = pushMap[this.props.quoteType];
    let listTitle = listTitleMap[this.props.quoteType];

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
                  <QuoteTable type={this.props.quoteType} />
                </div>
                <div className="flex1 quote-modal-item quote-modal-form gs-form">
                  <div className="fields">
                    <div className="field">
                      <label className="input-title d-flex align-items-center">
                        <div className="flex1">Size</div>
                        <div className="input-title-tip">30 lb/box</div>
                      </label>
                      <input className="input" value="1 - 1.25 lb" readOnly />
                    </div>
                  </div>
                  <div className="fields">
                    <div className="field">
                      <label className="input-title">
                        Boxes
                      </label>
                      <div>
                        <input className="input" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 pb-5">
                    {[10, 12, 41].map((item, i) => {

                      return (
                        <div className="row mb-2 fs-16 fw-500" key={i}>
                          <div className="col col-3">
                            {item} <span className="fs-18">Boxes</span>
                          </div>
                          <div className="col col-2 text-right">
                            {item * 30} <span className="fs-12">lb</span>
                          </div>
                          <div className="col col-4 text-right">
                            @ $ 10.00 <span className="fs-12">lb</span>
                          </div>
                          <div className="col col-3 text-right">
                            $ {(item * 30 *10).toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                    <hr className="strong" />
                    <div className="row fs-18 fw-500">
                      <div className="col col-3">
                        150 Boxes
                        <div className="fs-12 fw-400 color-info-dark">TOTAL BOXES</div>
                      </div>
                      <div className="col col-2 text-right">
                        1500 lb
                        <div className="fs-12 fw-400 color-info-dark">TOTAL VOL.</div>
                      </div>
                      <div className="col col-4 text-right">
                        $ 10.00 lb
                        <div className="fs-12 fw-400 color-info-dark">AVG PRICE</div>
                      </div>
                      <div className="col col-3 fw-600 text-right">
                        $ 15,000.00
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
  'seller': "SELLERS",
  'buyer': "BUYERS",
};
export const pushMap = {
  'seller': "OFFER OWN PRICE",
  'buyer': "ASKING PRICE",
};
