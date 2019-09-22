function Color(r,g,b,a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
};


Color.prototype.equals = function(color){
    return  this.r == color.r && 
            this.g == color.g &&
            this.b == color.b &&
            this.a == color.a;
            
};

Color.prototype.toHTML = function(){
    return 'rgba('+this.r +','+this.g+',' +this.b + ',' + this.a + ')';
};

var TRANSPARENT_COLOR = new Color(0,0,0,0);