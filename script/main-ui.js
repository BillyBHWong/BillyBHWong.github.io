//refresh results when "Analyze" is clicked
$("#form-submit").on("click", function(){

    //Logging result in console
    //console.log("The address is: " + $("#prop-address").val());

    //Logging result directly on page in text
    //Test script, showing resulting input on page

    var allOutID = ["ad", "bt", "st", "ry", "ra", "fb"];


    var $ad = $("<p id='" + allOutID[0] + "'>Property Address: " + $("#prop-address").val() + "</p>");
    var $bt = $("<p id='" + allOutID[1] + "'>Building Type: " + $("#bldg-type").text() + "</p>");
    var $st = $("<p id='" + allOutID[2] + "'>Story: " + $("#story-num").val() + "</p>");
    var $ry = $("<p id='" + allOutID[3] + "'>Rear Yard Depth: " + $("#rear-yard").val() + "</p>");
    var $ra = $("<p id='" + allOutID[4] + "'>Roof Access: " + $("#roofAccess").is(":checked") + "</p>");
    var $fb = $("<p id='" + allOutID[5] + "'>Finished Basement: " + $("#finBasement").is(":checked") + " </p>");

    var $allOut = [$ad, $bt, $st, $ry, $ra, $fb];

    for (var i=0; i < allOutID.length; i++){
        $("#"+allOutID[i]).remove();
    }

    for (var i=0; i < $allOut.length; i++){
        $("#test").append($allOut[i]);
    }

})



//building type switcher (Attached, Semi-Attached, Detached)
var bldgType = 0;

function switchBldg() { 
    if (bldgType == 0){
            $("#bldg-type").text("Attached");
        } else if (bldgType == 1){
            $("#bldg-type").text("Semi-Attached");
        } else if (bldgType == 2){
            $("#bldg-type").text("Detached");
        }
}

$("#bldg-type-left").on("click",function(){
    if (bldgType < 1) {
        bldgType = 2;
        //console.log("Building type index: " + bldgType);
    } else {
        bldgType -= 1;
        //console.log("Building type index: " + bldgType);
    }
    switchBldg();
})

$("#bldg-type-right").on("click",function(){
    if (bldgType > 1) {
        bldgType = 0;
        //console.log("Building type index: " + bldgType);
    } else {
        bldgType += 1;
        //console.log("Building type index: " + bldgType);
    }
    switchBldg();

})