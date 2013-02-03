var embed = function(){
    "use strict";

    var server = "http://127.0.0.1:8000";
    var view_lookup = {'raw' : 'edge',
                       'edge': 'raw',};

    function tuplesToStr(l) {
	var output = '';
	for (var i=0; i<l.length; i++) {
	    for (var j=0; j<l[i].length; j++) {
		output += l[i][j].toString()+',';
	    }
	    // switch comma to semicolon
	    output = output.slice(0,-1)+";";
	    // output += l[i][0].toString()+','+l[i][1].toString()+';';
	}
	// don't grab last ";"
	if(output[output.length-1] == ';') {
	    return output.substr(0,output.length-1);
	}
	else {
	    return output;
	}
    };

    function Workspace(workspace,dataset,slice,mode,size,dilation) { 
        this.view = 'raw';
        this.mode = mode;
        this.workspace = workspace;
        this.dataset = dataset;
        this.slice = slice;
        this.size = size;
        this.dilation = dilation;
        this.reload();
        // disable right-click menu
        this.workspace.bind("contextmenu",function(e) {
            e.preventDefault();
        });

        var newobj = this;
        this.workspace.mousedown(function(event) {
            // convert page offset to image offset and then normalize for
            // the actual width of the image (only works in ff/chrome)
            var x = Math.floor(((event.pageX - $(this).offset().left)/$(this)[0].width)*$(this)[0].naturalWidth);
            var y = Math.floor(((event.pageY - $(this).offset().top)/$(this)[0].height)*$(this)[0].naturalHeight);
            if(event.which == 1) newobj.left(x,y);
            if(event.which == 2 && mode != 'none') newobj.middle(x,y);
            if(event.which == 3 && mode != 'none') newobj.right(x,y);
        });
    }

    Workspace.prototype.reload = function() {
        this.workspace.attr('src',
                            server 
                            + '/' 
                            + this.view
                            +"/?dataset="
                            + this.dataset
                            + "&slice="
                            + this.slice
                            + "&"
                            + (new Date().getTime()));
    };

    Workspace.prototype.left = function(x,y) {
        this.view = view_lookup[this.view];
        this.reload();
    };

    Workspace.prototype.right = function(x,y) {
        self = this;
        var data = { 'dataset' : self.dataset,
                     'slice'   : self.slice,
                     'size'    : self.size,
                     'dilation': self.dilation,};
        data[self.mode] = tuplesToStr([[x,y]]);
        $.ajax({
            url : server + '/local/',
            data : data,
            dataType : 'jsonp',
            complete : function() {self.reload()},
        });
    };

    Workspace.prototype.middle = function(x,y) {
        self = this;
        $.ajax({
            url : server + '/reset/',
            data : { 'dataset' : self.dataset,
                     'slice'   : self.slice,},
            dataType : 'jsonp',
            complete : function() { self.reload()},
        });
    };

    return { Workspace : Workspace };
    
}();
