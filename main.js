song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
function preload() {
song=loadSound("music.mp3");
}
function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded() {
console.log("Posenet is Initialized!!");
}
function gotPoses(results) {
    if(results.length>0) {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("Score Of Left Wrist Is = "+scoreLeftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);
    }
    
}
function draw() {
    image(video,0,0,600,500);

    fill("#C71585");
    stroke("#C71585");
    if(scoreLeftWrist>0.2) {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
    newVolume=1-volume;
    newVolume=newVolume.toFixed(1);
    document.getElementById("volume").innerHTML="Volume Is ="+newVolume;
    console.log("THE VOLUME IS ="+volume);
    song.setVolume(volume);
    
}
}