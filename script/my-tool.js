function nameUnit(n) {
    var u;
    
    switch (n) {
        case 0:
            u = "Zeroth";
            break;
        case 1:
            u = "First";
            break;
        case 2:
            u = "Second";
            break;
        case 3:
            u = "Third";
            break;
        case 4:
            u = "Fourth";
            break;
        case 5:
            u = "Fifth";
            break;
        case 6:
            u = "Sixth";
            break;
        case 7:
            u = "Seventh";
            break;
        case 8:
            u = "Eigth";
            break;
        case 9:
            u = "Nineth";
            break;
        default:
            u = "None";
        }
    return u;
}

function nameTeenth(n) {
    var u;
    
    switch (n) {
        case 11:
            u = "Eleventh";
            break;
        case 12:
            u = "Twelfth";
            break;
        case 13:
            u = "Thirteenth";
            break;
        case 14:
            u = "Forteenth";
            break;
        case 15:
            u = "Fifteenth";
            break;
        case 16:
            u = "Sixteenth";
            break;
        case 17:
            u = "Seventeenth";
            break;
        case 18:
            u = "Eighteenth";
            break;
        case 19:
            u = "Nineteenth";
            break;
        default:
            u = "None";
            break;
        }
    return u;
}
    
function nameTenth(n) {
    var u;
    
    switch (n) {
        case 2:
            u = "Twenty";
            break;
        case 3:
            u = "Thirty";
            break;
        case 4:
            u = "Forty";
            break;
        case 5:
            u = "Fifty";
            break;
        case 6:
            u = "Sixth";
            break;
        case 7:
            u = "Seventy";
            break;
        case 8:
            u = "Eighty";
            break;
        case 9:
            u = "Ninety";
            break;
        default:
            u = "None";
            break;
        }
    return u;
}
    
function nameAtTenth(n) {
    var u;
    
    switch (n) {
        case 10:
            u = "Tenth";
            break;
        case 20:
            u = "Twentieth";
            break;
        case 30:
            u = "Thirtieth";
            break;
        case 40:
            u = "Fortieth";
            break;
        case 50:
            u = "Fiftieth";
            break;
        case 60:
            u = "Sixtieth";
            break;
        case 70:
            u = "Seventieth";
            break;
        case 80:
            u = "Eightieth";
            break;
        case 90:
            u = "Ninetieth";
            break;
        default:
            u = "None";
            break;
        }
    return u;
}

function toOrdinal(n){
    var ordinal;
    
    if (n < 10){
        ordinal = nameUnit(n);
    } else if (n % 10 === 0){
        ordinal = nameAtTenth(n);
    } else if (n > 10 && n < 20){
        ordinal = nameTeenth(n);        
    } else {
        var unitDigit = Number(String(n).charAt(String(n).length - 1));
        var tenthDigit = Number(String(n).charAt(String(n).length - 2));
        ordinal = nameTenth(tenthDigit) + "-" + nameUnit(unitDigit);
    }
    
    return ordinal;
}

function ft_to_in(n) {
    return n * 12;
}

function in_to_ft(n) {
    return n / 12;
}

function sqft_to_sqin(n) {
    return n * 144;
}

function sqin_to_sqft(n) {
    return n / 144;
}