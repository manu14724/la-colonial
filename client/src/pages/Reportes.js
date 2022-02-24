import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Divider from "@mui/material/Divider";
const { format } = require("date-fns");

import "react-datepicker/dist/react-datepicker.css";



export const Reportes = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [reporte, setReporte] = useState({ reportes: [] });
  const [pass, setPass] = useState("");
  const [tempReport, setTempReport] = useState({ reportes: [] });

  const filterReports = (date) => {
    let reps = [];
    reporte?.reportes?.forEach(item => {
      if (item.fecha == format(new Date(date) , 'd/M/yyyy')) {
        reps.push(item);
      }
    });
    return reps;
  }

  const callApi = async () => {
    const respReporte = await fetch('/api/reporte');
    const bodyReporte = await respReporte.json();
    setReporte(bodyReporte);
  } 

  useEffect(() => {
    callApi()
      .then(() => setTempReport({ reportes: filterReports(new Date())}));
  }, []);

  useEffect(() => {
    setTempReport({ reportes: filterReports(startDate)})
  }, [startDate])

  const handleChangeDate = (date) => {
    setStartDate(date);
  }

  const getTotal = () => {
    let total = 0;
    tempReport?.reportes?.forEach(item => total = total + item.total);
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
      {isValid && <h3>Venta Total: ${getTotal()}</h3>}
      {isValid ?
        <div style={{ marginTop: 10, marginBottom: 20 }}>
          <DatePicker style={{ marginBottom: 20 }} selected={startDate} onChange={(date) => handleChangeDate(date)} />
        {tempReport.reportes?.map((item, index) => (
          <div key={index} style={{ margin: 20 }}>
            <span style={{ marginRight: 30 }}>{item.fecha}</span>
            <span>Total Ticket: <b>${item.total}</b></span>
            <p style={{ marginRight: 30 }}>{item.stack}</p>
            <Divider style={{ margin: "5px 0" }} />
          </div>
        ))}
      </div> : null}
    </div>
  );
};