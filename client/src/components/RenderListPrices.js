import React from "react";

export const RenderListPrices = ({ list, title, onChange, keye }) => (
    <React.Fragment>
        <h1>{title}</h1>
        {list?.length ? list.map((item, index) => (
            <div key={item.id}>
                <span>{item.label}</span>
                <input type="number" value={item.props.price} onChange={(e) => onChange(e, item, keye, index)} />
            </div>
        )) : null}
    </React.Fragment>
);
