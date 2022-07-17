async function getFavNum(number) {
    let res = await axios.get(`http://numbersapi.com/${number}?json`);
    console.log(res.data.text);
};

async function getManyNums() {
    let res = await axios.get(`http://numbersapi.com/1..10?json`);
    let factsContainer = document.getElementById('num-facts');
    for (d in res.data) {
        let fact = document.createElement('p');
        fact.innerText = res.data[d];
        factsContainer.append(fact);
    };
};

getManyNums();

async function getFavFacts(number) {
    let favContainer = document.getElementById('fav-facts');
    for (let i=0; i < 4; i++) {
        let res = await axios.get(`http://numbersapi.com/${number}?json`);
        let fact = document.createElement('p');
        fact.innerText = res.data.text;
        favContainer.append(fact)
    }
}

getFavFacts(37);

const deck = {
    async init() {
        let response = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        this.deckId = response.data.deck_id;
    },
    async draw() {
        let response = await axios.get(`http://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
        let cardContainer = document.getElementById('cards');
        let card = document.createElement('img');
        card.setAttribute('src', response.data.cards[0].image)
        cardContainer.append(card);
    }
}

deck.init();

const button = document.getElementById('get-card');

button.addEventListener('click', function() {
    deck.draw()
})