/*prototipo general para los colores, en rgba*/
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

/*para dotarle de un atributo de color a un rectangulo para representar el nivel*/ 
Color.prototype.toHTML = function(){
    return 'rgba('+this.r +','+this.g+',' +this.b + ',' + this.a + ')';
};

/*variable global para representar un color que se considera no válido,
no se le hace caso a la hora de pintar*/
var TRANSPARENT_COLOR = new Color(0,0,0,0);