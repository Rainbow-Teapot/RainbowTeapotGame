function TileFactory(scene, tileMap, palette){
    this.factoryMap = new Map();
    this.createFactory(scene, tileMap, palette);
    console.log(this.factoryMap);
}

TileFactory.prototype.createFactory = function(scene, tileMap, palette){
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    let img = cache.retrieve(palette).img;
    context.drawImage(img,0,0);
    
    for(let i = 0; i < img.height; i++){
        for(let j = 0; j < img.width; j++){
            console.log("jaja si");
            let color = context.getImageData(j,i,1,1).data;
            let colorObj = new Color(color[0], color[1], color[2], color[3]);
            if(!colorObj.equals(BLACK_COLOR)){
                
                let tileInfo = { scene: scene,
                                img: tileMap,
                                xInImage: j * Game.TILE_SIZE,
                                yInImage: i * Game.TILE_SIZE,
                                width: Game.TILE_SIZE,
                                height: Game.TILE_SIZE,
                                depth:0
                                };
                this.factoryMap.set(colorObj.toHTML(), tileInfo);

            }else{
                let tileInfo = { scene: scene,
                    img: null,
                    xInImage: 0,
                    yInImage: 0,
                    width: 0,
                    height: 0,
                    depth:0
                    };
                this.factoryMap.set(TRANSPARENT_COLOR.toHTML(),tileInfo);
            }

        }
    }
}

TileFactory.prototype.createTileFromColor = function(color, x, y){
    let tileInfo = this.factoryMap.get(color.toHTML());
    console.log(tileInfo);
    new Tile(tileInfo.scene, tileInfo.img, 
            x, y, 
            tileInfo.xInImage, tileInfo.yInImage,
            tileInfo.width,tileInfo.height, tileInfo.depth
            );
}