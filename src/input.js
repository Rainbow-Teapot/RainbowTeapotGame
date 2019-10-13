var input = {

    keys: new Map(),
    keysPress: new Map(),

    init: function () {
        //document.onkeydown = input.saveKey;
        document.onkeyup = input.removeKey;

        document.addEventListener('keydown', function (e) {
            if ((e.keyCode === 18)) {
                console.log("FUERA");
                e.preventDefault();
            }
            else {
                console.log("NO es alt"); 
                document.onkeydown = input.saveKey;
            }
        },{passive:false});
    },

    saveKey: function (e) {
        var e2 = e.charCode || e.keyCode;

        if ((e2 === 18) || (e2 === 9) || (e2 === 16) || (e2 === 17) || (e2 === 91)) {
            console.log("mal");
            e.preventDefault();
            return false;
        }       


        let key = e.key.toLowerCase();
        if (!input.keys.get(key))
            input.keysPress.set(key, key);
        input.keys.set(key, key);
        //console.log(key);

    },
    removeKey: function (e) {
        let key = e.key.toLowerCase();
        input.keys.delete(key);
    },
    pressedKey: function (keyCode) {
        return (input.keys.indexOf(keyCode) !== -1) ? true : false;

    },
    reset: function () {
        input.keysPress = new Map();
    },

    isDownKey: function (key) {

        return (input.keys.has(key)) ? 1 : 0;

    },
    isPressedKey: function (key) {
        return (input.keysPress.has(key)) ? 1 : 0;
    }

};