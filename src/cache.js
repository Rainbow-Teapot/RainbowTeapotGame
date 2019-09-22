var cache = {

    resources: new Map(),
    numResources:0,
    load: function(tag, source){

        
            /*var body = document.querySelector('body');
            var img = new Image();
            
            cache.insert(tag,img);
            ajax.loadFile(source).then(function(response){ 
                console.log("Width: " + img.width);
                var imgURL = window.URL.createObjectURL(response);
                img.src = imgURL;
                
                body.appendChild(img);
                //img.src = src;      
                //cache.retrieve(tag).loadFlag = true;
                console.log("Se ha cargado de puta madre la imagen");
                

            }, function(Error){
                console.log(Error);
            });*/
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