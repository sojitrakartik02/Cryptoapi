import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        Symbol: "$",
    });

    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'x-cg-demo-api-key' }
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("Throttled");
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }
            const data = await response.json();
            console.log(data); // Log the fetched data
            setAllCoin(data); // Set the fetched data to state
        } catch (err) {
            console.error(err.message);
            setAllCoin([]); // Set to an empty array in case of an error
        }
    };

    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    const contextValue = {
        allCoin, currency, setCurrency
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
