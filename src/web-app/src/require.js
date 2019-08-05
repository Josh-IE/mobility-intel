requirejs.config({
    paths: {
        'jstat': 'node_modules/jstat/dist/jstat.min'
    },
    shim: {
        jstat: {
            exports: ['j$', 'jStat'],
            init: function () {
                return {
                    j$: j$,
                    jStat: jStat
                };
            }
        }
    }
});