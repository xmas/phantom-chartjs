var createChartRenderer = require("../../phantom-chartjs").createChartRenderer;
var fs = require("fs");
var path = require("path");
var mkdir = require("mkdir-p");

var singleBar = require("./singleBar.json");

function chartJSData(rezza_chart) {
    var config = {
        width: 620,
        scale: 2
    }

    var chart = {}
    chart.type = 'bar';//rezza_chart.charttype ? rezza_chart.charttype : 'bar';
    var labels = rezza_chart.xaxisTicks;

    var data = {};
    data.labels = labels;
    var datasets = [];
    for (var i = 0; i < rezza_chart.series.length; i++) {
        var series = rezza_chart.series[i];
        var dataset = {};
        dataset.label = series.legendTitle;

        var sigIndexes = [];
        for (var h = 0; h < series.highlight.length; h++) {
            var x = series.highlight[h].x;
            sigIndexes.push(x);
        }
        var color = '#ED1752';

        dataset.backgroundColor = color;
        dataset.data = series.values;

        datasets.push(dataset);
    }
    data.datasets = datasets;
    chart.data = data;
    chart.options = {
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

    config.chart = chart;

    return config;
}

var outputDir = path.join(__dirname, "output");
mkdir.sync(outputDir);
console.log('going?')
createChartRenderer({ logger: console }, function (err, renderer) {
    if (err) throw err;

    process.on("exit", function () {
        renderer.close();
    });


    var wrap = {
        width: 620,
        scale: 2,
        rezza_chart: singleBar,
        chart: {options : {}}
    }

    // var config = chartJSData(singleBar);
    // console.log('----------')
    // console.log(JSON.stringify(config, null, 4));
    // console.log('----------')


    renderer.renderBuffer(wrap, function (err, buffer) {
        if (err) throw err;

        var outFile = path.join(outputDir, "metric.png");

        fs.writeFile(outFile, buffer, function (err) {
            if (err) throw err;

            console.log("Created " + outFile);
            process.exit(0);
        });
    });
});
