import React, { useRef, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { deckArr, handSum, handCompare, dealerStrategy } from '../../utils/helpers';

const Blackjack = () => {
    const stand = useRef(false);
    const bust = useRef(false);
    const dealerStatus = useRef('');
    const doubleStatus = useRef(false);
    const userHand = useRef([[]]);
    const numUsers = 1;
    const dealerHand = useRef([]);
    const shuffleDeck = useRef(deckArr);
    const winCount = useRef({
        win: 0,
        lose: 0,
        push: 0
    });
    const gameData = useRef([])
    const totalHands = useRef(0);
    const [wagerValue, setWagerValue] = useState(0);
    const currentWager = useRef(0);
    const [rounds, setRounds] = useState(0);
    const bankValue = useRef(0);
    const handCount = useRef(0);
    
    const deal = () => {
        for (let i = 0; i < rounds; i++){
            console.log('***************DEAL***************')
            totalHands.current = totalHands.current+1;
            console.log('Current Hand#: ' + totalHands.current);
            userHand.current = [[]];
            dealerHand.current = [];
            dealerStatus.current = false;
            stand.current = false;
            bust.current = false;
            doubleStatus.current = false;
            currentWager.current = wagerValue;
            handCount.current = 0;
            gameData.current.push({
                userHand: '',
                dealerHand: '',
                result: ''
            })

            //refill deck if low
            // if (shuffleDeck.current.length<8){
                shuffleDeck.current = [
                    '2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AD',
                    '2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH',
                    '2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC',
                    '2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS',
                
                    '2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AD',
                    '2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH',
                    '2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC',
                    '2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS',
                
                    '2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AD',
                    '2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH',
                    '2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC',
                    '2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS',
                    
                    '2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AD',
                    '2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH',
                    '2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC',
                    '2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS',

                    '2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AD',
                    '2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH',
                    '2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC',
                    '2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS',
                
                    '2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AD',
                    '2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH',
                    '2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC',
                    '2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS',
                
                    '2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AD',
                    '2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH',
                    '2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC',
                    '2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS',
                    
                    '2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AD',
                    '2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH',
                    '2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC',
                    '2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS'
                ];
            // }
            //shuffle decks
            // if (shuffleDeck.current.length===312){
                for (let i = 0; i < deckArr.length; i++){
                    let x = Math.floor(Math.random() * (deckArr.length));
                    let temp = shuffleDeck.current[i];
                    shuffleDeck.current[i] = shuffleDeck.current[x];
                    shuffleDeck.current[x]=temp;
                }
            // }
    
            //deal cards
            for (let i=0; i<=numUsers; i++){
                userHand.current[handCount.current].push(shuffleDeck.current[0]);
                shuffleDeck.current.shift();
                dealerHand.current.push(shuffleDeck.current[0]);
                shuffleDeck.current.shift();
            }
            // console.log('User Hand: ' + userHand.current[handCount.current]);
        
            //values of dealer/user hands
            let userHandValue = handSum(userHand.current[handCount.current]);
            let dealerHandValue = handSum(dealerHand.current);
            //************************************************************************************** */
            if (userHandValue===21){
                console.log('USER BLACKJACK');
                currentWager.current = wagerValue*1.5;
                results(bust.current, dealerStatus.current, userHand.current[handCount.current]);
            } else{
                while ((!stand.current) || (!bust.current)){
                    if (doubleStatus.current === true){
                        break;
                    }
                    //split if basic strategy says so
                    checkSplit(userHand.current[handCount.current]);
        
                    //run basic strategy checks for hard totals first
                    if (handCount.current === 0){
                        basicStrategy(userHandValue, userHand.current[handCount.current]);
                    }
                   
                    if ((stand.current === true) || (bust.current === true)){
                        break;
                    }
                };
                
                //if the user had split their hand - check if they didn't bust so the dealer can hit
                for (let i=0; i<userHand.current.length; i++){
                    let userHandValue = handSum(userHand.current[i]);
                    if (userHandValue<21){
                        bust.current = false
                    }
                }
                //dealer hit or stand as long as user didn't bust yet
                if ((bust.current === false)){
                    while ((!dealerStatus.current) || (dealerStatus.current='hit')){
                        dealerHandValue = handSum(dealerHand.current);
                        dealerStatus.current = dealerStrategy(dealerHandValue);
                        if (dealerStatus.current === 'hit'){
                            dealerHit();
                        } else {
                            break;
                        }
                    }
                }
                for (let i=0; i<userHand.current.length; i++){
                    results(bust.current, dealerStatus.current, userHand.current[i]);
                    if (userHand.current.length > 1){
                        gameData.current[totalHands.current-1].userHand = 'Hand1: ' + userHand.current[0] + ' Hand2: ' + userHand.current[1] + ' Hand3: ' + userHand.current[2];
                        gameData.current[totalHands.current-1].dealerHand = dealerHand.current;
                    } else {
                        // let handNum = totalHands.current - 1;
                        // gameData.current[handNum].push()
                        gameData.current[totalHands.current-1].userHand = userHand.current[i];
                        gameData.current[totalHands.current-1].dealerHand = dealerHand.current;
                    }
                }
                
            }                
             
        }
    }
    //*************FUNCTIONS BELOW******************//
    const dealerHit = () => {
        dealerHand.current.push(shuffleDeck.current[0]);
        shuffleDeck.current.shift();
    }

    const hit = (thisHand) =>{
        //add card to user hand, remove from deck
        thisHand.push(shuffleDeck.current[0]);
        shuffleDeck.current.shift();
        if (thisHand.length === 2){
            checkSplit(thisHand)
        }
        //find hand values then check bust status
        let userHandValue = handSum(thisHand);


        //userHand.current.length ===1 used below in order to make sure user does not bust if they split and have another card to hit on
        if ((userHandValue > 21) && (userHand.current.length === 1)){
            bust.current = true;
        } else {
            if ((doubleStatus.current === true) && (userHand.current.length === 1)){
                stand.current = true;
            } else{
                basicStrategy(userHandValue, thisHand);
            }
        }
    }

    const double = (userHand) => {
        console.log('DOUBLE');
        doubleStatus.current = true;
        currentWager.current = wagerValue*2;
        hit(userHand);
    }

    const checkSplit = (thisHand) => {
        let cardOne = thisHand[0].slice(0,1);
        let cardTwo = thisHand[1].slice(0,1);
        let dealerUpCard = dealerHand.current[0].slice(0,1);
        if ((dealerUpCard === 'J') || (dealerUpCard === 'Q') || (dealerUpCard === 'K') || (dealerUpCard === 'A')){
        }else {
            dealerUpCard = Number(dealerUpCard);
        }
        if (cardOne === cardTwo){
            if ((cardOne === 'J') || (cardOne === 'Q') || (cardOne === 'K') || (cardOne === 'A')){
            }else {
                cardOne = Number(cardOne);
            }
            if ((cardOne === 'A') || (cardOne === 8)){
                split(thisHand);
            } else if ((cardOne === 1) || (cardOne === 5)){
                return;
            } else{
                if (((cardOne === 9) || (cardOne === 7) || (cardOne === 6) || (cardOne === 3) || (cardOne === 2)) && ((dealerUpCard < 7) && (dealerUpCard >= 2))){
                    split(thisHand);
                } else if ((cardOne === 9 ) && ((dealerUpCard === 8) || (dealerUpCard === 9))){
                    split(thisHand);
                } else if ((cardOne === 4) && ((dealerUpCard === 5) || (dealerUpCard === 6))){
                    split(thisHand);
                } else if (((cardOne === 7) || (cardOne === 3) || (cardOne === 2)) && (dealerUpCard === 7)){
                    split(thisHand);
                }
            }
        }
        return;
    };

    const split = (thisHand) => {
        console.log('-----------------------------SPLIT------------------------------');
        userHand.current.push([thisHand.pop()])

        for (let i=handCount.current; i<userHand.current.length; i++){
            hit(userHand.current[i]);
        }
        handCount.current++;
    }

    const basicStrategy = (userHandValue, userHand) => {
        if (userHandValue > 21){
            bust.current = true;
            return;
        }
        let dealerUpCard = dealerHand.current[0].slice(0,1);
        if ((dealerUpCard === 'J') || (dealerUpCard === 'Q') || (dealerUpCard === 'K') || (dealerUpCard === 'A')){
        }else {
            dealerUpCard = Number(dealerUpCard);
        }

        if ((userHand[0] === 'A') || (userHand[1] === 'A')){
            if (userHandValue === 20){
                stand.current = true;
            } else if (userHandValue === 19){
                if (dealerUpCard === 6) {
                    double(userHand);
                } else {
                    stand.current = true;
                }
            } else if (userHandValue === 18){
                if (dealerUpCard <= 6){
                    double(userHand);
                } else if ((dealerUpCard === 7) || (dealerUpCard === 8)){
                    stand.current = true;
                } else {
                    hit(userHand);
                }
            } else {
                if ((dealerUpCard >= 7) || (dealerUpCard === 2)){
                    hit(userHand);
                } else {
                    if ((dealerUpCard === 3) && (userHandValue <= 16)){
                        hit(userHand);
                    } else if ((dealerUpCard === 4) && (userHandValue <= 14)){
                        hit(userHand);
                    } else {
                        double(userHand);
                    }
                }
            }
        } else {
            if (userHandValue >= 17) {
                stand.current = true;
            } else if ((userHandValue >= 13) && (userHandValue < 17)) {
                if ((dealerUpCard>6) || (typeof(dealerUpCard) !== 'number') || (dealerUpCard===1)){
                    hit(userHand);
                } else {
                    stand.current=true;
                }
            } else if (userHandValue === 12) {
                if ((dealerUpCard === 2) || (dealerUpCard === 3)){
                    hit(userHand);
                } else if ((dealerUpCard >= 4) && (dealerUpCard <= 6)){
                    stand.current=true;
                } else {
                    hit(userHand);
                }
            } else if (userHandValue === 11) {
                if (userHand.length === 2){
                    double(userHand);
                } else {
                    hit(userHand);
                }
            } else if ((userHandValue === 10) && (dealerUpCard >= 2) && (typeof(dealerUpCard)=='number')){
                if (userHand.length === 2){
                    double(userHand);
                } else{
                    hit(userHand);
                }
            } else if ((userHandValue === 9) && (dealerUpCard >= 3) && (dealerUpCard <= 6)){
                if (userHand.length === 2){
                    double(userHand);
                } else {
                    hit(userHand);
                }
            } else {
                hit(userHand);
            }
        }
    }

    const results = (bust, dealerBust, userHand) => {
        let userHandValue = handSum(userHand);
        let dealerHandValue = handSum(dealerHand.current);

        if (bust === true){
            console.log('LOSE');
            bankValue.current = bankValue.current - currentWager.current;
            winCount.current.lose++;
            gameData.current[totalHands.current-1].result = 'lose'
            displayResults(userHandValue, dealerHandValue, userHand);
        } else if(dealerBust === 'bust'){
            console.log('WIN');
            bankValue.current = bankValue.current + currentWager.current;
            winCount.current.win++;
            gameData.current[totalHands.current-1].result = 'win'
            displayResults(userHandValue, dealerHandValue, userHand);
        } else {
            let winValue = handCompare(userHandValue, dealerHandValue);
            if (winValue === 'win'){
                console.log('WIN');
                bankValue.current = bankValue.current + currentWager.current;
                winCount.current.win++;
                gameData.current[totalHands.current-1].result = 'win'
            } else if (winValue === 'push'){
                console.log('PUSH');
                winCount.current.push++;
                gameData.current[totalHands.current-1].result = 'push'
            } else {
                console.log('LOSE');
                bankValue.current = bankValue.current - currentWager.current;
                winCount.current.lose++;
                gameData.current[totalHands.current-1].result = 'lose'
            }
            displayResults(userHandValue, dealerHandValue, userHand);
        }
    }

    const displayResults = (userHandValue, dealerHandValue, userHand) => {
        console.log(gameData.current)
        console.log('User Hand: '+userHand+' | Dealer Hand: '+dealerHand.current)
        console.log('User Hand = '+userHandValue+'| Dealer Hand = '+dealerHandValue);
        // console.log(winCount.current);
        console.log(bankValue.current);
        function percentage(partialValue, totalValue){
            return Math.round((100*(partialValue)/totalValue));
        }
        let roundsTotal = winCount.current.win + winCount.current.lose + winCount.current.push;
        let winPercent = percentage(winCount.current.win, roundsTotal);
        let losePercent = percentage(winCount.current.lose, roundsTotal);
        let pushPercent = Math.round(100 - losePercent - winPercent);

        console.log('Win Percentage: ' + winPercent + '% -- Lose Percentage: ' + losePercent + '% -- Push Percentage: ' + pushPercent + '%');
    }

    return (
        <Container>
            <div className='my-2'>
                <h1>BLACKJACK</h1>

                    Enter amount to wager per round
                    <input
                        name='wagerValue'
                        type = 'int'
                        value={wagerValue}
                        onChange={(e) => setWagerValue(parseInt(e.target.value))}
                        size='lg'
                        placeholder='minimum $1 bet'    
                    />
                    <br />
                    Enter number of rounds
                    <input
                        name='rounds'
                        type = 'int'
                        value={rounds}
                        onChange={(e) => setRounds(parseInt(e.target.value))}
                        size='lg'
                        placeholder='# of rounds'    
                    />

                <div>
                    <Button type='submit' variant='success' onClick={deal}>DEAL</Button>                   
                </div>
            </div>
        </Container>
    )
}
export default Blackjack;