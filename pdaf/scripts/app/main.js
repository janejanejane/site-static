define(['jquery', 'd3', 'app/chart'],
    function($, d3, Chart) {
        console.log('chart?', Chart);
        $(function() {
            console.log('main loaded!');

            var pdaf = pdaf || {};
            pdaf.chart = new Chart($('.container').width(), $(window).height());
            pdaf.chart.initialize('#pdaf-chart');
            pdaf.chart.addData();
        });
    }
);

// define(function(require){
//     var $ = require('jquery'),
//         d3 = require('d3'),
//         // d3tip = require('d3tip'),
//         Chart = require('app/chart');

//     (function($, d3, Chart) {
//         console.log('chart?', Chart);
//         $(function() {
//             console.log('main loaded!');

//             var pdaf = pdaf || {};
//             pdaf.chart = new Chart($('.container').width(), $(window).height());
//             pdaf.chart.initialize('#pdaf-chart');
//             pdaf.chart.addData();
//         });
//     })();
// });