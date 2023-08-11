Status = "";
fan_image = "";
objects = [];

function preload(){
    fan_image = loadImage("Fan.jpg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    objectDetector.detect(fan_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    if (Status != undefined) {
        image(fan_image , 0 , 0 , 640 , 420);
        for (var i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill(255,0,0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 5 , objects[i].y + 15);
            noFill();
            stroke(255,0,0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}