var createChartRenderer = require("../../phantom-chartjs").createChartRenderer;
var fs = require("fs");
var path = require("path");
var mkdir = require("mkdir-p");

var outputDir = path.join(__dirname, "output");
mkdir.sync(outputDir);
console.log('going?')
createChartRenderer({ logger: console }, function (err, renderer) {
    if (err) throw err;

    process.on("exit", function () {
        renderer.close();
    });

    var config = {
        width: 620,
        scale: 2,
        chart: {
            type: 'bar',
            data: {
                "labels": [
                    "Cofine",
                    "Marketoid",
                    "Qualitex",
                    "Melbacor",
                    "Intradisk",
                    "Sybixtex",
                    "Illumity",
                    "Danja",
                    "Duflex",
                    "Kongle",
                    "Viocular",
                    "Centregy",
                    "Xyqag",
                    "Ceprene",
                    "Isoplex",
                    "Ewaves",
                    "Primordia",
                    "Norsul",
                    "Kegular",
                    "Phormula",
                    "Isotronic",
                    "Exoteric",
                    "Hivedom",
                    "Kenegy",
                    "Inventure",
                    "Enerforce",
                    "Recognia",
                    "Avenetro",
                    "Xurban",
                    "Xylar",
                    "Zerology",
                    "Medmex",
                    "Turnling",
                    "Idetica",
                    "Enquility",
                    "Jumpstack",
                    "Netplax",
                    "Pyramis",
                    "Strozen",
                    "Aquasure",
                    "Emergent",
                    "Ecstasia",
                    "Recrisys",
                    "Equitax",
                    "Assitia",
                    "Nipaz",
                    "Rodeology",
                    "Genmex",
                    "Knowlysis",
                    "Avit"
                ],
                datasets: [{
                    "backgroundColor": "#ED1752",
                    label: '# of Votes',
                    "data": [
                        1801,
                        2954,
                        4417,
                        4804,
                        3017,
                        1235,
                        3963,
                        1204,
                        4273,
                        4190,
                        2103,
                        4795,
                        86,
                        2595,
                        3363,
                        4664,
                        1970,
                        2200,
                        873,
                        4361,
                        4545,
                        4051,
                        2574,
                        4690,
                        2143,
                        804,
                        3488,
                        868,
                        1901,
                        4451,
                        1874,
                        4722,
                        4439,
                        3540,
                        2668,
                        2446,
                        3007,
                        2939,
                        944,
                        537,
                        2251,
                        686,
                        3691,
                        1496,
                        3196,
                        3452,
                        4318,
                        1782,
                        2808,
                        3524
                    ],
                    highlight: [3, 4]
                }]
            },
            "options": {
                "tooltips": {
                    "mode": "label"
                },
                "scales": {
                    "xAxes": [
                        {
                            "display": false
                        }
                    ],
                    "yAxes": [
                        {
                            "display": false
                        }
                    ]
                },
                "legend": {
                    "display": false
                }
            }
        }
    };

    renderer.renderBuffer(config, function (err, buffer) {
        if (err) throw err;

        var outFile = path.join(outputDir, "output.png");

        fs.writeFile(outFile, buffer, function (err) {
            if (err) throw err;

            console.log("Created " + outFile);
            process.exit(0);
        });
    });
});
