
var video;

var VIDEO_WIDTH;
var VIDEO_HEIGHT;

var VERTICAL_PIECES = 3;
var HORIZONTAL_PIECES = 4;

var PIECE_WIDTH;
var PIECE_HEIGHT;

var pieces = [];

function main() {
    video = document.getElementById("sourcevideo");
    VIDEO_WIDTH = video.videoWidth;
    VIDEO_HEIGHT = video.videoHeight;
    PIECE_WIDTH = VIDEO_WIDTH / HORIZONTAL_PIECES;
    PIECE_HEIGHT = VIDEO_HEIGHT / VERTICAL_PIECES;
    
    initCanvas();
    setInterval("drawFrame()", 30);
}

function drawFrame() {
    for (var i in pieces) {
        var piece = pieces[i];
        piece.ctx.drawImage(video, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT, -piece.x, -piece.y, 960, 540);
    }
}

function initCanvas() {
    for (i = 0; i < VERTICAL_PIECES; i++) {
        for (j = 0; j < HORIZONTAL_PIECES; j++) {
            var piece = new Piece();
            piece.x = j*PIECE_WIDTH;
            piece.y = i*PIECE_HEIGHT;
            piece.canvas.className = "outputcanvas";
            piece.canvas.style.top = rand(0, window.innerHeight-PIECE_HEIGHT-100) + "px"; // piece.y+"px";
            piece.canvas.style.left = rand(0, window.innerWidth-PIECE_WIDTH) + "px"; //piece.x+"px";
            
            piece.canvas.setAttribute('height', PIECE_HEIGHT+"px");
            piece.canvas.setAttribute('width', PIECE_WIDTH+"px");
            piece.canvas.style.position = "absolute";
            piece.canvas.setAttribute("id", "c" + (i*HORIZONTAL_PIECES+j));
            piece.canvas.setAttribute('draggable', true);
            piece.canvas.setAttribute('ondragstart', "drag(event)");
            
            document.body.appendChild(piece.canvas);
            pieces.push(piece);
        }
    }
}

function rand(a, b) {
    return Math.floor(Math.random() * b) + a;  
}

function Piece() {
    this.x = 0;
    this.y = 0;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext('2d');
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    console.log(ev.target.tagName);
    console.log(ev.target.childNodes);
    if (ev.target.childNodes.length > 0 || ev.target.tagName != "DIV")
        return; // do not allow stacking more than one in the same placeholder
        
    var data = ev.dataTransfer.getData("text");
    var canvas = document.getElementById(data);
    canvas.style.position = "static";
    ev.target.appendChild(canvas);
}

