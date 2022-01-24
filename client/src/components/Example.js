import React from "react";
import ReactToPrint from "react-to-print";

class ComponentToPrint extends React.Component {

  componentDidMount() {
    console.log(this.props.props);
    // this.props.props.pay();
  }
  

  render() {
    return (
      <div className='print-source'>
        <h1>La Colonial</h1>
        {this.props.props.stack.map(item => (
          <div key={item.uuid}>
            <h2>{item.cantidad + " - " + item.label + " $" + (item.props.price * item.cantidad)}</h2>
          </div>
        ))}
        <h3>Su pago: ${this.props.props.cash}</h3>
        <h3>Total de su compra: ${this.props.props.total}</h3>
        <h3>Su cambio: ${this.props.props.cash - this.props.props.total}</h3>
      </div>
    )
  };
}

class Example extends React.Component {
  render() {
    return (
      <div style={{ display: "inline-block" }}>    
        <ReactToPrint
          trigger={() => !!this.props.cash ? (
            <a
              href="#"
              style={{ fontSize: 35 }}
            >
              Pagar
            </a>
          ) : <span>Ingrese Pago</span>}
          onAfterPrint={() => this.props.pay()}
          content={() => this.componentRef}
        />
        <ComponentToPrint props={this.props} ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example;
