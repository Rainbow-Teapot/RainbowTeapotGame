var input = {

    keys: new Map(),
    keysPress: new Map(),
    
    init: function () {
        document.onkeydown = input.saveKey;
        document.onkeyup = input.removeKey;
    },

    saveKey: function (e) {
        if(!input.keys.get(e.key))
            input.keysPress.set(e.key,e.key);
        input.keys.set(e.key, e.key); 
        //console.log(e.key);

    },
    removeKey: function(e){
        input.keys.delete(e.key);
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