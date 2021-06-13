function printDeckOfCards(cards) {
    const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = {
        'S': '\u2660',
        'H': '\u2665',
        'D': '\u2666',
        'C': '\u2663'
    };

    try {
       cards= cards.map(card => {
            let suit = card.split('').slice(-1).join('');
            let face = card.split('').slice(0, -1).join('');

            if (!faces.includes(face) || !suits[suit]) {
                throw new Error(`Invalid card: ${face}${suit}`);
            }
            return `${face}${suits[suit]}`;
        }).join(' ');
        
    } catch (error) {
        console.log(error.message);
        return;
    }
    return cards;
}

printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['AS', '10D', 'KH', '1C']);
