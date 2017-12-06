var pFront, pDepth, pRear, pSetback, pFloor;

var drawScale = 1.0;

var allPlan;

var prop;

var wallThick = 1/2;

var totArea;

$("#form-submit").on("click", function(){
    
    //Redraw when 'Analyze' clicked with different parameters
    
    init_p_input();
    prop = new property();
    allPlan = [];
    initPlans();
    
    //Create new grid layout for new plans
    $(".main-grid").empty();
    
    if (pFloor > 2) {
        $(".main-grid").css({"grid-template-columns": "33% 33% 33%", "grid-template-rows": "400px 400px"});
    } else if (pFloor <= 2) {
        $(".main-grid").css({"grid-template-columns": "25% 25% 25% 25%", "grid-template-rows": "800px"});
    }
    
    /*Grid index to floor plans:
    A-1: Basement
    A-2: First Floor
    A-X: Roof
    */
    //draw plan in corresponding grid using SVG
    for (var i = 0; i < pFloor + 2; i++) {
        
        //recreate proper DOM elements for typical floors
        var name = allPlan[i].name;
        var $div = $("<div>", {id: name, class: "grid"});
        $(".main-grid").append($div);
        
        //draw svg wrapping div's
        var $draw = SVG(allPlan[i].name);
        $draw.viewbox(0, 0, $(".grid").width(), $(".grid").height());
        // draw background
        var background = $draw.rect($(".grid").width(), $(".grid").height()).fill("#fff");
        
        //first draw property line
        displayPropLine($draw, prop);
        //then draw plan outline
        displayFloor($draw, prop, allPlan[i]);
        //draw stairs where applicable
        if (i == pFloor + 1 && $("#roofAccess").is(":checked") === false) {
        } else {
            displayStair($draw, allPlan[i]);
        }
        //display info of floor
        displayFloorInfo($draw, allPlan[i]);        
    }
})

function init_p_input(){
    pFront = Number($("#dim-frontage").val());
    pDepth = Number($("#dim-depth").val());
    pRear = Number($("#rear-yard").val());
    pSetback = 0;
    pFloor = Number($("#story-num").val());
}

//redraw plans when input chagnes
function initPlans(){
    for (var i = 0; i < pFloor + 2; i++){
        //push plan geometry class into array and assign name
        allPlan.push(new flrTyp());
        
        allPlan[i].iden = i;
        
        if (i == 0) {
            allPlan[i].name = "Basement";
        } else if (i == pFloor + 1) {
            allPlan[i].name = "Roof";
        } else {
            allPlan[i].name = toOrdinal(i) + " Floor";
        }
        
        flrCalc(allPlan[i]);
    }
}

//mouse wheel scrolling event
function mouseWheel(event) {

    if (drawScale > 1.10) {
        drawScale = 1.10;
    } else if (drawScale < 0.75) {
        drawScale = 0.75;
    } else {
        drawScale -= (event.delta/5000);
    }
    
}

//mouse click event, custom button events
function mouseClicked(){
}

//events when window resizes
function windowResized(){
}


//define property object
function property() {
    this.name = "Property";
    this.w = ft_to_in(pFront);
    this.d = ft_to_in(pDepth);
    this.posX = 0;
    this.posY = 0;
}

//define floor objects
function flrTyp() {
    this.iden ;
    this.name = "";
    //exterior face dim
    this.w;
    this.d;
    this.intW;
    this.intD;
    this.area;
    this.posX = 0;
    this.posY = 0;
    this.wallExtThick = 6;
    this.wallIntThick = 3;
}

function flrCalc(f) {
    
    if (f.iden == 0) {
        f.wallExtThick = 10;
    }
    
    f.w = ft_to_in(pFront);
    f.d = ft_to_in(pDepth - pRear - pSetback);
    f.intW = f.w - 2 * f.wallExtThick;
    f.intD = f.d - 2 * f.wallExtThick;
    f.area = Math.floor(sqin_to_sqft(f.intW * f.intD));
    
}

//takes in SVG canvas (d), property(p), and floor plan(p) objects as arguments and draw, need to further separate into draw functions instead of one giant function, displayInfo, displayPropLine, displayFloor, displayRooms, displayDims
function displayPropLine(d, p) {
    //recognize SVG canvas
    var draw = d;
    var w = $(".grid").width();
    var h = $(".grid").height();
    
    p.posX = (w - p.w) / 2;
    p.posY = (h - p.d) / 2;
    
    //locate and draw property line
    var prop = draw.rect(p.w, p.d)
        .x(p.posX).y(p.posY)
        .fill("#fff")
        .stroke({ width: 1, color: '#111', dasharray: '10,8,5,8'});
}

function displayFloor(d, p, f) {
    //recognize SVG canvas
    var draw = d;
    
    f.posX = p.posX;
    f.posY = p.posY + ft_to_in(pRear);
    //locate and draw plan
    var floor = draw.rect(f.w, f.d)
        .x(f.posX).y(f.posY)
        .fill("#fff")
        .stroke({ width: f.wallExtThick, color: "#000"});
    
    //draw dimension strings (needs find a way to shorten this code)
    var longDim = draw.line(f.posX + f.w/4,
                            f.posY,
                            f.posX + f.w/4,
                            f.posY + f.d)
        .stroke({ width: 1 , color: "#111"});
    
    longDim.marker('start', 10, 10, function(add) {
        add.line(0, 0, 10, 10).stroke({ width: 1 , color: "#111"});
    })
    
    longDim.marker('end', 10, 10, function(add) {
        add.line(0, 0, 10, 10).stroke({ width: 1 , color: "#111"});
    })
    
    var shortDim = draw.line(f.posX,
                            f.posY + f.d/4,
                            f.posX + f.w,
                            f.posY + f.d/4)
        .stroke({ width: 1 , color: "#111"});
    
    shortDim.marker('start', 10, 10, function(add) {
        add.line(0, 0, 10, 10).stroke({ width: 1 , color: "#111"});
    })
    
    shortDim.marker('end', 10, 10, function(add) {
        add.line(0, 0, 10, 10).stroke({ width: 1 , color: "#111"});
    })
}

function displayFloorInfo(d, f) {
    //recognize SVG canvas
    var draw = d;
    
    //create floor plan label and square footage
    var floorInfo = draw.text(f.name + "\n" + f.area + " sqft").font({
        size: 14,
        family: 'Menlo, sans-serif',
        anchor: 'middle',
        fill: '#111'
    }).move($(".grid").width()/2, $(".grid").height()-50);
}

function displayStair(d, f) {
    
    var draw = d;
    
    var flrHeight = ft_to_in(10);
    var width = ft_to_in(3);
    var rise = 6;
    var tread = 11;
    var step = flrHeight / rise;
    var length = step * tread;
    var x = f.posX + f.w - width;
    var y = f.posY + (f.d - length)/2;
    
    var stairs = draw.rect(width, length)
        .x(x).y(y)
        .fill("none")
        .stroke({ width: 2, color: '#000'})
    
    for (var i = 0; i < step; i++) {
        var steps = draw.line(x, y + i * tread, x + width, y + i * tread)
        .stroke({ width: 1, color: '#000'})
    }
}
