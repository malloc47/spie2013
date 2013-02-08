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

    // for video
/*    Reveal.addEventListener( 'playvideo', function() {
        var video = document.getElementById("alpha-beta");
        video.currentTime = 0;
        if (video.paused) {video.play();}
    }, false );

    Reveal.addEventListener( 'slidechanged', function( event ) {
        if(event.previousSlide.getAttribute('data-state') === "playvideo") {
            var video = document.getElementById("alpha-beta");
            if (!video.paused) {video.pause();}
        }
    }); */

    // for demo
    // remu = new embed.Workspace($('#remu'),'c3-demo','0','none');
    // remv = new embed.Workspace($('#remv'),'c3-demo','1','removal',5,15);
    // addu = new embed.Workspace($('#addu'),'c2-demo','0','none');
    // addv = new embed.Workspace($('#addv'),'c2-demo','1','addition',5,15);
});
