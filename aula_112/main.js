var prediction_1 = "";
var prediction_2 = "";

Webcam.set({ width:350, height:300, imageFormat : 'png', pngQuality:90 });
camera = document.getElementById("camera"); 
Webcam.attach('#camera');

function takeSnapshot() 
{ 
    Webcam.snap(function(data_uri) { 
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'; 
    }); 
}

console.log('ml5 version:', ml5.version);
classifier =
ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/7Ouppwmut/model.json',modelLoaded);

function modelLoaded() 
{ 
    console.log('Model Loaded!'); 
}

function speak()
{ 
    var synth = window.speechSynthesis; 
    speakData1 = "A primeira previsão é " + prediction1; 
    speakData2 = "E a segunda previsão é " + prediction2; 
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2); 
    synth.speak(utterThis); 
}

function check() 
{ 
    img = document.getElementById('captured_image'); 
    classifier.classify(img, gotResult); 
}

function gotResult(error, results) 
{
    if (error)
    {
        console.log(error);
    }
    else
    {
        console.log("O valor do result está na linha de baixo");
        console.log(results);
        document.getElementById ("resultEmotionName1").innerHTML = results[0].label;
        document.getElementById ("resultEmotionName2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        console.log(prediction_1);
        console.log(prediction_2);
        speak();
        if(results[0].label=="tranquilo")
        {
            document.getElementById("updateEmoji1").innerHTML = "&#128512";
        }
        if(results[0].label=="legal")
        {
            document.getElementById("updateEmoji1").innerHTML = "U+1F622";
        }
        if(results[0].label=="vitória")
        {
            document.getElementById("updateEmoji1").innerHTML = "128544";
        }
        
        if(results[1].label=="tranquilo")
        {
            document.getElementById("updateEmoji2").innerHTML = "&#128512";
        }
        if(results[1].label=="legal")
        {
            document.getElementById("updateEmoji2").innerHTML = "U+1F622";
        }
        if(results[1].label=="vitória")
        {
            document.getElementById("updateEmoji2").innerHTML = "128544";
        }
    }
}