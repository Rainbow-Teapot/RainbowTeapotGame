/*Objeto global para la creación del nivel por medio de imágenes */
var levelParser =  {

    /*se pillan las imagenes ya cargadas por medio de la cache y gracias al tag,
    la posibilidad de que haya varias capas para los tiles también se contempla.
    parseTiles, genera absolutamente todos los tiles de todas las capas del nivel 
    y se lo endosa al nivel automaticamente por medio del constructor del Tile*/
    parseTiles : function( src, scene){
        
        var img;
        scene.tileLayer = new Array(scene.numLayers);
        console.log(scene.tileLayer);
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        for(let i = 0; i < scene.numLayers; i++){
            context.clearRect(0,0, canvas.width, canvas.height);
            img = cache.retrieve(src + i).img;
            context.drawImage(img,0,0);
            //tiles[i] = new Array(img.width * img.height);  
            scene.tileLayer[i] = new Layer();

            for(let j = 0; j < img.height; j++){
                for(let k = 0; k < img.width; k++){

                    let color = context.getImageData(k,j,1,1).data;

                    //Aquí actuaría la factoria
                    new Tile(scene,k*32,j*32,32,32,color,i);
                    
                }
            }
        }

        console.log("Se han parseado de puta madre");

    },

    /*igual que parseTile pero referente a la capa de objetos, los objetos se añaden 
    a la escena por medio del constructor*/
    parseObjects : function(src, scene){
        var img;
        var objects = new Array();
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        
        context.clearRect(0,0, canvas.width, canvas.height);
        img = cache.retrieve(src + 0).img;
        context.drawImage(img,0,0);
        //tiles[i] = new Array(img.width * img.height);  
        for(let j = 0; j < img.height; j++){
            for(let k = 0; k < img.width; k++){

                let color = context.getImageData(k,j,1,1).data;
                let colorObj = new Color(color[0], color[1], color[2], color[3]);

                //Aquí actuaría la factory
                if(colorObj.equals(new Color(0,0,0,255))){
                    let sprite = new Sprite(scene,k*32,j*32,0);
                    let player = new Player(scene,k*32, j* 32, sprite);
                    scene.player = player;
                }
            }
        }
        console.log(objects);
        return objects;
    }
};