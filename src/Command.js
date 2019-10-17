//Keyboard Controls
function JumpKeyboardCommand(){
    this.execute = function(){        
        return input.isPressedKey(" ");
    }
}

function LeftKeyboardCommand(){
    this.execute = function(){
        return input.isDownKey("a");
    }
}

function RightKeyboardCommand(){
    this.execute = function(){
        return input.isDownKey("d");
    }
}

function InteractKeyboardCommand(){
    this.execute = function(){
        return input.isPressedKey("e")
    }
}

function SwapPlayerKeyboardCommand(){
    this.execute = function(){
        return input.isPressedKey("q")
    }
}

//joystick Control
function JumpJoystickCommand(){

    this.execute = function(){
        let distance = Math.hypot(Game.joystick.deltaX(), Game.joystick.deltaY())
        return Game.joystick.up() && distance > 30 && distance < 200;
    }
}

function LeftJoystickCommand(){
    this.execute = function(){
        let distance = Math.hypot(Game.joystick.deltaX(), Game.joystick.deltaY())
        return Game.joystick.left() && distance > 30 && distance < 200;
    }
}

function RightJoystickCommand(){
    this.execute = function(){

        let distance = Math.hypot(Game.joystick.deltaX(), Game.joystick.deltaY())
        
        return Game.joystick.right() && distance > 30 && distance < 200;
           
    }
}

function ClickButtonCommand(){
    this.ivoked = false;
    this.result = 0;
    this.execute = function(){
        this.result = 0;
        if(this.ivoked){
            this.result = 1;
            this.ivoked = false;
        }
        return this.result;
    }
}
