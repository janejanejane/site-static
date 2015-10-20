requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        app: '../app',
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
        d3: '//d3js.org/d3.v3.min'
    },
    waitSeconds: 15
});

requirejs(['app/main']);