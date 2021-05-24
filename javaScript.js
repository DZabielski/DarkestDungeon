var allCards = document.querySelectorAll('.card');                                                     //create a list of the cards.

function shuffle(element)                                                                              //apply fisher's randomizer.
{      
    for (var i = 0; i < element.length-1; i++){
        var j = i + Math.random()*(element.length - 1 - i);
        j = Math.round(j);
        var x = element[j];
        element[j]=element[i];
        element[i] = x; 
    }
    return element;
};

window.onload = function()                                                                             //function which uses fisher's randomizer, to shuffle the cards. function will start on load of a webside.
{
    let cardsList = Array.from(allCards)
    var shuffleTheCard = shuffle (cardsList)    
    console.log(shuffleTheCard)
    var anyCard = document.querySelector('.table');
    anyCard.innerHTML = '';

        for (var i = 0; i<shuffleTheCard.length; i++)
        {
        anyCard.appendChild(shuffleTheCard[i])
        }
}; 


for(const a1 of allCards)                                                                              //create listener for event "click".
{
	a1.addEventListener('click', revealCard);		
};
                    
var turnCounter = 0;                                                                                   //create some variables.
var revealed = [];
var pairsLeft = 8;

function revealCard()                                                                                  //function "revealCard" only reveales card.
{
    if (revealed.length > 1 || revealed.indexOf(this) != -1 || $(this).hasClass("matched")) return     //if there are more than two cards revealed, stop function.
    $(this).addClass("cRevealed");                                                                     //adds class reveald.
    revealed.push(this)                                                                                //adds number of revealed cards.

    if (revealed.length == 2) compareCards()                                                           //if there are 2 cards revealed, start function "compareCards".
};
                       
function hideCards(b2)                                                                                 //delete added class of revealed card.
{
    $(b2).removeClass("cRevealed");
};

function compareCards()
{                           
    turnCounter++ ;                                                                                    //adds one score to the turn counter.
    $(".score").html("Turn counter: "+ turnCounter);                                                   //change innerHtml to "Turn counter + number of turns".

    var cardAlpha = revealed[0];                                                                       //make variable for two marked cards.
    var cardBeta = revealed[1];
                                                        
        if (cardAlpha.dataset.avatar == cardBeta.dataset.avatar)                                       //if first card has same Data as second card.
        {
            correct(cardAlpha, cardBeta)                                                               //run function "correct".
            revealed = []
        }   

        else                                                                                           //else use function hideCards for cardAlpha and cardBeta.
        {
            setTimeout(function(){
            hideCards(cardAlpha); 
            hideCards(cardBeta);
            revealed = []   
        }, 1000);                                                                                      //one second time, before the hide action.
    }                                                     
};                                                                                                     //for both ways, clear list "revealed".
                         
function correct(c1, c2)                                                                               //function correct, if there are 2 same cards, turn opacity of thouse elements to "0".
{
    $([c1, c2]).addClass ("matched");
    pairsLeft-- ;                                                                                      //delete one count of pairs left.

        if (pairsLeft == 0)                                                                            //when pairsLeft hit 0, change element table to <h1> text.
        {
            $(".table").html("<h1>You win!!!<br>You did it in: "+turnCounter+" turns</h1>");
        }
};