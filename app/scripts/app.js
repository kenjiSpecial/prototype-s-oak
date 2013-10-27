define(
    [
        'jquery',
        'imageData',
        'underscore'

    ],

    function ($, data) {
        var LinkWrapperApp = function () {
            this.el = document.getElementById("link-wrapper");
            this.$el = $(this.el);

            if (!Modernizr.firefox && !Modernizr.ios && !Modernizr.android) {
                this.$el.delegate(".audio", "click", _.bind(this.playAndStopAudio, this));
            }


            this.$el.delegate(".link-text", "mouseenter", _.bind(this.linkTextMouseEnter, this));
            this.$el.delegate(".link-text", "mouseleave", _.bind(this.linkTextMouseLeave, this));


            this.playStatus = {cheerTokyo: false, tawny: false};

            this.canvasSize = { width: 225, height: 75 };

            // canvas

            this.audioTokyoCanvas = document.getElementById("audio-tokyo");
            this.audioTokyoCanvas.width = this.canvasSize.width;
            this.audioTokyoCanvas.height = this.canvasSize.height;
            this.audioTokyoContext = this.audioTokyoCanvas.getContext("2d");

            this.audioTawnyCanvas = document.getElementById("audio-tawny");
            this.audioTawnyCanvas.width = this.canvasSize.width;
            this.audioTawnyCanvas.height = this.canvasSize.height;
            this.audioTawnyContext = this.audioTawnyCanvas.getContext("2d");

            this.audioPlayerData = {width: 200, height: 1, top: 60, left: 25 / 2};

            this.playLoopHandler = _.bind(this.playLoop, this);

            this.playStatus = false;

        };

        LinkWrapperApp.prototype = {
            currentContext: null,
            currentAudio: null,

            init: function () {


            },

            playAndStopAudio: function (event) {
                var $target;


                if (Modernizr.safari) {
                    $target = $(event.target).parent();
                } else {
                    $target = $(event.target).parent().parent();
                }


                var audioName = $target.attr("audio-name");

                if (audioName && audioName == data.audioName) {

                    // stop
                    data.stopAudio();
                    this.playStatus[audioName] = false;
                    this.playStatus = false;

                    $target.find(".icon-wrapper").removeClass("stop").addClass("play");

                } else {

                    // play
                    if (this.currentAudio) {
                        data.stopAudio();
                        this.currentContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
                        var $currentaudioTarget;
                        switch (this.currentAudio) {
                            case "cheerTokyo":
                                $currentaudioTarget = this.$el.find("#tokyo-audio-icon");
                                $currentaudioTarget.removeClass("playingOut");
                                $currentaudioTarget.find(".stop").removeClass("stop").addClass("play");
                                break;
                            case "tawny":
                                $currentaudioTarget = this.$el.find("#tawny-audio-icon");
                                $currentaudioTarget.removeClass("playingOut");
                                $currentaudioTarget.find(".stop").removeClass("stop").addClass("play");
                                break;
                        }
                    }


                    $target.find(".icon-wrapper").removeClass("play").addClass("stop");

                    data.playAudio(audioName);

                    // playStatus
                    switch (audioName) {
                        case "cheerTokyo":
                            this.currentContext = this.audioTokyoContext;
                            break;
                        case "tawny":
                            this.currentContext = this.audioTawnyContext;
                            break;
                    }

                    this.playStatus = true;
                    this.currentAudio = audioName;
                    this.playLoop();
                }


                event.preventDefault();
            },

            playLoop: function () {

                this.currentContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);


                if (this.playStatus) {

                    var size = data.getCurrentAudioRate() * this.audioPlayerData.width;

                    this.currentContext.fillStyle = "rgb(186, 156, 121)";
                    this.currentContext.fillRect(this.audioPlayerData.left, this.audioPlayerData.top, this.audioPlayerData.width, this.audioPlayerData.height);

                    this.currentContext.fillStyle = "rgb(101,78,51)";
                    this.currentContext.fillRect(this.audioPlayerData.left, this.audioPlayerData.top, size, this.audioPlayerData.height);

                    requestAnimFrame(this.playLoopHandler);

                }

            },

            linkTextMouseEnter: function (event) {

                if (Modernizr.ios || Modernizr.android) {

                    return;
                }

                var $currentTarget = $(event.currentTarget);
                $currentTarget.addClass("mouse-enter");


                //var audioName =  $currentTarget.find(".audio").attr("audio-name");


                if (this.playStatus) {
                    $currentTarget.find('.audio').removeClass("playingOut");
                }
            },

            linkTextMouseLeave: function (event) {

                if (Modernizr.ios || Modernizr.android) {
                    return;
                }

                var $currentTarget = $(event.currentTarget);
                $currentTarget.removeClass("mouse-enter");


                if (this.playStatus) {
                    $currentTarget.find('.audio').addClass("playingOut");
                }
            },

            mouseLeave: function () {
                if (this.playStatus) {
                    var self = this;

                    $("div.audio").each(function () {
                        var $this = $(this);
                        var audioName = $this.attr("audio-name");

                        if (audioName != self.currentAudio) {

                            $this.removeClass("playingOut");
                        }

                    });

                }
            }

        }

        var linkWrapperApp = new LinkWrapperApp();

        return linkWrapperApp;
    }
);