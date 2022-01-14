
function preload(){

    classifier = ml5.imageClassifier("Doodle Net");
    }
    
function setup(){
    canvas = createCanvas(350, 350);
    canvas.position(550, 300)
    background("white");
    canvas.mouseReleased(classifyCanvas);
    

}

function updateCanvas(){
    background("white");
    random_number = Maths.floor((Math.random()*quick_draw_data_set.lenght)+1);
    console.log(quick_draw_data_set[random_number]);
    sketch = quick_draw_data_set[random_number];
    document.getElementById("sketch_name").innerHTML = "Sketch to be drawn"+ sketch;
}



function draw(){


    strokeWeight(13);
    stroke(0);
    
    if (mouseIsPressed){
        
      line(pmouseX, pmouseY, mouseX, mouseY);

    }
    
    check_sketch()
    if( draw_sketch == sketch){
      answer_holder = "set"
      score ++;
      document.getElementById("score").innerHTML = "score =" + score;

  }
}


function check_sketch(){
    timer_counter ++;
    document.getElementById("time").innerHTML = "Time = " + timer_counter;
    console.log(timer_counter);
    if(timer_counter > 400){
        timer_counter = 0;
        timer_check = "completed";

    }

    if(timer_check == "completed" && answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);

}

function gotResult(error, results){

    if (error){
        console.error(error);
    }
    else{
    console.log(results);
    document.getElementById("label").innerHTML = "Label:" + results[0].label;

    document.getElementById("confidence").innerHTML = "Confidence:" + Math.round(results[0].confidence * 100) + "%";
    

    }
}