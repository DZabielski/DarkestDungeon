let allCards = document.querySelectorAll('.card');                      //create list of cards

                            
for(const a1 of allCards){                                              //create listener for event "click"
	a1.addEventListener('click', revealCard);
		
}
                    
var turnCounter = 0;                                                    //create some variables
var revealed = [];
var pairsLeft = 8;

                      
function revealCard(){                                                  //function "revealCard" only reveales card.

    if (revealed.length > 1 || revealed.indexOf(this) != -1) return     //if there are more than 2cards revealed, stop function.
    $(this).addClass("cRevealed");                                      //adds class reveald
    revealed.push(this)                                                 //adds number of revealed cards

    if (revealed.length == 2) compareCards()                            //if there are 2 cards revealed, start function "compareCards"
}
                       
function hideCards(b2){                                                 //delete added class of revealed card
    $(b2).removeClass("cRevealed");
}

function compareCards() {
                           
    turnCounter++ ;                                                     //adds one score to turn counter
    $(".score").html("Turn counter: "+ turnCounter);                    //change innerHtml to "Turn counter + number of turns"

    var cardAlpha = revealed[0];                                        //make variable for two marked cards
    var cardBeta = revealed[1];
                                                        
    if (cardAlpha.dataset.avatar == cardBeta.dataset.avatar){           //if first card has same Data as second card
    
        correct(cardAlpha, cardBeta)                                    //run function "correct"
    }   

    else{                                                               //else use function hideCards for cardAlpha and cardBeta
        hideCards(cardAlpha)
        hideCards(cardBeta)
    }

    revealed = []                                                       //for both ways, clear list "revealed"
}

                         
function correct(c1, c2){                                               //function correct, if there are 2 same cards, turn opacity of thouse elements to "0"

    $([c1, c2]).addClass ("matched");
    pairsLeft-- ;                                                       //delete one count of pairs left.

    if (pairsLeft == 0){                                                //when pairsLeft hit 0, change element table to <h1> text.
        
        $(".table").html("<h1>You win!!!<br>You did it in: "+turnCounter+" turns</h1>");
    }
}