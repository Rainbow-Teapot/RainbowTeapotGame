//Comandos que implementan un método execute para que todos puedas ser tratados igual
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

    this.canJump = true;

    this.execute = function(){
        let distance = Math.hypot(Game.joystick.deltaX(), Game.joystick.deltaY())
        let propperDistance = Game.joystick.up() && distance > this.getTreeshold() && distance < 200;
        let ableToJump = this.canJump && propperDistance;
        this.canJump = !propperDistance;
        return ableToJump;
    }

    this.getTreeshold = function(){
        
        if(viewport.canvas.offsetWidth > 1000){
            return 90;
        }else{
            return 60;
        }
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
