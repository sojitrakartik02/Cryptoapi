import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../Context/CoinContext';
import {Link} from 'react-router-dom';


const Home = () => {
    const { allCoin, currency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);

    useEffect(() => {
        console.log(allCoin); 
        setDisplayCoin(allCoin);
    }, [allCoin]);



    const [input,setInput]=useState('');

    const inputHandler=(event)=>{
        setInput(event.target.value);
        if(event.target.value===""){
            setDisplayCoin(allCoin)
        }
    }

const searchHandler =async (event)=>{
    event.preventDefault(); 
  const coins=  await allCoin.filter((item)=>{
        return item.name.toLowerCase().includes(input.toLowerCase())

    })
    setDisplayCoin(coins)
}


    return (
        <div className='home'>
            <div className="hero">
                <h1>Largest <br /> Crypto Marketplace</h1>
                <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
                <form onSubmit={searchHandler} action="">
                    <input list='coinlist' onChange={inputHandler} value={input} required type="text" placeholder='Search crypto' />

                    <datalist id='coinlist'>{allCoin.map((item,index)=>(
                        <option key={index} value={item.name} />))}
                   </datalist>





                    <button type='submit'>Search</button>
                </form>
            </div>
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: "center" }}>24H Change</p>
                    <p className='market-cap'>Market Cap</p>
                </div>
                {
                    displayCoin.slice(0, 10).map((item, index) => {
                        console.log(item); 
                        return (
                            <Link to={`/coin/${item.id}`} key={index} className="table-layout">
                                <p>{item.market_cap_rank}</p>
                                <div>
                                    <img src={item.image} />
                                    <p>{item.name +"-"+ item.symbol}</p>
                                </div>
                                <p>{currency.Symbol} {item.current_price.toLocaleString()}</p>
                                <p className={item.price_change_percentage_24h>0?"green":"red"}>
                                    {Math.floor(item.price_change_percentage_24h*100)/100}
                                </p>
                                <p className='market-cap'>{item.market_cap.toLocaleString()}
                                {currency.symbol}
                                </p>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Home;
