import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
const { format } = require("date-fns");
import Grid from '@mui/material/Grid';
import { RenderListPrices } from '../components/RenderListPrices';

import { Item } from '../components/Item';
 
import "./styles/Ventas.css";

export const Precios = () => {
  const [dta, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [pass, setPass] = useState("");

  const callApi = async () => {
    setIsLoading(true);
    const response = await fetch('/api/hello');
    const body = await response.json();
    setIsLoading(false);
    if (response.status !== 200) throw Error(body.message);
  
    return body;
    };
    
    const onChangePass = ({ target }) => {
    setPass(target.value)
    }
    
    const isValid = pass === "colonial12345";

  useEffect(() => {
    callApi()
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

    const onChange = (e, item, keye, index) => {
        dta[keye][index].props.price = parseInt(e.target.value, 10);
        setData({
            ...dta,
        })
    }

    const guardarPrecios = async () => {
        console.log(dta);
        const r = await fetch('/api/updatePrices', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...dta }),
    });
    }

  return isLoading ? <div>Cargando...</div> : (
      <div className="ventas-wrapper">
          {!isValid && <input placeholder="Contraseña" type="password" value={pass} onChange={onChangePass} />}
      <input style={{ marginLeft: 5 }} type="button" value={"Salir"} onClick={() => setPass("")} />
          {isValid ? (
          <Grid container spacing={2}>
        <Grid item xs={7} style={{ paddingRight: "15px" }}>
          <Item>
            <RenderListPrices onChange={onChange} keye="agua" title={"Agua"} list={dta.agua} />
            <RenderListPrices onChange={onChange} keye="italiana" title={"Italiana"} list={dta.italiana} />
            <RenderListPrices onChange={onChange} keye="paletas" title={"Paletas"} list={dta.paletas} />
            <RenderListPrices onChange={onChange} keye="chasca" title={"Chasca Fruta"} list={dta.chasca} />
            <RenderListPrices onChange={onChange} keye="frappuccino" title={"Frappuccino"} list={dta.frappuccino} />
            <RenderListPrices onChange={onChange} keye="helados" title={"Helados"} list={dta.helados} />
            <RenderListPrices onChange={onChange} keye="fresas" title={"Fresas"} list={dta.fresas} />
            <RenderListPrices onChange={onChange} keye="especiales" title={"Especiales"} list={dta.especiales} />
            <RenderListPrices onChange={onChange} keye="others" list={dta.others} />
                  </Item>
                  <Button onClick={() => guardarPrecios()} style={{ marginRight: 10 }} variant={"contained"}>Guardar</Button>
        </Grid>
      </Grid>
      ) : null}
          
    </div>
  );
};
