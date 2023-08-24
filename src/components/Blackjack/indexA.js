import React, { useState, useEffect, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';

const Blackjack = () => {
    const [flag, setFlag] = useState(false);
    const [wagerValue, setWagerValue] = useState(0);
    const [wagerErr, setWagerErr] = useState('Enter wager below, then click DEAL button to begin playing');
    const [dealerHandDisplay, setDealerHandDisplay] = useState('');
    const [userHandDisplay, setUserHandDisplay] = useState('');
    const userHand = useRef([]);
    const numUsers = 1;
    const dealerHand = useRef([]);
    
    const deckArr = [
        '2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AD',
        '2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH',
        '2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC',
        '2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS'
    ]
    const shuffleDeck = useRef(deckArr);

    const deal = () => {
        if (wagerValue >= 1){
            setFlag(true);
            for (let i = 0; i < deckArr.length; i++){
                let x = Math.floor(Math.random() * (deckArr.length));
                let temp = shuffleDeck.current[i];
                shuffleDeck.current[i] = shuffleDeck.current[x];
                shuffleDeck.current[x]=temp;
            }
            console.log(shuffleDeck.current)

            if (numUsers===1){
                for (let i=0; i<=numUsers; i++){
                    // setUserHand(userHand.push(shuffleDeck.current[0]));
                    userHand.current.push(shuffleDeck.current[0]);
                    shuffleDeck.current.shift();
                    dealerHand.current.push(shuffleDeck.current[0]);
                    shuffleDeck.current.shift();
                }
            }
            console.log(userHand.current);
            console.log(dealerHand.current);
            console.log(shuffleDeck.current);
            setDealerHandDisplay(dealerHand.current[0]+ ' - X');
            setUserHandDisplay(userHand.current)
        } else{
            setWagerErr('Minimum bet $1')
        }
    }

    const hit = () =>{
        let userHandSum = 0;
        for(let i=0; i<userHand.current.length; i++){
            let userHandInt = userHand.current[i].replace(/[^0-9]/g,'');
            parseInt(userHandInt)
            userHandSum = userHandInt + userHandSum;
        }
        console.log(userHandSum)
        userHand.current.push(shuffleDeck.current[0]);
        shuffleDeck.current.shift();
        setUserHandDisplay(userHand.current)
        console.log(userHand.current);
        console.log(shuffleDeck.current);
    }

    const stand = () => {
        console.log('stand');
    }

    const double = () => {
        console.log('double');
    }

    const split = () => {
        console.log('split');
    }

    return (
        <Container>
            <div className='my-2'>
                <h1>BLACKJACK</h1>
                <div>
                    {!flag
                        ?
                        <>
                            <h2>{wagerErr}</h2>
                            <input
                                name='wagerValue'
                                type = 'int'
                                value={wagerValue}
                                onChange={(e) => setWagerValue(e.target.value)}
                                size='lg'
                                placeholder='minimum $1 bet'    
                            />
                            <Button type='submit' variant='success' onClick={deal}>DEAL</Button>
                        </>
                        :
                        <>
                            <h2>Dealer Hand: {dealerHandDisplay}</h2>
                            <h2>Your Hand: {userHandDisplay}</h2>
                            <h2>Your Bet: ${wagerValue.current}</h2>
                            <Button type='submit' onClick={hit}>HIT</Button>
                            <Button type='submit' onClick={stand}>STAND</Button>
                            <Button type='submit' onClick={double}>DOUBLE</Button>
                            <Button type='submit' onClick={split}>SPLIT</Button>
                        </>
                    }
                </div>
            </div>
        </Container>
    )
}
export default Blackjack;