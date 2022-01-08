import React from "react";
import Button from '@mui/material/Button';

export const RenderList = ({ list, title, handleClick}) => (
    <React.Fragment>
        {list?.length ? list.map(item => (
            <span className={"button"} key={item.id}>
                <Button style={{ marginBottom: "10px" }} onClick={() => handleClick(item)} {...item.props}>{item.label}</Button>
            </span>
        )) : null}
    </React.Fragment>
);
