import React from "react";
import ReactToPrint from "react-to-print";

class ComponentToPrint extends React.Component {

  componentDidUpdate() {
    console.log(this.props.props);
  }

  render() {
    return (
      <div className='print-source'>
        <h1>La Colonial</h1>
        {this.props.props.stack.map(item => (
          <div key={item.uuid}>
            <span>{item.label}</span>
            <span>${item.props.price}</span>
          </div>
        ))}
        <h3>Su pago: ${this.props.props.cash}</h3>
        <h3>Su compra: ${this.props.props.total}</h3>
        <h3>Su cambio: ${this.props.props.cash - this.props.props.total}</h3>
      </div>
    )
  };
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">Pagar</a>}
          content={() => this.componentRef}
        />
        <ComponentToPrint props={this.props} ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example;
