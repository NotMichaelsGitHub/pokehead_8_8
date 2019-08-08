var current_cards;
var cart_cards_id = [];

var modal = document.getElementById("myModal");
var cart_modal = document.getElementById("cartModal");
var span = document.getElementsByClassName("close")[0];
var span_two = document.getElementsByClassName("close")[1];


//on click checkbox (on the table)
function hmm(id) {

    //console.log(id);

    var check = cart_cards_id.includes(id);

    if(check == false){
        cart_cards_id.push(id);
    }else{

        cart_cards_id = cart_cards_id.filter(cart => cart != id);
    }

    console.log(cart_cards_id);
}


function getCartXML() {
    var bag = [];
    for(var i=0;i<cart_cards_id.length;i++){
        bag.push(current_cards.filter(card => card.id == cart_cards_id[i])) ;
    }
    bag = flatten(bag);
    document.getElementById("compareTable").innerHTML = "";
    var tr = "";

    for (var x = 0; x < bag.length; x++){
        tr = $('<tr/>');

        tr.append("<td class='col-sm-6' data-value=\" "+ bag[x].name +"\">" + bag[x].name + "</td>");
        tr.append("<td class='col-sm-6'  data-value=\" "+ bag[x].number +"\"   >" + "<image src='https://images.pokemontcg.io/"+ bag[x].setCode+"/"+ bag[x].number +"_hires.png' style='height: 117px; width: 83px'" + "</td>");

        $('#compareTable').append(tr);
    }
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

span_two.onclick = function(){
    cart_modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == cart_modal) {
        cart_modal.style.display = "none";
    }
};


//on click button
function show_cart() {
    // cart_modal.style.display = "block";
    $('#cartModal').modal('show');

    getCartXML();
}

function qwerty(place) {

    $('#myModal').modal('show');

    document.getElementById("id").innerHTML = current_cards[place].id;
    document.getElementById("name").innerHTML = "Name: " + '<b>' + current_cards[place].name + '</b>' ;
    document.getElementById("set").innerHTML = "Set: " +'<b>' +  current_cards[place].setCode + '</b>' ;
    document.getElementById("type").innerHTML = "Type : " +'<b>' +  current_cards[place].types[0] + '</b>' ;
    document.getElementById("stage").innerHTML = "Stage: " +'<b>' +  current_cards[place].subtype  + '</b>' ;
    document.getElementById("hp").innerHTML = "HP: " +'<b>' +  current_cards[place].hp  + '</b>' ;
    document.getElementById("rtcost").innerHTML = "Retreat Cost: " +'<b>' +  current_cards[place].convertedRetreatCost + '</b>' ;
    document.getElementById("image").src = 'https://images.pokemontcg.io/' + current_cards[place].setCode+"/"+ current_cards[place].number +"_hires.png";

    if(Object.keys(current_cards[place]).length == 16){
        document.getElementById("ability_name").innerHTML = "Ability: " +'<b>' +  current_cards[place].ability.name  + '</b>' ;
        document.getElementById("ability_text").innerHTML = "Text: " +'<b>' +  current_cards[place].ability.text  + '</b>' ;
    }else{
        document.getElementById("ability_name").innerHTML = "No ability";
        document.getElementById("ability_text").innerHTML = "";
    }
}