function Shuffle() {

    var Poker = this;

    for (var i = Poker.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var randomItem = Poker[randomIndex];

        Poker[randomIndex] = Poker[i];
        Poker[i] = randomItem;
    }
    return Poker;
    
}