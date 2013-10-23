/*global define */
define([ 'jquery', 'jqueryBackstretch', 'mainEvent', 'preloadjs', "underscore" ], function ( $, jqueryBackstretch, mainEvent ) {
    'use strict';
    var ImageData = function(){

        this.manifest = ['background.jpg', 'logo.png'];
        this.images = {};

        this.preload = new createjs.LoadQueue(true, "images/");

    };

    ImageData.prototype = {
        load: function(){
            this.preload.loadManifest(this.manifest);
            this.preload.addEventListener("complete", _.bind(this.loadComplete, this));
        },

        loadComplete: function(){

            mainEvent.emit("loadComplete");
        },

        getBgImage: function(){
            //return this.preload.getResult(this.manifest[0]);
            return this.preload.getItem(this.manifest[0]);
        },

        getLogoImage: function(){
            return this.preload.getResult(this.manifest[1]);
        }
    };



    var imageDate = new ImageData();

    return imageDate;
});