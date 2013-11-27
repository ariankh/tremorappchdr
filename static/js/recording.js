var x_samples = [];
var y_samples = [];
var z_samples = [];
var x_charting_samples = [];

var totalSamples = {};


function gather_samples () {
	var timestamp = Date.now();
	key = String(timestamp);

	totalSamples[key] = ({
        "x" : x_samples,
        "y" : y_samples,
        "z" : z_samples
    });


	x_samples = [];
	y_samples = [];
	z_samples = [];
}

// var x_dom = $('.x');
// var y_dom = $('.y');
// var z_dom = $('.z');


window.dataToDraw = [];
var frameReq;

var startTracking = function () {

	window.ondevicemotion = function(event) {
		var x = event.acceleration.x;
		var y = event.acceleration.y;
		var z = event.acceleration.z;
		// x_dom.html(x);
		// y_dom.html(y);
		// z_dom.html(z);

		x_samples.push(x);
		y_samples.push(y);
		z_samples.push(z);

		// sendData(JSON.stringify(x))

		if (x_samples.length == 20) {
		gather_samples();

		dataToDraw.push(x);
		if (frameReq) {cancelAnimationFrame(frameReq);}
		frameReq = requestAnimationFrame(tick);


		}
	};
};
   
 $(document).ready(function() {
				console.log('ready!');
			});

 $("#submit").click(function (e) {
	console.log("Things finished");
	e.preventDefault(); //Overrides submit button defaults
	clearInterval(window.gatherTimer);
	console.log(totalSamples);
	window.ondevicemotion = undefined;
	outbox.send(JSON.stringify({"samples": totalSamples}));
});
