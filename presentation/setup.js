// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,

    theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
    transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

    // Optional libraries used to extend on reveal.js
    dependencies: [
	{ src: 'reveal/lib/js/classList.js', condition: function() { return !document.body.classList; } },
	// { src: 'reveal/plugin/markdown/showdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
	// { src: 'reveal/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
	{ src: 'reveal/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
	{ src: 'reveal/plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
	// { src: 'reveal/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
	// { src: 'reveal/plugin/remotes/remotes.js', async: true, condition: function() { return !!document.body.classList; } }
    ]});

$(document).ready(function() {

    // hack from http://stackoverflow.com/questions/646628/javascript-startswith
    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str){
            return this.slice(0, str.length) == str;
        };
    }
    if (typeof String.prototype.endsWith != 'function') {
        String.prototype.endsWith = function (str){
            return this.slice(-str.length) == str;
        };
    }

    Reveal.addEventListener( 'playvideo', function() {
        var video = document.getElementById("alpha-beta");
        video.currentTime = 0;
        if (video.paused) {video.play();}
    }, false );

    Reveal.addEventListener( 'slidechanged', function( event ) {
        if(event.previousSlide.getAttribute('data-state') === "playvideo") {
            var video = document.getElementById("alpha-beta");
            if (!video.paused) {video.pause();}
        }
    });

    $('#remu, #remv').data('view',false);

    $('#remu, #remv').bind("contextmenu",function(e) {
        e.preventDefault();
    });

    $('#remu, #remv').mousedown(function(event) {
        // convert page offset to image offset and then normalize for
        // the actual width of the image (only works in ff/chrome)
        var x = Math.floor(((event.pageX - $(this).offset().left)/$(this)[0].width)*$(this)[0].naturalWidth);
        var y = Math.floor(((event.pageY - $(this).offset().top)/$(this)[0].height)*$(this)[0].naturalHeight);

        switch (event.which) {
        case 1:
            // toggle boolean
            $(this).data('view',!$(this).data('view'));
            $(this).attr('src',"http://127.0.0.1:8000/"
                         + ($(this).data('view') ? "edge" : "raw")
                         +"/?dataset=c3&slice="
                         + ($(this).attr('id') === "remu" ? "1" : "3")
                        );
            break;

        case 2:
            if($(this).attr('id').endsWith('v')) {
                $.ajax({
                    url : "http://127.0.0.1:8000/reset/?dataset=c3&slice=3",
                    dataType : 'jsonp',
                    complete : function() {
                        $('#remv').attr('src',"http://127.0.0.1:8000/"
                                        + ($('#remv').data('view') ? "edge" : "raw")
                                        +"/?dataset=c3&slice=3&"
                                        + (new Date().getTime()));
                    },
                });
            }
            break;

        case 3:
            if($(this).attr('id').endsWith('v')) {
                var data = {}
                data[($(this).attr('id').startsWith('rem') ? 'removal' : 'addition')] = (x+','+y);
                $.ajax({
                    url : "http://127.0.0.1:8000/local/?dataset=c3&slice=3&dilation=15&size=5",
                    data : data,
                    dataType : 'jsonp',
                    complete : function() {
                        $('#remv').attr('src',"http://127.0.0.1:8000/"
                                        + ($('#remv').data('view') ? "edge" : "raw")
                                        +"/?dataset=c3&slice=3&"
                                        + (new Date().getTime()));
                    },
                });
            }
            break;
        }
    });
});
