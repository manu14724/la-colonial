import React, { useEffect, useState } from 'react';
const { format } = require("date-fns");
import Grid from '@mui/material/Grid';
import { Operations } from '../components/Operations';
import { RenderList } from '../components/RenderList';
import { v4 as uuidv4 } from 'uuid';

import { Item } from '../components/Item';
 
import "./styles/Ventas.css";

export const Ventas = () => {
  const [dta, setData] = useState({});
  const [stack, setStack] = useState([]);
  const [turno, setTurno] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cash, setCash] = useState(0);

  const callApi = async () => {
    setIsLoading(true);
    const response = await fetch('/api/hello');
    const respTurno = await fetch('/api/turno');
    const body = await response.json();
    const bodyTurno = await respTurno.json();
    setTurno(bodyTurno?.turno);
    setIsLoading(false);
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  const cleanCash = () => setCash(0);

  const handlePayment = (amount) => {
    let total = cash + amount;
    setCash(total);
  };

  const pay = async () => {
    const response = await fetch('/api/newTurn', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ turno: turno + 1 }),
		});
		setTurno(turno + 1);
  }

  useEffect(() => {
    callApi()
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

  const handleClick = (item) => {
    const newItem = {
      ...item,
      uuid: uuidv4(),
    };
    setStack([
      ...stack,
      newItem,
    ]);
    const totalPrice = total + item.props.price;
    setTotal(totalPrice);
  }

  const handleRemoveStack = (item) => {
    const temp = [];
    for (let i = 0; i < stack.length; i++) {
      if (stack[i].uuid !== item.uuid) {
        temp.push(stack[i]);
      }
    }
    setTotal(total - item.props.price);
    setStack(temp);
  }

  const cleanNote = () => {
    setStack([]);
    setTotal(0);
    setCash(0)
  }

  return isLoading ? <div>Cargando...</div> : (
    <div className="ventas-wrapper">
      <Grid container spacing={2}>
        <Grid item xs={7} style={{ paddingRight: "15px" }}>
          <Item>
            <RenderList handleClick={handleClick} title={"Agua"} list={dta.agua} />
            <RenderList handleClick={handleClick} title={"Italiana"} list={dta.italiana} />
            <RenderList handleClick={handleClick} title={"Paletas"} list={dta.paletas} />
            <RenderList handleClick={handleClick} title={"Chasca Fruta"} list={dta.chasca} />
            <RenderList handleClick={handleClick} title={"Frappuccino"} list={dta.frappuccino} />
            <RenderList handleClick={handleClick} title={"Helados"} list={dta.helados} />
            <RenderList handleClick={handleClick} title={"Fresas"} list={dta.fresas} />
            <RenderList handleClick={handleClick} title={"Especiales"} list={dta.especiales} />
            <RenderList handleClick={handleClick} list={dta.others} />
          </Item>
        </Grid>
        
        <Grid item xs={5}>
          <Operations
            cash={cash}
            handlePayment={handlePayment}
            stack={stack}
            turno={turno}
            cleanNote={cleanNote}
            cleanCash={cleanCash}
            setTurno={setTurno}
            pay={pay}
            handleRemoveStack={handleRemoveStack}
            total={total} />
        </Grid>
      </Grid>
    </div>
  );
};