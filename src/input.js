var input = {

    keys: new Map(),
    keysPress: new Map(),

    currentInputMode: null,
    inputMode: {
        DESKTOP_SINGLE: 0,
        DESKTOP_DOUBLE: 1,
        MOBILE: 2,
    },
    init: function () {
        //document.onkeydown = input.saveKey;
        document.onkeyup = input.removeKey;

        document.addEventListener('keydown', function (e) {
            if (e.altKey || e.keyCode === 9 || e.ctrlKey || e.shiftKey || e.metaKey) {
                console.log("FUERA");
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            else {
                console.log("NO es alt");
                document.onkeydown = input.saveKey; 
            }
        }, { passive: false });
        dddddddddddd
        document.addEventListener( 'dblclick', function(event) {  
            console.log("Double click"); 
            event.preventDefault();  
            event.stopPropagation(); 
          }, { passive: false }
        );
        
        
        if (!window.mobilecheck()) {
            input.currentInputMode = input.inputMode.DESKTOP_SINGLE;
        } else {
            input.currentInputMode = input.inputMode.MOBILE;
        }

    },
    saveKey: function (e) {


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
    },

    initControls: function () {

        let controls = new Controls();

        switch (input.currentInputMode) {
            case input.inputMode.DESKTOP_SINGLE:
                controls.jumpCommand = new JumpKeyboardCommand();
                controls.interactCommand = new InteractKeyboardCommand();
                controls.changePlayerCommand = new SwapPlayerKeyboardCommand();
                controls.leftCommand = new LeftKeyboardCommand();
                controls.rightCommand = new RightKeyboardCommand();
                viewport.canvas.addEventListener("click", Game.scene.handleClick, false);
                break;
            case input.inputMode.DESKTOP_DOUBLE:
                /*controls.jumpCommand =
                controls.interactCommand = 
                controls.changePlayerCommand = 
                controls.leftCommand = 
                controls.rightCommand = */
                break;
            case input.inputMode.MOBILE:
                controls.jumpCommand = new JumpJoystickCommand();
                controls.interactCommand = new ClickButtonCommand();
                controls.changePlayerCommand = new ClickButtonCommand();
                controls.leftCommand = new LeftJoystickCommand();
                controls.rightCommand = new RightJoystickCommand();
                Game.joystick = new VirtualJoystick({
                    mouseSupport: true,
                    stationaryBase: true,
                    strokeStyle: 'white',
                    baseX: viewport.canvas.offsetLeft + Game.TILE_SIZE,
                    baseY: viewport.canvas.offsetTop + viewport.height - Game.TILE_SIZE,
                    stickRadius: 800,
                    limitStickTravel: true,
                });
                viewport.canvas.addEventListener("touchstart", Game.scene.handleClick, false);
                break;
        }

        return controls;
    },

};

function Controls() {
    this.jumpCommand = null;
    this.interactCommand = null;
    this.changePlayerCommand = null;
    this.leftCommand = null;
    this.rightCommand = null;
};