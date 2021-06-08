let notes = document.getElementById('hidden-note-span');


let notes_text = notes.textContent;



let notes_array = [];

for (let i = 0; i < notes_text.length; i++) {
    if((notes_text[i] == '\n') || (notes_text[i] == ' ') || (notes_text[i] == ',')) {
        continue;
    }
    else {
        notes_array.push(notes_text[i]);
    }
}


document.getElementById('note-span').textContent = notes_array[0];



let j = 0;


window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = null;
var isPlaying = false;
var sourceNode = null;
var analyser = null;
var theBuffer = null;
var DEBUGCANVAS = null;
var mediaStreamSource = null;
var pitch;


window.onload = function() {
	audioContext = new AudioContext();
	let MAX_SIZE = Math.max(4,Math.floor(audioContext.sampleRate/5000));	// corresponds to a 5kHz signal
	// var request = new XMLHttpRequest();
    // request.open("GET", "../sounds/whistling3.ogg", true);
    // request.responseType = "arraybuffer";
	// request.onload = function() {
	//   audioContext.decodeAudioData( request.response, function(buffer) { 
	//     	theBuffer = buffer;
	// 	} );
	// }
	// request.send();
    // toggleLiveInput();
    
    // window.setInterval(function() {
    //     toggleLiveInput();
    // }, 500);
    // if (toggleLiveInput() >= 435.000 && toggleLiveInput() <= 445.000) {
    //     console.log('yuh');
    // }

}

function error() {
    alert('Stream generation failed.');
}

function getUserMedia(dictionary, callback) {
    try {
        navigator.getUserMedia = 
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;
        navigator.getUserMedia(dictionary, callback, error);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }
}

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Connect it to the destination.
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    mediaStreamSource.connect( analyser );
    updatePitch();
}

function toggleLiveInput() {
    if (isPlaying) {
        //stop playing and return
        sourceNode.stop( 0 );
        sourceNode = null;
        analyser = null;
        isPlaying = false;
		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
        window.cancelAnimationFrame( rafID );
    }
    getUserMedia(
    	{
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream);
}

var rafID = null;
var tracks = null;
var buflen = 2048;
var buf = new Float32Array( buflen );

var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function noteFromPitch( frequency ) {
	var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
	return Math.round( noteNum ) + 69;
}

function frequencyFromNoteNumber( note ) {
	return 440 * Math.pow(2,(note-69)/12);
}

function centsOffFromPitch( frequency, note ) {
	return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
}


function autoCorrelate( buf, sampleRate ) {
	// Implements the ACF2+ algorithm
	var SIZE = buf.length;
	var rms = 0;

	for (var i=0;i<SIZE;i++) {
		var val = buf[i];
		rms += val*val;
	}
	rms = Math.sqrt(rms/SIZE);
	if (rms<0.01) // not enough signal
		return -1;

	var r1=0, r2=SIZE-1, thres=0.2;
	for (var i=0; i<SIZE/2; i++)
		if (Math.abs(buf[i])<thres) { r1=i; break; }
	for (var i=1; i<SIZE/2; i++)
		if (Math.abs(buf[SIZE-i])<thres) { r2=SIZE-i; break; }

	buf = buf.slice(r1,r2);
	SIZE = buf.length;

	var c = new Array(SIZE).fill(0);
	for (var i=0; i<SIZE; i++)
		for (var j=0; j<SIZE-i; j++)
			c[i] = c[i] + buf[j]*buf[j+i];

	var d=0; while (c[d]>c[d+1]) d++;
	var maxval=-1, maxpos=-1;
	for (var i=d; i<SIZE; i++) {
		if (c[i] > maxval) {
			maxval = c[i];
			maxpos = i;
		}
	}
	var T0 = maxpos;

	var x1=c[T0-1], x2=c[T0], x3=c[T0+1];
	let a = (x1 + x3 - 2*x2)/2;
	let b = (x3 - x1)/2;
	if (a) T0 = T0 - b/(2*a);

	return sampleRate/T0;
}

function updatePitch( time ) {
	var cycles = new Array;
	analyser.getFloatTimeDomainData( buf );
	var ac = autoCorrelate( buf, audioContext.sampleRate );
	// TODO: Paint confidence meter on canvasElem here.

	if (DEBUGCANVAS) {  // This draws the current waveform, useful for debugging
		waveCanvas.clearRect(0,0,512,256);
		waveCanvas.strokeStyle = "red";
		waveCanvas.beginPath();
		waveCanvas.moveTo(0,0);
		waveCanvas.lineTo(0,256);
		waveCanvas.moveTo(128,0);
		waveCanvas.lineTo(128,256);
		waveCanvas.moveTo(256,0);
		waveCanvas.lineTo(256,256);
		waveCanvas.moveTo(384,0);
		waveCanvas.lineTo(384,256);
		waveCanvas.moveTo(512,0);
		waveCanvas.lineTo(512,256);
		waveCanvas.stroke();
		waveCanvas.strokeStyle = "black";
		waveCanvas.beginPath();
		waveCanvas.moveTo(0,buf[0]);
		for (var i=1;i<512;i++) {
			waveCanvas.lineTo(i,128+(buf[i]*128));
		}
		waveCanvas.stroke();
	}

 	if (ac == -1) {
 		// detectorElem.className = "vague";
	 	// pitchElem.innerText = "--";
		// noteElem.innerText = "-";
		// detuneElem.className = "";
		// detuneAmount.innerText = "--";
        // console.log('ac = -1')
 	} else {
	 	// detectorElem.className = "confident";
	 	pitch = ac;
		 console.log(pitch);
        // console.log(pitch, typeof pitch)
        // return pitch;
	 	// pitchElem.innerText = Math.round( pitch ) ;
	 	var note =  noteFromPitch( pitch );
		 console.log(noteStrings[note%12]);

        let current_note = document.getElementById('note-span').textContent;
        
        if (noteStrings[note%12] === current_note) {
            let set = true;

            if (set) {
                set = false;
                j = j + 1;
                document.getElementById('note-span').textContent = notes_array[j];

                if (j === 6) {
                    j = -1;
                }
            }
        }


		// noteElem.innerHTML = noteStrings[note%12];
		// var detune = centsOffFromPitch( pitch, note );
		// if (detune == 0 ) {
			// detuneElem.className = "";
			// detuneAmount.innerHTML = "--";
		// } else {
		// 	if (detune < 0)
		// 		detuneElem.className = "flat";
		// 	else
		// 		detuneElem.className = "sharp";
		// 	detuneAmount.innerHTML = Math.abs( detune );
		// }
        // return pitch;
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = window.webkitRequestAnimationFrame;
	rafID = window.requestAnimationFrame( updatePitch );
}


toggleLiveInput();
