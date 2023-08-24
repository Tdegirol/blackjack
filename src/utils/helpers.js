export const deckArr = [
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
]

export function handCompare(userHandValue, dealerHandValue) {
    if ((userHandValue === 21) && (dealerHandValue === 21)){
        return('push');
    } else if ((userHandValue === 21) && (dealerHandValue !== 21)){
        return('win');
    } else if ((userHandValue !== 21) && (dealerHandValue === 21)){
        return('lose');
    } else{
        if (userHandValue > dealerHandValue){
            return('win');
        } else if (dealerHandValue > userHandValue){
            return('lose');
        } else{
            return('push');
        }
    }
}

export function handSum(hand){
    let handInt = 0;
    let handSum = 0;
    let handIntHigh = 11;
    let aceFlag = false;
    for(let i=0; i<hand.length; i++){
        if ((hand[i].slice(0,1) === 'J') || (hand[i].slice(0,1) === 'Q')|| (hand[i].slice(0,1) === 'K')){
            handInt = 10;
            handSum = handSum + handInt;
            if ((aceFlag === true) && (handSum > 21)){
                handSum = handSum - 10;
                aceFlag = false;
            }
        } else if ((hand[i].slice(0,1) === 'A') || (aceFlag === true)){
            if (hand[i].slice(0,1) !== 'A'){
                if (Number(hand[i].slice(0,1)) === 1){
                    handInt = 10;
                    handSum = handSum + handInt;
                } else{
                    handInt = Number(hand[i].slice(0,1));
                    handSum = handSum + handInt
                }
                if (handSum > 21){
                    handSum = handSum - 10;
                    aceFlag = false;
                }
            } else {
                aceFlag = true;
                if (handSum + handIntHigh === 21){
                    handSum = 21;
                }else if(handSum + handIntHigh > 21) {
                    handSum = handSum + 1;
                    aceFlag = false;
                } else {
                    handSum = handSum + handIntHigh;
                }
            }
        } else {
            if (Number(hand[i].slice(0,1)) === 1){
                handInt = 10;
                handSum = handSum + handInt;
            } else{
                handInt = Number(hand[i].slice(0,1));
                handSum = handSum + handInt
            }
        }
    }
    return (handSum)
}

export function dealerStrategy(dealerHandValue){
    if (dealerHandValue >21){
        return('bust');
    } else if (dealerHandValue >= 17) {
        return('stand');
    } else {
        return('hit');
    } 
}
