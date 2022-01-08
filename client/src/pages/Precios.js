import React, { useEffect, useState } from "react";

export const Precios = () => {
    const [dta, setData] = useState({});
    const [stack, setStack] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const callApi = async () => {
        setIsLoading(true);
        const response = await fetch('/api/hello');
        const body = await response.json();
        setIsLoading(false);
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    useEffect(() => {
        callApi()
            .then(res => setData(res))
            .catch(err => console.log(err));
    }, []);
    
    return (
        <div>
            hola
        </div>
    );
};

