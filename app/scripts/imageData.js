/*global define */
define([ 'jquery', 'jqueryBackstretch', 'mainEvent', 'bufferLoader','preloadjs', "underscore" ], function ( $, jqueryBackstretch, mainEvent, BufferLoader ) {
    'use strict';



    var ContextClass = (window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.oAudioContext ||
        window.msAudioContext);

    var ImageData = function(){

        this.manifest = ['background.jpg', 'logo.png'];
        this.images = {};


        this.preload = new createjs.LoadQueue(true, "images/");

    };

    ImageData.prototype = {

        load: function(){
            this.preload.loadManifest(this.manifest);
            this.preload.addEventListener("complete", _.bind(this.loadComplete, this));

            var audioFiles;

            if(!Modernizr.firefox && !Modernizr.ios && !Modernizr.android){
                this.audioContext = new ContextClass();

                audioFiles = [
                    'audio/CheersTokyo.mp3',
                    'audio/Tawny.mp3'
                ];

                this.bufferLoader = new BufferLoader(
                    this.audioContext,
                    audioFiles,
                    _.bind( this.finishedLoadComplete, this)
                );

                this.bufferLoader.load();

            }else{
                audioFiles = [
                ];
                this.audioLoadDone = true;
            }





        },

        finishedLoadComplete: function(bufferList){
            this.audioLoadDone = true;

            this.cheerTokyo =  bufferList[0];
            this.tawny      =  bufferList[1];
            console.log(bufferList);
            console.log("finishedLoadComplete");

            if(this.imageLoadDone && this.audioLoadDone){

                mainEvent.emit("loadComplete");
            }

        },

        loadComplete: function(){
            this.imageLoadDone = true;
            console.log("loadComplete");

            if(this.imageLoadDone && this.audioLoadDone) {

                mainEvent.emit("loadComplete");
            }
        },

        getBgImage: function(){
            //return this.preload.getResult(this.manifest[0]);
            return this.preload.getItem(this.manifest[0]);
        },

        getLogoImage: function(){
            return this.preload.getResult(this.manifest[1]);
        },

        playAudio: function(string){
            var audioBuffer;

            if(string == "cheerTokyo"){
                audioBuffer = this.cheerTokyo;
            }else if(string == "tawny"){
                audioBuffer = this.tawny
            }else{
                return;
            }

            this.audioName = string;

            this.source = this.audioContext.createBufferSource();
            this.source.buffer = audioBuffer;

            this.source.connect( this.audioContext.destination );
            this.startTime = this.source.context.currentTime;

            if( Modernizr.safari || Modernizr.ios ){
                this.source.noteOn(0)
            }else{
                this.source.start(0);
            }



        },

        stopAudio: function(){
            this.audioName = null;

            if( Modernizr.safari || Modernizr.ios ){
                this.source.noteOff(0)
            }else{
                this.source.stop(0);
            }

        },

        getAudioDuration: function(){
            return this.source.buffer.duration
        },

        getCurrentDuration: function(){
            return this.source.context.currentTime - this.startTime;
        },

        getCurrentAudioRate : function() {
            return this.getCurrentDuration() / this.source.buffer.duration;
        }
    };



    window.imageDate = new ImageData();

    return imageDate;


});