prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');
 function take_snapshot(){
     Webcam.snap(function(data_uri){
         document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

     });
 }
 console.log('ml5 version:', ml5.version);

 classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/train/image/10FUoN7jkbR-VJcsRueNtbDowfeNMLpRh.json', modelLoaded);
 function modelLoaded(){
     console.log('Model Loaded!');
 }

 function speak(){
     var synth = window.speechSynthesis;
     speak_data_1 = "The first prediction is - " + prediction_1;
     speak_data_2 = "And the second prediction is - " +prediction_2;
     var utterThis = new SpeechSynthesisUtterance (speak_data_1 + speak_data_2);
     synth.speak(utterThis);
 }

function check(){
     img = document.getElementById('captured_image');
     classifier.classify(img, gotResult);
}

function gotResult(error, result){
    if(error){
        console.error(error);
    }

    else{
        console.log (result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;

        prediction_1 = result[0].label;
        prediction_2 = result[1].label;

        speak();

        if (result[0].label == "thumbsup"){
            document.getElementById("update_emoji").innerHTML = "👍";
        }
        
        if (result[0].label == "victory"){
            document.getElementById("update_emoji").innerHTML = "✌";
        }
        
        if (result[0].label == "fingerscrossed"){
            document.getElementById("update_emoji").innerHTML = "🤞";
        }
        
        
        
        if (result[1].label == "thumbsup"){
            document.getElementById("update_emoji2").innerHTML = "👍";
        }

        if (result[1].label == "victory"){
            document.getElementById("update_emoji2").innerHTML = "✌";
        }

        if (result[1].label == "fingercrossed"){
            document.getElementById("update_emoji2").innerHTML = "🤞";
        }
    }
}