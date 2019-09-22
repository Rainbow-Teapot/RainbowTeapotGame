var levelParser =  {

    parseTiles : function( src, numLayers){
        var tiles = new Array(numLayers);
        var img;
        
        console.log(tiles);
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        for(let i = 0; i < numLayers; i++){
            context.clearRect(0,0, canvas.width, canvas.height);
            img = cache.retrieve(src + i).img;
            context.drawImage(img,0,0);
            //tiles[i] = new Array(img.width * img.height);  
            tiles[i] = new Layer();
            for(let j = 0; j < img.height; j++){
                for(let k = 0; k < img.width; k++){

                    let color = context.getImageData(k,j,1,1).data;
                    let tile = new Rectangle(k*32,j*32,32,32,color);
                    //tiles[i][j * img.width + k] = tile;
                    tiles[i].addElement(tile);
                }
            }
        }

        /*for(let i = 0; i < numLayers; i++){
            for(let j = 0; j < img.width; j++){
                for(let k = 0; k < img.height; k++){

                    let color = context.getImageData(k,j,1,1).data;
                    let tile = new Rectangle(k*32,j*32,32,32,color);
                    tiles[i][j * img.width + k] = tile;
                }
            }
        }*/

        console.log(img.width + " and " + img.height);
        
        //cargar imagen, leer imagen, crear tile con el color y meterlo en la lista
        console.log("Se han parseado de puta madre");
        //console.log(JSON.stringify(tiles));
        return tiles;
    }
};