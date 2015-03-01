var VIDEO = function () {};

VIDEO.runner = function() {

    var self = this;

    this.init = function() {

        navigator.getUserMedia = ( navigator.getUserMedia ||
                                   navigator.webkitGetUserMedia ||
                                   navigator.mozGetUserMedia ||
                                   navigator.msGetUserMedia);

        if (navigator.getUserMedia)
        {
            navigator.getUserMedia(
                {
                    video: true,
                    audio: true
                  },
                  function(localMediaStream) {
                      var video = document.querySelector('video');
                      video.src = window.URL.createObjectURL(localMediaStream);
                      video.play()
                  },
                  function(err) {
                      console.log("The following error occured: " + err);
                  }
              );
        } else {
            console.log("getUserMedia not supported");
        }
    };

};