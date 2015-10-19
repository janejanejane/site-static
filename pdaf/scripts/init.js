requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        app: '../app',
        jquery: '/bower_components/jquery/dist/jquery',
        d3: '//d3js.org/d3.v3.min'
    },
    waitSeconds: 15
});

requirejs(['app/main']);