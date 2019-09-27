var input = {

    keys: new Map(),
    
    init: function () {
        document.onkeydown = input.saveKey;
        document.onkeyup = input.removeKey;
    },

    saveKey: function (e) {
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
        input.keys = new Map();
    },

    isPressedKey: function(key){
        return (input.keys.has(key)) ? 1: 0;       
            
    }

};