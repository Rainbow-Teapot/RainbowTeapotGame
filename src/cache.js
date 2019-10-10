/*ojeto global para acceder a los archivos cargados, los archivos se guardan en un mapa*/
var cache = {

    resources: new Map(),
    numResources:0,
    /*cargar resources, asignandole una etiqueta string para luego referirse a ellos,
    devuelve una promesa para saber si se ha cargado bien o ha habido algún problema.
    Por ahora solo carga imagenes, es posible que haya que ampliarlo con un switch
    para cargar JSONs*/
    load: function(tag, source){
        
        let img = new Image();
        cache.insert(tag,img);
        return new Promise((resolve, reject) => {
            
            img.addEventListener('load', e => resolve(img));
            img.addEventListener('error', () => {
                reject(new Error(`Failed to load image's URL: ${source}`));
            });
            img.src = source;
            
        });
        
    },
    /*crea un resource y lo mete en el mapa*/
    insert: function(tag, img){
        var resource = new Resource(img);
        cache.resources.set(tag,resource);
    },
    remove: function(tag){
        cache.resources.delete(tag);
    }, 
    retrieve: function(tag){
        return cache.resources.get(tag);
    }

}