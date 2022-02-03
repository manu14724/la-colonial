import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Divider from "@mui/material/Divider";
const { format } = require("date-fns");

import "react-datepicker/dist/react-datepicker.css";



export const Reportes = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [reportes, setReportes] = useState([]);
  const [pass, setPass] = useState("");

  const callApi = async () => {
    const respReporte = await fetch('/api/reporte');
    const bodyReporte = await respReporte.json();
    setReportes(bodyReporte || []);
  } 

  useEffect(() => {
    callApi();
  }, []);

  const getTotal = () => {
    let total = 0;
    reportes?.reportes?.forEach(item => total = total + item.total);
    return total;
  }

  const onChange = ({ target }) => {
    setPass(target.value)
  }

  const isValid = pass === "colonial12345";

  return (
    <div style={{ margin: "50px 200px" }}>
      {!isValid && <input placeholder="Contraseña" type="password" value={pass} onChange={onChange} />}
      <input style={{ marginLeft: 5 }} type="button" value={"Salir"} onClick={() => setPass("")} />
      {/*<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />*/}
      {isValid && <h3>Venta Total: ${getTotal()}</h3>}
      {isValid ?
      <div style={{ marginTop: 30 }}>
        {reportes.reportes?.map((item, index) => (
          <div key={index} style={{ marginBottom: 20 }}>
            <span style={{ marginRight: 30 }}>{format(new Date(item.fecha), 'd/M/yyyy')}</span>
            <span>Total Ticket: <b>${item.total}</b></span>
            {item?.stack?.map((item, index) => (
              <div key={index}>
                <span style={{ marginRight: 30, marginLeft: 50 }}>{item.label}</span>
                <span style={{ marginRight: 30 }}>Cantidad: {item.cantidad}</span>
                <span>Total: ${item.props.price * item.cantidad}</span>
              </div>
            ))}
            <Divider style={{ margin: "5px 0" }} />
          </div>
        ))}
      </div> : null}
    </div>
  );
};