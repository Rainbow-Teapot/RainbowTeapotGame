var input = {

    keys: new Map(),
    keysPress: new Map(),
    
    init: function () {
        document.onkeydown = input.saveKey;
        document.onkeyup = input.removeKey;
    },

    saveKey: function (e) {
        let key = e.key.toLowerCase();
        if(!input.keys.get(key))
            input.keysPress.set(key,key);
        input.keys.set(key, key); 
        //console.log(key);

    },
    removeKey: function(e){
        let key = e.key.toLowerCase();
        input.keys.delete(key);
    },
    pressedKey: function (keyCode) {
        return (input.keys.indexOf(keyCode) !== -1) ? true : false;

    },
    reset: function () {
        input.keysPress = new Map();
    },

    isDownKey: function(key){
        return (input.keys.has(key)) ? 1: 0;       
            
    },
    isPressedKey: function(key){
        return (input.keysPress.has(key)) ? 1: 0;  
    }

};