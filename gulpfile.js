var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
var webpack = require("webpack");
var del = require('del');
var imagemin = require('gulp-imagemin');

var paths = {
    scripts: 'src/**/*.js',
    styles: 'src/css/**/*',
    images: 'src/img/**/*',
    index: 'src/templates/index.html'
};



var dest = {index: 'build/', public: 'build/public/'};

var watch = false;

gulp.task("webpack", ['cleanPublic'], function(cb) {
    var started = false;
    var config = require('./webpack.config.js');
    var compiler = webpack(config);
    compile = function(err, stats) {
        if (err) {
            throw new console.error('webpack', err);
        }
        console.log('[webpack]', watch && started ? 'rebuild' : stats.toString({colors: true}));

        var jsonStats = stats.toJson();
        if (watch && started && jsonStats.errors.length > 0) {
            console.log('[webpack]', jsonStats.errors);
        }

        if (!started) {
            started = true;
            return cb();
        }
    };

    watch ? compiler.watch(300, compile) : compiler.run(compile);
});

gulp.task('images', ['clean'], function() {
    return gulp.src('src/img/**/*')
            .pipe(imagemin({optimizationLevel: 5}))
            .pipe(gulp.dest('build/img'));
});

gulp.task('clean', ['cleanIndex', 'cleanPublic']);

gulp.task('cleanIndex', function(cb) {
    del(dest.index, cb);
});

gulp.task('cleanPublic', function(cb) {
    del(dest.public, cb);
});

gulp.task('default', ['build']);

gulp.task('index', ['cleanIndex'], function () {
    return gulp.src(paths.index).pipe(gulp.dest(dest.index));
});

gulp.task('build', ['index', 'webpack', 'images']);

gulp.task('watch', function() {
    watch = true;
    gulp.watch(paths.index, ['index']);
});


gulp.task('start', ['watch', 'build' ], function() {
    var express = require('express');
    var proxy = require('express-http-proxy');
    var app = express();
    app.use(['/public', '/img'], express.static(dest.index));
    app.use('/', express.static(dest.index));
    app.use('/api', proxy('localhost:9999', {
        forwardPath: function(req, res) {
            return require('url').parse(req.url).path;
        }
    }));
    app.use('/*', function (req, res, next) {
        res.sendFile('/index.html', { root: dest.index });
    });
    var server  = require('http').createServer(app);
    server.listen(3000, '0.0.0.0', function() { console.log('listening on localhost 3000')});

});
