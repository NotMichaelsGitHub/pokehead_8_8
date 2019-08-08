$("#submit_button").click(function(event){
    event.preventDefault();
    clearIt();

    var sets = [];
    $("#selected-sets input:checkbox:checked").map(function(){
        sets.push($(this).val());
    });

    if(sets.length > 1){
        var thing = sets.map(function (set) {
            return $.ajax({
                url: 'http://localhost:63342/MASTER_POKEHEADDOTCOM/en_US/' + set + ".json/",
                dataType: 'json',
                method: 'GET'
            })
        });

        $.when.apply(null, thing)
            .then(function (value) {
                var carddata = Array.prototype.slice.call(arguments);
                var qwer = [];
                for (i = 0; i < sets.length; i++) {
                    qwer.push(carddata[i][0]);
                    //filter_one(carddata[i][0]);
                }
                filter_one(flatten(qwer));
            });
    }
    else{
        var thing = $.ajax({
            url: 'http://localhost:63342/MASTER_POKEHEADDOTCOM/en_US/' + sets[0] + ".json/",
            dataType: 'json',
            method: 'GET'
        });

        $.when(thing)
            .then(function (value) {
                var carddata = Array.prototype.slice.call(arguments);
                filter_one(carddata[0]);
            });
    }

    //code to use the search bar
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

$("#clear_button").click(function (event) {
    event.preventDefault();

    clearIt()
});

function doIt(asdf) {

    current_cards = asdf;

    var json = asdf;

    var tr;
    for (var i = 0; i < json.length; i++) {
        tr = $('<tr/>');

        tr.append("<td class='col-sm-2' data-value=\" "+ json[i].name +"\">" + json[i].name + "</td>");

        tr.append("<td class=\"col-sm-1\" data-value=\" "+ getSetFromId(json[i]) +"\">" + getSetFromId(json[i]) + "</td>");

        if (json[i].supertype = "Pokémon"){
            tr.append("<td class='col-sm-1' data-value=\" "+ json[i].types +"\">" + json[i].types + "</td>");
        }
        else{
            tr.append("<td class='col-sm-1' ></td>");
        }

        tr.append("<td class='col-sm-1' data-value=\" "+ json[i].subtype +"\" >" + json[i].subtype + "</td>");
        tr.append("<td class='col-sm-1'  data-value=\" "+ json[i].hp +"\">" + json[i].hp + "</td>");
        tr.append("<td class='col-sm-1'  data-value=\" "+ hasAbility(json[i]) +"\"  >" + hasAbility(json[i]) + "</td>");
        tr.append("<td class='col-sm-1' data-value=\" "+ json[i].convertedRetreatCost +"\"   >" + json[i].convertedRetreatCost + "</td>");
        tr.append("<td class='col-sm-1'  data-value=\" "+ json[i].rarity +"\"  >" + json[i].rarity + "</td>");

        tr.append("<td class='col-sm-1'  data-value=\" "+ json[i].number +"\"   >" + "<image src='https://images.pokemontcg.io/"+ json[i].setCode+"/"+ json[i].number +"_hires.png' style='height: 117px; width: 83px' onClick='qwerty(" + i + ")' ></image>" + "</td>");

        //tr.append("<td class=\"col-sm-2\"><button id=\"myBtn\" onClick='test(" + i + ")'>Open Modal</button></td>");

        var uid = json[i].number;
        var quert = "\"" + json[i].id + "\"";

        tr.append("<td class=\"col-sm-1\"><input type='checkbox' id='cb_cart' onClick='hmm("   + quert + ")'>Add to cart</td>");


        $('#display').append(tr);
    }

}

function clearIt() {
    document.getElementById("myTable").innerHTML = "";
}

//code to merge an array of arrays into 1 very fast
function flatten(arrayToFlatten) {
    return arrayToFlatten.reduce(function (a,b) {
        return a.concat(b);
    }, []);
}

function filter_one(carddata) {
    var supertype = 'Pokémon';
    carddata = carddata.filter(card => card.supertype == supertype);

    filter_two(carddata);


}

function filter_two(carddata) {

    let filtered_stages = ['Basic', 'Stage 1', 'Stage 2'];
    let selected_stages = [];
    $("#selected-stages input:checkbox:checked").map(function(){
        selected_stages.push($(this).val());
    });
    filtered_stages = filtered_stages.filter( function( el ) {
        return selected_stages.indexOf( el ) < 0;
    } );

    for(var i = 0; i < filtered_stages.length; i++){
        carddata = carddata.filter(card => card.subtype != filtered_stages[i]);
    }

    filter_three(carddata);
}

function filter_three(carddata) {

    let filtered_rarity = ['Common', 'Uncommon', 'Rare', 'Rare Holo', 'Rare Holo gx', 'RareUltra', 'Rare Secret'];
    let selected_rarity = [];
    $("#selected-rarity input:checkbox:checked").map(function(){
        selected_rarity.push($(this).val());
    });
    filtered_rarity = filtered_rarity.filter( function( el ) {
        return selected_rarity.indexOf( el ) < 0;
    } );

    for(var i = 0; i < filtered_rarity.length; i++){
        carddata = carddata.filter(card => card.rarity != filtered_rarity[i]);
    }

    filter_four(carddata);
}

function filter_four(carddata) {

    let filtered_types = ['Colorless', 'Grass', 'Fire', 'Water', 'Lightning', 'Psychic', 'Fighting', 'Darkness', 'Metal', 'Dragon', 'Fairy'];
    let selected_types = [];
    $("#selected-types input:checkbox:checked").map(function(){
        selected_types.push($(this).val());
    });
    filtered_types = filtered_types.filter( function( el ) {
        return selected_types.indexOf( el ) < 0;
    } );

    for(var i = 0; i < filtered_types.length; i++){
        carddata = carddata.filter(card => card.types[0] != filtered_types[i]);
    }

    filter_five(carddata);
}

function filter_five(carddata) {

    let filtered_ability = ['yes', 'no'];
    let selected_ability = [];
    $("#selected-ability input:checkbox:checked").map(function(){
        selected_ability.push($(this).val());
    });
    filtered_ability = filtered_ability.filter( function( el ) {
        return selected_ability.indexOf( el ) < 0;
    } );


    let no_ability = (filtered_ability.includes("yes"));
    let has_ability = (filtered_ability.includes("no"));

    if(no_ability == true){
        carddata = carddata.filter(card => card.ability == undefined);

    }
    if(has_ability == true){
        carddata = carddata.filter(card => card.ability != undefined);
    }

    filter_six(carddata);
}

function filter_six(carddata) {

    let filtered_retreat = ['0', '1', '2', '3', '4'];
    let selected_retreat = [];
    $("#selected-retreat input:checkbox:checked").map(function(){
        selected_retreat.push($(this).val());
    });
    filtered_retreat = filtered_retreat.filter( function( el ) {
        return selected_retreat.indexOf( el ) < 0;
    } );

    for(var i = 0; i < filtered_retreat.length; i++){
        carddata = carddata.filter(card => card.convertedRetreatCost != parseInt(filtered_retreat[i]));
    }

    doIt(carddata);
}

function hasAbility(json) {
    if(json.ability == null){
        return 'no ability'
    }
    else{
        return 'has ability'
    }
}

function getSetFromId(json) {
    if(json.setCode == 'sm1'){
        return ("Sun & Moon");
    }
    if(json.setCode == 'sm2'){
        return ("Guardians Rising");
    }
    if(json.setCode == 'sm3'){
        return ("Burning Shadows");
    }
    if(json.setCode == 'sm4'){
        return ("Crimson Invasion");
    }
    if(json.setCode == 'sm5'){
        return ("Ultra Prism");
    }
    if(json.setCode == 'sm6'){
        return ("Forbidden Light");
    }
    if(json.setCode == 'sm7'){
        return ("Celestial Storm");
    }
    if(json.setCode == 'sm75'){
        return ("Dragon Majesty");
    }
    if(json.setCode == 'sm8'){
        return ("Lost Thunder");
    }
    if(json.setCode == 'sm9'){
        return ("Team Up");
    }
    if(json.setCode == 'sm10'){
        return ("Unbroken Bonds");
    }
    if(json.setCode == 'sm11'){
        return ("Unified Minds");
    }
    if(json.setCode == 'smp'){
        return ("Black Star Promos");
    }
    return(json.setCode)
}
