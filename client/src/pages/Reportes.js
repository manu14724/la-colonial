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

    const limpiarReporte = async () => {
    const r = await fetch('/api/newReporte', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reportes: [] }),
    });
      setTempReport({ reportes: [] });
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

  const isValid = pass === "";

  return (
    <div style={{ margin: "50px 200px" }}>
      {!isValid && <input placeholder="Contraseña" type="password" value={pass} onChange={onChange} />}
      <input style={{ marginLeft: 5 }} type="button" value={"Salir"} onClick={() => setPass("")} />
      <button style={{ margin: "20px 30px", background: "red", color: "white" }} onClick={limpiarReporte}>Borrar reporte</button>
      {isValid && (
        <div>
          <h3>Venta Total: ${getTotal().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
          <h3>Total de tickets emitidos: {tempReport?.reportes?.length}</h3>
        </div>
      )}
      {isValid ?
        <div style={{ marginTop: 10, marginBottom: 20 }}>
          <DatePicker style={{ marginBottom: 20 }} selected={startDate} onChange={(date) => handleChangeDate(date)} />
        {tempReport.reportes?.map((item, index) => (
          <div key={index} style={{ margin: 20 }}>
            <span>Total Ticket: <b>${item.total}</b></span>
            <span style={{ margin: "0 10px" }}>-</span>
            <span style={{ marginRight: 30, fontWeight: 400 }}><b>Hora de venta: </b>{item.fechaInfo || item.fecha}</span>
            <span style={{ marginRight: 30, fontWeight: 400 }}><b>Turno: </b>{item.turno || null}</span>
            <Divider style={{ margin: "5px 0" }} />
          </div>
        ))}
      </div> : null}
    </div>
  );
};