var $address, $bldgtype, $front, $depth, $story, $rear, $roof, $base;
var txtProp, txtBldg, txtFront, txtDepth, txtStry, txtRear, txtRoof, txtBase, txtSummary;

//refresh results when "Analyze" is clicked
$("#form-submit").on("click", function(){

    //Refresh input and list out in text on screen
    initInput();
    listInput();
    
})

function listInput() {
    txtProp = "<p>Property Address: " + $address + "</p>";
    txtBldg = "<p>Building Type: " + $bldgtype + "</p>";
    txtFront = "<p>Lot Frontage: " + $front + " ft</p>";
    txtDepth = "<p>Lot Depth: " + $depth + " ft</p>";
    txtStry = "<p>Story: " + $story + "</p>";
    txtRear = "<p>Rear Yard Depth: " + $rear + "</p>";
    txtRoof = "<p>Roof Access: " + $roof + "</p>";
    txtBase = "<p>Finished Basement: " + $base + " </p>";
    txtSummary = $(txtProp + txtBldg + txtFront + txtDepth + txtStry + txtRear + txtRoof + txtBase);
    
    $("#metaList").empty();
    $("#metaList").append(txtSummary);
}

function initInput() {
    $address = $("#prop-address").val();
    $bldgtype = bldgTypeTitle();
    $front = $("#dim-frontage").val();
    $depth = $("#dim-depth").val();
    $story = $("#story-num").val();
    $rear = $("#rear-yard").val();
    $roof = yesNo($("#roofAccess").is(":checked"));
    $base = yesNo($("#finBasement").is(":checked"));
}

//building type switcher (Attached, Semi-Attached, Detached)
function bldgTypeTitle() { 
    if ($("#bldg-type").val() == 1){
            return "Attached";
        } else if ($("#bldg-type").val() == 2){
            return "Semi-Attached";
        } else if ($("#bldg-type").val() == 3){
            return "Detached";
        } else {
            return "Building Type not Selected"
        }
}

//Return text 'yes' or 'no' base on argument true or false
function yesNo(c) {
    if (c) {
        return "Yes";
    } else {
        return "No";
    }
}