// var brainDatas =
//     [
//         {serie:0, time:0, gamma:1, delta:3, theta:1, beta:2, alpha:1},
//         {serie:0, time:1000, gamma:2, delta:2, theta:1, beta:5, alpha:1},
//         {serie:0, time:2000, gamma:3, delta:1, theta:1, beta:2, alpha:2},
//         {serie:0, time:3000, gamma:4, delta:0, theta:1, beta:2, alpha:2},
//         {serie:0, time:4000, gamma:5, delta:2, theta:1, beta:5, alpha:3},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//         {serie:0, time:5000, gamma:6, delta:1, theta:1, beta:2, alpha:1},
//     ];

var defaultValue = {serie:0, time:0, gamma:0, delta:0, theta:0, beta:0, alpha:0}

// Sort datas by timestamp
function compare(a,b) {
    if (a.time < b.time)
        return -1;
    if (a.time > b.time)
        return 1;
    return 0;
}

brainDatas.sort(compare);

var webChart
var stockChart;

$(function () {

    SetupSpiderWeb();
    //SetupStock();

    var current = 0;
    //Event handler
    $( "#wantedTime" ).change(function() {
        var time = $('#wantedTime').val();
        console.log("Now showing: " + time);
        if(isInt(time))
        {
            seekForData(parseInt(time));
        }
    });
});

function SetupSpiderWeb()
{
    //Spider web diagram
    webChart = new Highcharts.Chart({
        chart: {
            renderTo: 'brainWeb',
            polar: true,
            type: 'spline'
        },

        title: {
            text: 'Brain wave web',
            x: -80
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            categories: [
                'Gamma',
                'Delta',
                'Theta',
                'Beta',
                'Alpha'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
        },

        /*legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 100,
            layout: 'vertical'
        },*/

        series: [{
            name: 'Humain #1',
            data: [0, 0, 0, 0, 0],
            pointPlacement: 'on'
        }]

    });
}

$(function () {
    var seriesOptions = [],
        seriesCounter = 0,

        names = ['Gamma', 'Theta', 'Delta', 'Beta', 'Alpha'],
        // create the chart when all data is loaded
        createChart = function () {

            stockChart = $('#brainStockChart').highcharts('StockChart', {

                rangeSelector: {
                    buttons: [{
                        count: 2000,
                        type: 'millisecond',
                        text: '2S'
                    }, {
                        count: 30000,
                        type: 'millisecond',
                        text: '30S'
                    }, {
                        type: 'all',
                        text: 'All'
                    }],
                    inputEnabled: false,
                    selected: 3
                },

                yAxis: {
                    labels: {
                        formatter: function () {
                            return (this.value > 0 ? ' + ' : '') + this.value + '%';
                        }
                    },
                    plotLines: [{
                        value: 0,
                        width: 2,
                        color: 'silver'
                    }]
                },

                plotOptions: {
                    series: {
                        compare: 'percent',
                        allowPointSelect: true,
                        point: {
                            events: {
                                select: function () {
                                    $('#wantedTime').val(this.x);
                                    seekForData(this.x);
                                    console.log(this.category + ': ' + this.y + ":: :: " + this.x);
                                }
                            }
                        }
                    }
                },

                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                    valueDecimals: 0
                },

                series: seriesOptions
            });
        };

    $.each(names, function (i, name) {

        var data = [];
        $.each(brainDatas, function (index, value) {
            data.push([value.time + index* 100, getFormattedData(value)[i]])
        })

        seriesOptions[i] = {
            name: name,
            data: data
        };

        seriesCounter += 1;

            if (seriesCounter === names.length) {
                createChart();
            }

        /*$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {

            seriesOptions[i] = {
                name: name,
                data: data
            };

            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            seriesCounter += 1;

            if (seriesCounter === names.length) {
                createChart();
            }
        });*/
    });
});

function seekForData(timeToSeek)
{
    if(timeToSeek < brainDatas[0].time)
    {
        updateWebDiagram(defaultValue);
    }
    else
    {
        var current = 0;
        while (current < brainDatas.length - 1 && timeToSeek >= brainDatas[current+1].time)
        {
            current ++;
        }
        updateWebDiagram(brainDatas[current]);
    }
}

function updateWebDiagram(data)
{
    var formattedData = getFormattedData(data);
    webChart.series[0].setData(formattedData);
}


//Helper
function getFormattedData(data)
{
    return [data.gamma,data.delta,data.theta,data.beta,data.alpha];
}

function isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}
