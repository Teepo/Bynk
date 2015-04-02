var VIDEO = {};

VIDEO.run = function() {

    var self = this;

    this.video = null;
    this.localMediaStream = null
    this.active = false;

    this.init = function(cb) {

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

                      if (self.active)
                          return false;

                      self.localMediaStream = localMediaStream;

                      self.video = document.createElement('video');
                      self.video.src = window.webkitURL.createObjectURL(self.localMediaStream);
                      self.video.play();

                      ROOM.header.appendChild(self.video);

                      self.active = true;

                      cb();
                  },
                  function(err) {
                      console.log("The following error occured: " + err);
                  }
              );
        } else {
            console.log("getUserMedia not supported");
        }
    };

    this.kill = function() {
        self.video.remove();

        self.active = false;
    };
};