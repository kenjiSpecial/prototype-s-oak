require.config({
    shim: {
        jqueryBackstretch: {
            deps: [ 'jquery' ]
        }
    },

    paths: {
        jquery            : '../bower_components/jquery/jquery',
        underscore        : '../bower_components/underscore/underscore',
        preloadjs         : '../bower_components/PreloadJS/lib/preloadjs-0.4.0.min',
        jqueryBackstretch : '../bower_components/jquery-backstretch/jquery.backstretch',
        eventEmitter      : '../bower_components/EventEmitter/EventEmitter',
    }
});

require([ 'imageData', 'jquery', 'mainEvent'], function ( imageData, $, myEvent ) {
    'use strict';

    var $loadCover   = $('#load-cover');

    var $mainWrapper = $('#main-wrapper');
    var $logoImg     = $("#logo-img");
    var $linkWrapper = $("#link-wrapper");


    loading();

    function loading(){

        $loadCover.css({
            width      : window.innerWidth,
            height     : window.innerHeight,
            left       : 0,
            top        : 0
        });

        imageData.load();
    };

    myEvent.addListener( "loadComplete", loaded);

    function loaded(){

        $(".ball").addClass("loaded");
        $.backstretch('images/' + imageData.getBgImage().src );




        setTimeout(function(){
            $loadCover.css({
                width      : 225,
                left       : (window.innerWidth - 225)/2
            });
        }, 800);

        setTimeout(function(){
            $loadCover.css({
                height     : 225,
                top        : (window.innerHeight - 225)/2
            });
        }, 1500);

        setTimeout(function(){
            $loadCover.css({
                opacity: 0
            });
        }, 2200);

        $logoImg.append(imageData.getLogoImage());
        $logoImg.css({
            width      : 225,
            height     : 225,
        });

        $mainWrapper.css({
            width      : 225,
            height     : 225,
            top        : (window.innerHeight - 225)/2,
            left       : (window.innerWidth - 225)/2
        });

        setTimeout(hoverActive, 2200);

    }

    function hoverActive(){
        $mainWrapper.hover(function(){
            $logoImg.addClass("hover");
            $linkWrapper.addClass("hover");

            $(".link-text").removeClass("normal").addClass("active")
            $(".social").removeClass("normal").addClass("active")

        });
    }



});
