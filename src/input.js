/*Módulo para controlar el input del juego. Utiliza el patrón Command para manejar facilmente
los controles de teclado y los controles de joystick y botones de movil*/
var input = {

    keys: new Map(),
    keysPress: new Map(),

    currentInputMode: null,
    inputMode: {
        DESKTOP_SINGLE: 0,
        DESKTOP_DOUBLE: 1,
        MOBILE: 2,
    },
    //Se preparan listeners y se ignoran teclas especiales como alt, control y shift
    init: function () {
        
        document.onkeyup = input.removeKey;
        document.onkeydown = input.saveKey; 

        document.addEventListener('keydown', function (e) {
            if (e.altKey || e.keyCode === 9 || e.ctrlKey || e.shiftKey || e.metaKey) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }, { passive: false });
        
        document.addEventListener( 'dblclick', function(event) {  
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
    //Se crean controles para cada modo, el normal o simgleplayer o para movil
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
                if(Game.joystick == null){
                    Game.joystick = new VirtualJoystick({
                        mouseSupport: true,
                        stationaryBase: true,
                        strokeStyle: 'white',
                        baseX: viewport.canvas.offsetLeft + Game.TILE_SIZE + 20,
                        baseY: viewport.canvas.offsetTop + viewport.canvas.offsetHeight - Game.TILE_SIZE,
                        stickRadius: 800,
                        limitStickTravel: true,
                    });
                }
                viewport.canvas.addEventListener("touchstart", Game.scene.handleClick, false);
                break;
        }
        Game.controls = controls;
        return controls;
    },

};

//Los comandos que se pueden realizar con los controles
function Controls() {
    this.jumpCommand = null;
    this.interactCommand = null;
    this.changePlayerCommand = null;
    this.leftCommand = null;
    this.rightCommand = null;
};