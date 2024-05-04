//===================================================================================
//========================  Basic Parameters    =====================================

//No of Colors:
var noCol=5;

//Color Ranges (each 0 - 255)
var minR=0
var maxR=255
var minG=0
var maxG=255
var minB=0
var maxB=255

//No of Sectors: (a factor of 360)
var sections=12

//No of Lines per sector:
var MinLine=30
var MaxLine=40

//=====================================================================================
//=====================================================================================

// Create a new document
var doc = app.documents.add(null,1100,1100);

var min=400
var max=400
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Basic line details ====================================================================
var startX = 0;
var startY = 0;

var newX=getRandomNumber(0,400);
var newY=getRandomNumber(0,400);
var strokeWidth

//=============================================================================
var selection 

var group1 =doc.groupItems.add() //set of lines
var group2 =doc.groupItems.add() //set of line groups

//Color generating 
function rndCol() {
    var obj={}
    obj.r = Math.floor(Math.random() * (maxR - minR + 1)) + minR;
    obj.g = Math.floor(Math.random() * (maxG - minG + 1)) + minG;
    obj.b = Math.floor(Math.random() * (maxB - minB + 1)) + minB;

    return obj
}

var colArr=[]

for (var i = 0; i < noCol+1 ; i++) {
    var x=rndCol()
    colArr.push(x)
}


// Draw first line ========
var numLines = Math.floor(getRandomNumber(MinLine,MaxLine))
for (var i = 0; i < numLines; i++) {

    //colors
    var index=Math.floor(Math.random() * ((noCol-1) - 0 + 1)) + 0;
    var red = colArr[index].r
    var green = colArr[index].g
    var blue = colArr[index].b
    var randomColor = new RGBColor();
    randomColor.red = red;
    randomColor.green = green;
    randomColor.blue = blue;

    //width
    strokeWidth=getRandomNumber(0,4)

    //drawing line
    var line = doc.pathItems.add();
    line = group1.pathItems.add();
    line.setEntirePath([[startX ,startY], [newX, newY]]);
    line.strokeColor = randomColor;
    line.strokeWidth = strokeWidth;

    //position next coordinates
    startX=newX
    startY=newY

    newX=getRandomNumber(0,400);
    newY=getRandomNumber(0,400);
}
//=========================================================================================

group1.selected = true;//select the line group

selection= app.activeDocument.selection;
var duplicateGroup = selection[0].duplicate();

var rotateAngle = 360/sections; 
var pivotPoint = new Array(400,400); // I don't know why this is needed

// Rotation ===================================================================================
for (var i = 0; i < sections+1; i++) {
    duplicateGroup.selected=true;
    duplicateGroup = duplicateGroup.duplicate(); // Duplicate the duplicate to rotate a fresh copy
    duplicateGroup.rotate(rotateAngle, true, true, true, true, Transformation.DOCUMENTORIGIN, pivotPoint);
}

//Select all groups to add them into a new group.
for (var i = 0; i < selection.length; i++) {
    var selectedObject = selection[i];
    selectedObject.move(group2, ElementPlacement.INSIDE); // Move the object into the group
}
//send the whole in to middle , since it rotated around 0,
group2.translate(550, 550);
selection=null;
duplicateGroup=group2.duplicate()
duplicateGroup.selected=true

applyTM (app.activeDocument.selection[0],1,0,0,-1);

//Transform matrix function to reflect===============================================================
function applyTM(tg, a, b, c, d) {
    var tm = new Matrix();
    tm.mValueA = a;
    tm.mValueB = b;
    tm.mValueC = c;
    tm.mValueD = d;
    tm.mValueTX = 0;
    tm.mValueTY = 0;
    tg.transform(tm,true,true,true,true,1);
    app.redraw();
    //Verticle : applyTM (app.activeDocument.selection[0],-1,0,0,1);
    //Horizontal : applyTM (app.activeDocument.selection[0],1,0,0,-1);
}
