import React from "react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { Item } from '../components/Item';
import Example from "./Example";

import "./styles/Operations.css";
import "./styles/print.css";

export const Operations = ({
	turno,
	pay,
	setTurno,
	stack,
	handleRemoveStack,
	cleanNote,
	total,
	cash,
	handlePayment,
	cleanCash,
	updateCantidad
}) => {
	const handleSubmit = async () => {
		const response = await fetch('/api/world', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: null,
		});
		setTurno(1);
	};

	const getCantidad = () => {
		let cantidad = 0;
		stack.forEach(element => {
			cantidad += element.cantidad
		});
		return cantidad;
	}

	return (
		<div>
			<Item>
				{/** Header */}
				<Button onClick={handleSubmit} style={{ marginRight: 10 }} variant={"outlined"}>Iniciar Turno</Button>
				<Button style={{ marginRight: 10 }} variant={"outlined"}>Sin Turno</Button>
				<Chip style={{ marginRight: 10, fontWeight: "bolder" }} label={`Turno No. ${turno}`} />
				<Divider style={{ margin: "5px 0" }} />

				{/** Body */}
				<div style={{ minHeight: "200px" }}>
					{stack?.map((item) => (
						<Chip key={item.id} style={{ margin: "5px", fontWeight: "bolder" }} label={<><span style={{ marginRight: 10 }}>{item.label}</span><input disabled style={{ width: 50 }} type="number" onChange={() => updateCantidad(item)} value={item.cantidad} /></>} variant="outlined" onDelete={() => handleRemoveStack(item)} />
				))}
				</div>
				<Divider style={{ margin: "5px 0" }} />

				{/** Footer */}
				<Button style={{ marginRight: 10 }} onClick={() => cleanNote()} variant={"outlined"}>Limpiar Nota</Button>
				<Chip style={{ marginRight: 10, fontWeight: "bolder" }} label={`No. Artículos ${getCantidad() || 0}`} />
				<Chip style={{ marginRight: 10, fontWeight: "bolder" }} label={`Total a pagar $${total || 0}`} />

				<Divider style={{ margin: "5px 0" }} />

				<Button onClick={() => handlePayment(500)} style={{ marginRight: 10 }} variant={"outlined"}>500</Button>
				<Button onClick={() => handlePayment(200)} style={{ marginRight: 10 }} variant={"outlined"}>200</Button>
				<Button onClick={() => handlePayment(100)} style={{ marginRight: 10 }} variant={"outlined"}>100</Button>
				<Button onClick={() => handlePayment(50)} style={{ marginRight: 10 }} variant={"outlined"}>50</Button>
				<Button onClick={() => handlePayment(20)} style={{ marginRight: 10 }} variant={"outlined"}>20</Button>

				<Divider style={{ margin: "5px 0" }} />

				<Button onClick={() => handlePayment(10)} style={{ marginRight: 10 }} variant={"outlined"}>10</Button>
				<Button onClick={() => handlePayment(5)} style={{ marginRight: 10 }} variant={"outlined"}>5</Button>
				<Button onClick={() => handlePayment(2)} style={{ marginRight: 10 }} variant={"outlined"}>2</Button>
				<Button onClick={() => handlePayment(1)} style={{ marginRight: 10 }} variant={"outlined"}>1</Button>
				<Button onClick={() => handlePayment(.5)} style={{ marginRight: 10 }} variant={"outlined"}>.5</Button>

				<Divider style={{ margin: "5px 0" }} />
				<TextField
					id="outlined-number"
					label="Pago"
					type="number"
					style={{ marginTop: 30, marginRight: 50 }}
					InputLabelProps={{
						shrink: true,
					}}
					value={cash}
				/>
				<TextField
					id="outlined-number"
					label="Cambio"
					type="number"
					value={cash >= total ? cash - total : 0}
					style={{ marginTop: 30, fontWeight: "bold" }}
					InputLabelProps={{
						shrink: true,
					}}
				/>

				<Divider style={{ margin: "5px 0" }} />
				<Example pay={pay} stack={stack} cash={cash} total={total}  />
				<Button onClick={() => cleanCash()} style={{ margin: 20 }} variant={"outlined"}>Limpiar Cantidad</Button>
			</Item>
		</div>
	);
};

