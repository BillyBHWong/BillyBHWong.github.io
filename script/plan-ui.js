//data below is from user input, communicate with DOMs
var frontage = 16;
var depth = 50;
var rear = Number($("#rear-yard").val());
//var rear = 9;
var setback = 0;
var floors = Number($("#story-num").val());
//var floors = 2;

var drawScale = 1.0;
//convert dimensions from feet to inches
var fIn = frontage * 12 * drawScale;
var dIn = depth * 12 * drawScale;
var rIn = rear * 12 * drawScale;
var sIn = setback * 12 * drawScale;

//p5 canvas setting information
var cnv;
var cnvWidth = 500;
var cnvHeight = window.innerHeight;

var scroll = 1;
var plnBtn = new planButton();

//create property from property() object
var propPlan = true;
var propShape = new property();
//initialize plans
var plans = [];
var plansShape = [];
initPlans();
plans[1] = true;

//mouse wheel scrolling event
function mouseWheel(event) {
    if (drawScale > 1.10) {
        drawScale = 1.10;
    } else if (drawScale < 0.75) {
        drawScale = 0.75;
    } else {
        drawScale -= (event.delta/5000);
        console.log(drawScale);
    }
}

//mouse click event, custom button events
function mouseClicked(){

    //change scroll location everytime scroll button is clicked
    //left button
    if (mouseX >= plnBtn.Lx2 && mouseX <= plnBtn.Lx1 && mouseY >= plnBtn.Ly1 && mouseY <= plnBtn.Ly3){

        //find and change scroll location
        if (scroll > 0){
            scroll -= 1;
        } else {
            scroll = floors + 1;
        }

        //turn corresponding plans on and off
        for (var i = 0; i < floors + 2; i++) {
            if (i == scroll){
                plans[i] = true;
            } else {
                plans[i] = false;
            }
        }
    } else if (mouseX >= plnBtn.Rx1 && mouseX <= plnBtn.Rx2 && mouseY >= plnBtn.Ry1 && mouseY <= plnBtn.Ry3){

        //find and change scroll location
        if (scroll < floors + 1){
            scroll += 1;
        } else {
            scroll = 0;
        }

        //turn corresponding plans on and off
        for (var i = 0; i < floors + 2; i++) {
            if (i == scroll){
                plans[i] = true;
            } else {
                plans[i] = false;
            }
        }
    }

    console.log("Total floor: " + floors);
    console.log("scroll location: " + scroll);
    console.log("Bool list: " + plans);
    console.log("Current floor: " + plansShape[scroll].name);
}

//locate canvas parametrically
function relocateCanvas(){
    var x = windowWidth - width - 300;
    var y = 0;
    cnv.position(x, y);
    cnvHeight = window.innerHeight;
}

//set up canvas to draw on
function setup(){
    frameRate(30);
    cnv = createCanvas(cnvWidth, cnvHeight);
    relocateCanvas();
    noStroke();
}

//events when window resizes
function windowResized(){
    relocateCanvas();
}

//draw on the canvas
function draw(){
    //need to redraw background every refresh
    background("gray");
    stroke(180);
    strokeWeight(1);
    line(1, 0, 1, cnvHeight);
    
    //left and right button to scroll through plans
    noStroke();
    fill(color('#1e95e9'));
    plnBtn.right();
    plnBtn.left();
    
    //show floor name
    if (plans[scroll]){
        noStroke();
        fill(0);
        textSize(18);
        textAlign(CENTER);
        text(plansShape[scroll].name, cnvWidth/2, 50);
    }
    
    //allow scroll zoom for plans
    scale(drawScale);
    
    //locate property in the center of canvas
    if (propPlan){
        propShape.display();
    }

    //locate first floor according to property
    plansShape[scroll].x = propShape.x;
    plansShape[scroll].y = propShape.y + rIn;
    if (plans[scroll]){
        plansShape[scroll].display();
    }
}


//define property object
function property() {
    this.name = "Property";
    this.w = fIn;
    this.d = dIn;
    this.x = (cnvWidth - this.w) / 2;
    this.y = (cnvHeight - this.d) / 2;
    this.display = function(){
        noFill();
        stroke(0);
        strokeWeight(1);
        rect(this.x, this.y, this.w, this.d)
    };
}

//define first floor object
function flrTyp() {
    this.name = "";
    this.w = fIn;
    this.d = dIn - rIn - sIn;
    this.x = 0;
    this.y = 0;
    this.display = function(){
        fill(255);
        stroke(0, 0, 0);
        strokeWeight(5);
        rect(this.x, this.y, this.w, this.d)
    };
}

//redraw plans when input chagnes
function initPlans(){
    for (var i = 0; i < floors + 2; i++){
        //push number of floors into array, boolean determines visibility
        plans.push(false);
        //push plan geometry class into array and assign name
        plansShape.push(new flrTyp());
        if (i == 0) {
            plansShape[i].name = "Basement";
        } else if (i == floors + 1) {
            plansShape[i].name = "Roof";
        } else {
            plansShape[i].name = toOrdinal(i) + " Floor";
        }
    }
}

//reload parameters when input changes
function initParam(){
	frontage = 16;
	depth = 50;
	rear = Number($("#rear-yard").val());
	setback = 0;
	floors = Number($("#story-num").val());
    
    fIn = frontage * 12;
    dIn = depth * 12;
    rIn = rear * 12;
    sIn = setback * 12;
}

//reload parameters when address input changes
function initProp(){
    propPlan = true;
    propShape = new property();
}

function planButton(){
    var triY = 24;
    var triX = 48;
    var triW = 12;
    var triH = 24;
    this.Rx1 = cnvWidth - triX;
    this.Ry1 = triY;
    this.Rx2 = cnvWidth - triX + triW;
    this.Ry2 = triY + triW;
    this.Rx3 = cnvWidth - triX;
    this.Ry3 = triY + triH;
    this.Lx1 = triX;
    this.Ly1 = triY;
    this.Lx2 = triX - triW;
    this.Ly2 = triY + triW;
    this.Lx3 = triX;
    this.Ly3 = triY + triH;

    this.right = function(){
        triangle(this.Rx1, this.Ry1, this.Rx2, this.Ry2, this.Rx3, this.Ry3);
    }

    this.left = function(){
        triangle(this.Lx1, this.Ly1, this.Lx2, this.Ly2, this.Lx3, this.Ly3);
    }
}

$("#form-submit").on("click", function(){
    //Redraw when 'Analyze' clicked with different parameters
    initParam();
    initProp();
    plans = [];
    plansShape = [];
    initPlans();
    scroll = 1;
    plans[1] = true;
})