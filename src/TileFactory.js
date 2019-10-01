function TileFactory(scene, tileMap, palette){
    
    Factory.call(this,scene);
    this.createFactory(scene, tileMap, palette);

}

TileFactory.prototype = Object.create(Factory.prototype);
TileFactory.prototype.constructor = TileFactory;

TileFactory.prototype.createFactory = function(scene, tileMap, palette, layer){
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    let img = cache.retrieve(palette).img;
    context.drawImage(img,0,0);
    
    for(let i = 0; i < img.height; i++){
        for(let j = 0; j < img.width; j++){
            let color = context.getImageData(j,i,1,1).data;
            let colorObj = new Color(color[0], color[1], color[2], color[3]);
            if(!colorObj.equals(BLACK_COLOR)){
                
                let tileInfo = { scene: scene,
                                img: tileMap,
                                xInImage: j * Game.TILE_SIZE,
                                yInImage: i * Game.TILE_SIZE,
                                width: Game.TILE_SIZE,
                                height: Game.TILE_SIZE,
                                depth: 0
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

TileFactory.prototype.createProductFromColor = function(color, x, y, depth){
    let tileInfo = this.factoryMap.get(color.toHTML());
    new Tile(tileInfo.scene, tileInfo.img, 
            x, y, 
            tileInfo.xInImage, tileInfo.yInImage,
            tileInfo.width,tileInfo.height, depth
            );
}