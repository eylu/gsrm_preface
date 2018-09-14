import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import find from "lodash/find";
import get from "lodash/get";
import result from "lodash/result";

class ModalOrderCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: [],
      dropdownOpen: false
    };
  }
  componentDidMount() {
    console.log(this.getSize());
    const size_id = get(this.getSize()[0], "id");
    console.log(size_id)
    if (!size_id) {
      return;
    }
    this.setState({ form: [{ size_id, price: 0, boxes: 0, volume: 0 }] });
  }

  onChange = (e, index) => {
    const key = e.target.name;
    const val = e.target.value;
    let { form } = this.state;
    form[index][key] = Number(val);
    if (key != "boxes") {
      this.setState({ form });
      return;
    }
    const volume = Number(val) * 30;
    form[index]["volume"] = volume;
    this.setState({ form });
  };

  getSize = () => {
    const { category } = this.props;
    return get(category, "attr_values", []);
  };

  renderSize = size_id =>
    result(
      find(this.getSize(), o => get(o, "id") === Number(size_id)),
      "value"
    );

  renderPriceScope = size_id => {
    const size = find(this.getSize(), o => get(o, "id") === Number(size_id));
    const max_price = get(size, "max_price");
    const min_price = get(size, "min_price");
    return (
      <div className="scope d-flex align-items-stretch">
        <div className="scope-item d-flex flex-column justify-content-center align-items-center">
          <span className="price">${max_price}</span>
          <span className="tit">HIGHEST OFFER</span>
        </div>
        <div className="scope-item d-flex flex-column justify-content-center align-items-center">
          <span className="price">${min_price}</span>
          <span className="tit">LOWEST ASK</span>
        </div>
      </div>
    );
  };

  renderRow = ({ size_id, price, boxes, volume }, index) => (
    <div
      key={index}
      className="d-flex flex-nowrap justify-content-between align-items-center row"
    >
      <div className="cell size flex-grow-1 flex-fill text-nowrap">
        {this.renderSize(size_id)}
      </div>
      <div className="w260 cell">
        <label className="input-title">Price</label>
        <input
          name="price"
          className="input"
          value={price}
          onChange={e => {
            this.onChange(e, index);
          }}
        />
      </div>
      <div className="w260 cell">
        <label className="input-title">Boxes</label>
        <input
          name="boxes"
          className="input"
          value={boxes}
          onChange={e => {
            this.onChange(e, index);
          }}
        />
      </div>
      <div className="d-none">{volume}</div>
      <div className="cell">{this.renderPriceScope(size_id)}</div>
    </div>
  );

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  addRow = o => {
    let { form } = this.state;
    form.push(Object.assign({}, o, { price: "", boxes: "", volume: "" }));
    this.setState({ form });
  };

  renderDropDownItem = ({ id, value }, index) => (
    <DropdownItem
      key={index}
      value={id}
      onClick={e => {
        this.addRow({ size_id: Number(e.target.value) });
      }}
    >
      {value}
    </DropdownItem>
  );

  renderDropDown = () => (
    <Dropdown
      isOpen={this.state.dropdownOpen}
      toggle={this.toggle}
      direction="up"
    >
      <DropdownToggle className="footer-btn drop-down">
        ADD A GRADE
      </DropdownToggle>
      <DropdownMenu>{this.getSize().map(this.renderDropDownItem)}</DropdownMenu>
    </Dropdown>
  );

  onSubmit = () => {
    const { form } = this.state;
    const { quoteType } = this.props;
    console.log(form, quoteType);
    form &&
      form.map(data => {
        this.props.firebase.push(
          "quotes",
          Object.assign({}, data, { type: quoteType, category_id: 1 })
        );
      });
  };

  render() {
    const { form } = this.state;
    return (
      <div className="form-create quote-modal-form">
        <form>
          {form.map(this.renderRow)}
          <div className="form-create-footer d-flex justify-content-between align-items-center">
            {this.renderDropDown()}
            <Button className="footer-btn submit" onClick={this.onSubmit}>
              MAKE OFFER PRICE
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quotes: state.firebase.data.quotes
  };
}

export default compose(
  firebaseConnect(props => {
    return ["quotes"];
  }),
  connect(mapStateToProps)
)(ModalOrderCreate);
