function canvasGradient(ctx, dimensions, stops) {
	var gradient = ctx.createLinearGradient(dimensions.x0, dimensions.y0, dimensions.x1, dimensions.y1);
	for (var i = 0; i < stops.length; i++) {
		gradient.addColorStop(stops[i].offset, stops[i].color);
	}
	return gradient;
}

Array.prototype.fill = function (val) {
	for (var i = 0; i < this.length; i++) {
		this[i] = val;
	}
	return this;
};

var highlightStops = [{ offset: 0, color: '#E9127D' }, { offset: 0.98, color: '#ED1752' }];
var gradientStops = [{ offset: 0, color: '#968CFF' }, { offset: .54, color: '#36D1DC' }, { offset: 1.0, color: '#00CDAC' }];
var gradientDims = { x0: 0, y0: 0, x1: 0, y1: 400 };

function baseRenderChartJS(canvas, chart) {

	var ctx = document.getElementById("canvas-id").getContext("2d");
	//     function arrayFill (array, val){
	//         for (var i = 0; i < array.length; i++){
	//             array[i] = val;
	//         }
	//         return array;
	//     };

	//     var highlightGradient = canvasGradient(ctx, gradientDims, highlightStops);
	//     var gradient = canvasGradient(ctx, gradientDims, gradientStops);
	//    // chart.data.datasets[0].backgroundColor = gradient;

	//    var color = new Array(chart.data.datasets[0].data.length);
	//    //color.fill(gradient);
	//    arrayFill(color, gradient);
	//    var highlight = chart.data.datasets[0].highlight;
	//    for (var i = 0; i < highlight.length; i++ ) {
	//        color[highlight[i]] = highlightGradient;
	//    }
	//     chart.data.datasets[0].backgroundColor = color;

	console.log('chart render: ');
	console.log(JSON.stringify(chart, null, 4));

	new Chart(ctx, chart);
}

function chartJSData(rezza_chart, ctx) {



	return chart;
}

function renderChartJS(rezza_chart, selector, highlights) {

	var ctx = document.getElementById(selector).getContext("2d");
	var chart = {}
	chart.type = 'bar';//rezza_chart.charttype ? rezza_chart.charttype : 'bar';
	var labels = rezza_chart.xaxisTicks;

	var data = {};
	data.labels = labels;
	var datasets = [];

	var highlightGradient = canvasGradient(ctx, gradientDims, highlightStops);
	var gradient = canvasGradient(ctx, gradientDims, gradientStops);

	for (var i = 0; i < rezza_chart.series.length; i++) {

		var series = rezza_chart.series[i];
		var dataset = {};
		dataset.label = series.legendTitle;

		var sigIndexes = [];
		if (series.highlight) {
			for (var h = 0; h < series.highlight.length; h++) {
				var x = series.highlight[h].x;
				sigIndexes.push(x);
			}
		}

		var color = new Array(labels.length + 1);
		color.fill(gradient);

		var hoverColor = new Array(labels.length + 1);
		hoverColor.fill(gradientStops[0].color);

		for (var h = 0; h < sigIndexes.length; h++) {
			var ind = sigIndexes[h];
			color[ind] = highlightGradient;
			hoverColor[ind] = highlightStops[0].color;
		}
		
		if (highlights) {
			for (var h = 0; h < highlights.length; h++) {
				var ind = highlights[h];
				color[ind] = highlightGradient;
				hoverColor[ind] = highlightStops[0].color;
			}
		}

		dataset.backgroundColor = color;
		dataset.data = series.values || series.y;

		datasets.push(dataset);
	}

	data.datasets = datasets;
	chart.data = data;
	chart.options = {
		responsive: false,
		animation: false,
		tooltips: {
			mode: "label"
		},
		scales: {
			xAxes: [
				{
					display: false
				}
			],
			yAxes: [
				{
					display: false
				}
			]
		},
		legend: {
			display: false
		}
	}
	console.log(JSON.stringify(chart, null, 4));

	return new Chart(ctx, chart);
}


var CHART_ELLIPSIS = '…';
var CHART_LABEL_LIMIT = 14;
var chartJSBaseOptions = {
	responsive: true,
	maintainAspectRatio: false,
	animation: {
		duration: 10,
	},
	tooltips: {
		callbacks: {
			title: function () {
				return "";
			},
			label: function (tooltipItem, data) {
				return data.labels[tooltipItem.index];
			},
			afterLabel: function (tooltipItem, data) {
				//return data.labels[tooltipItem.index];
			}
		}
	},
	legend: { display: false },
	scales: {
		yAxes: [{
			gridLines: { display: false },
			ticks: {
				beginAtZero: true
			}
		}],
		xAxes: [{
			gridLines: { display: false },
			ticks: {
				callback: function (value) {
					return (value.length < CHART_LABEL_LIMIT) ? value : value.substr(0, CHART_LABEL_LIMIT - 1) + CHART_ELLIPSIS;
				}
			}
		}]
	}
}

var chartJSStackedBarOptions = JSON.parse(JSON.stringify(chartJSBaseOptions));
// chartJSStackedBarOptions.scales.xAxes[0].stacked = true;
// chartJSStackedBarOptions.scales.yAxes[0].stacked = true;

var chartJSSparklineOptions = {
	tooltips: {
		mode: 'label'
	},
	scales: {
		xAxes: [{
			display: false
		}],
		yAxes: [{
			display: false
		}],
	}, // scales
	legend: { display: false }
}

var CHARTJS_OPTS = {
	'bar': chartJSBaseOptions,
	'sparkline': chartJSSparklineOptions,
	'adjacentbar': chartJSBaseOptions,
	'stackedbar': chartJSBaseOptions
}
