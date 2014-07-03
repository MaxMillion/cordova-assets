(function () {
    'use strict';
    var clc = require('cli-color'),
        im = require('imagemagick'),
        mkdirp = require('mkdirp'),
        iconDirectory = './cga/wp8/icons/',
        splashDirectory = './cga/wp8/splashscreens/',
        iconNameList = ['LockIcon', 'ApplicationIcon', 'IconicTileSmall', 'FlipCycleTileSmall', 'IconicTileMedium', 'FlipCycleTileMedium'],
        numOfIcons = iconNameList.length,
        iconDimensions = [38, 99, 110, 159, 202, 336],
        splashScreenNameList = ['~iphone', '@2x~iphone', '-Portrait~ipad', '-@2x~ipad', '-Landscape~ipad', '-Landscape@2x~ipad', '-568h@2x~iphone'],
        splashScreenDimensions = ['99x99', '159x159', '110x110', '1536x2048', '1024x768', '2048x1536', '640x1136'];


    function _generateIcons(input, cb) {
        iconNameList.forEach(function (el, index) {
            var dim = iconDimensions[index];
            im.resize({
                srcPath: input,
                dstPath: iconDirectory + el + '.png',
                width: dim,
                height: dim
            }, function (err, stdout, stderr) {
                if (err) {
                    throw err;
                }
                console.log('Resized ' + input + ' to fit within ' + clc.yellowBright(dim + 'x' + dim) + ' under ' + iconDirectory +  el + '.png');
                if (numOfIcons === 1) {
                    numOfIcons = iconNameList.length;
                    cb();
                }
                else {
                    numOfIcons--;
                }
            });
        });
    }

    // function _generateSplashScreens(input) {
    //     splashScreenNameList.forEach( function(el, index ) {
    //         var dim = splashScreenDimensions[index];
    //         im.convert([input, '-resize', dim, splashDirectory+'Default' + el + '.png'],
    //             function (err, stdout, stderr) {
    //                 if (err) {
    //                     throw err;
    //                 }
    //                 console.log('Resized '+input+ ' to fit within '+dim );
    //             }
    //         );
    //     });
    // }

    function _generate(input, cb) {
        mkdirp(iconDirectory, function (err) {
            if (err) {
                console.error(err);
            }
            else {
                console.log("Created WP8 icon directory.");
                _generateIcons(input, cb);
            }
        });
        // mkdirp(splashDirectory, function (err) {
        //     if (err) {
        //         console.error(err);
        //     }
        //     else {
        //         console.log( "Created Android splashscreen directory.");
        //         _generateSplashScreens(input);
        //     }
        // });
    }

    exports.generate = _generate;

})();