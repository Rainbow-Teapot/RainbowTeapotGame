/*Prototipo mas parceido a un struct que otra cosa, representa una imagenç
y si esta se ha cargado, mas adelante habra que hacerla mas general ya que tambien
debera de representar JSONs, simplemente es un cambio semantico */
function Resource(img){
    this.img = img;
    this.loadFlag = false;
}
