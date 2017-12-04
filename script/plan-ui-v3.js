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
    //draw plan in corresponding grid using
    for (var i = 0; i < pFloor + 2; i++) {
        
        //recreate proper DOM elements for typical floors
        var name = allPlan[i].name;
        var $div = $("<div>", {id: name, class: "grid"});
        $(".main-grid").append($div);
        
        //draw svg wrapping div's
        displayFloor(prop, allPlan[i]);
    }
})

function init_p_input(){
    pFront = Number($("#dim-frontage").val());
    pDepth = Number($("#dim-depth").val());
    pRear = Number($("#rear-yard").val());
    pSetback = 0;
    pFloor = Number($("#story-num").val());
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

//takes in property(p) and floor plan(p) objects as arguments and draw, need to further separate into draw functions instead of one giant function, displayInfo, displayPropLine, displayFloor, displayRooms, displayDims
function displayFloor(p, f) {
    
    //prepare canvas
    var w = $(".grid").width();
    var h = $(".grid").height();
    //declare center of canvas
    p.posX = (w - p.w) / 2;
    p.posY = (h - p.d) / 2;
    
    // create SVG document and set its size
    var draw = SVG(f.name);
    //set viewbox
    draw.viewbox(0, 0, w, h);
    // draw background
    var background = draw.rect(w, h).fill("#dde3e1");
    
    //create floor plan label and square footage
    var floorInfo = draw.text(f.name + "\n" + f.area + " sqft").font({
        size: 14,
        family: 'Menlo, sans-serif',
        anchor: 'middle',
        fill: '#111'
    }).move(w/2, h-50);
    
    //locate and draw property line
    var prop = draw.rect(p.w, p.d)
        .x(p.posX).y(p.posY)
        .fill("#fff")
        .stroke({ width: 1, color: '#111', dasharray: '10,8,5,8'});
    
    //locate and draw plan
    var floor = draw.rect(f.w, f.d)
        .x(p.posX).y(p.posY + ft_to_in(pRear))
        .fill("#fff")
        .stroke({ width: f.wallExtThick, color: "#000"});
    
    //draw dimension strings (needs find a way to shorten this code)
    var longDim = draw.line(p.posX + f.w/4,
                            p.posY + ft_to_in(pRear),
                            p.posX + f.w/4,
                            p.posY + ft_to_in(pRear) + f.d)
        .stroke({ width: 1 , color: "#111"});
    
    longDim.marker('start', 10, 10, function(add) {
        add.line(0, 0, 10, 10).stroke({ width: 1 , color: "#111"});
    })
    
    longDim.marker('end', 10, 10, function(add) {
        add.line(0, 0, 10, 10).stroke({ width: 1 , color: "#111"});
    })
    
    var shortDim = draw.line(p.posX,
                            p.posY + ft_to_in(pRear) + f.d/4,
                            p.posX + f.w,
                            p.posY + ft_to_in(pRear) + f.d/4)
        .stroke({ width: 1 , color: "#111"});
    
    shortDim.marker('start', 10, 10, function(add) {
        add.line(0, 0, 10, 10).stroke({ width: 1 , color: "#111"});
    })
    
    shortDim.marker('end', 10, 10, function(add) {
        add.line(0, 0, 10, 10).stroke({ width: 1 , color: "#111"});
    })
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