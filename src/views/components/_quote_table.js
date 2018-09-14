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
    this.setState({
      instantItem: quote,
    }, () => {
      this.props.itemClickHandler(quote, key);
    });
  }

  cancelInstant(quote, key) {
    this.setState({
      instantItem: null,
    }, () => {
      this.props.itemClickHandler(null);
    });
  }

  renderTitle() {
    if(!this.props.title) {
      return;
    }
    return (
      <div className="gs-table-title">
        {this.props.title}
      </div>
    );
  }


  renderItemList(list){
    if(_.isEmpty(list)) {
      return(
        <div className="gs-table-body">
          <div className="gs-empty">No data.</div>
        </div>
      );
    }

    let instant = instantMap[this.props.type];

    return(
      <div className="gs-table-body">
        {
          _.map(this.props.data, (quote, key) => {
            console.log('--->',quote)
            let button = null;
            let close = <span className="btn-close">&nbsp;</span>;

            let isActive = this.state.instantItem && this.state.instantItem._key == quote._key;
            let rowClass = classnames('d-flex flex-nowrap row no-gutters', {
              'active': isActive,
              'grey': this.state.instantItem && this.state.instantItem._key != quote._key,
            });

            let instantText = isActive ? instantSingleMap[this.props.type] : instant;

            if(this.props.forsingle) {
              if(isActive) {
                close = (
                  <span className="btn-close" title="Cancel" onClick={() => this.cancelInstant(quote, key)}>&times;</span>
                );
              }
              button = (
                <div className="cell btns text-right">
                  <Button outline color="secondary" size="sm" className="btn-mini" onClick={() => this.quoteItemClick(quote, key)}>
                    {instantText}
                  </Button>
                  {close}
                </div>
              );
            }

            return (
              <div key={key} className={rowClass}>
                <div className="cell flex1">
                  <span>Verified User</span>
                  <span className="gs-tag gs-tag-outer purple ml-3">
                    4.8
                  </span>
                </div>
                <div className="cell price text-right">
                  <span>${Number(quote.price).toFixed(2)}</span>
                  <span className="fs-10"> lb</span>
                </div>
                <div className="cell boxes text-right">
                  {quote.boxes}
                </div>
                <div className="cell volumn text-right">
                  <span>{quote.volumn}</span>
                  <span className="fs-10"> lb</span>
                </div>
                {button}
              </div>
            );
          })
        }
      </div>
    );

  }

  render() {
    let priceTip = priceMap[this.props.type];
    let classWrapper = classnames('quote-list-table gs-table', this.props.className);

    return (
      <div className={classWrapper}>
        {this.renderTitle()}
        <div className="gs-table-header">
          <div className="d-flex row no-gutters">
            <div className="cell flex1">COMPANY</div>
            <div className="cell price text-right">{priceTip}</div>
            <div className="cell boxes text-right">BOXES</div>
            <div className="cell volumn text-right">VOLUMN</div>
            {
              this.props.forsingle ? (
                <div className="cell btns"></div>
              ) : ''
            }
          </div>
        </div>
        {this.renderItemList(this.props.data)}
      </div>
    );

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

const instantMap = {
  sell: "Instant Buy",
  buy: "Instant Sell",
};

const instantSingleMap = {
  sell: "Buying",
  buy: "Selling",
};


