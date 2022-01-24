import React from "react";
import ReactToPrint from "react-to-print";
import Divider from "@mui/material/Divider";

class ComponentToPrint extends React.Component {

  componentDidMount() {
    console.log(this.props.props);
    // this.props.props.pay();
  }
  

  render() {
    return (
      <div className='print-source'>
        <center><h1>La Colonial</h1></center>
        {this.props.props.stack.map(item => (
          <div key={item.uuid}>
            <h4 style={{ margin: 0 }}>{item.cantidad + " - " + item.label + " $" + (item.props.price * item.cantidad)}</h4>
          </div>
        ))}
        <Divider style={{ margin: "5px 0" }} />
        <h4>Su pago: ${this.props.props.cash}</h4>
        <h4>Total de su compra: ${this.props.props.total}</h4>
        <h4>Su cambio: ${this.props.props.cash - this.props.props.total}</h4>
        <Divider style={{ margin: "5px 0" }} />
        <h3>Gracias por su preferencia :)</h3>
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
