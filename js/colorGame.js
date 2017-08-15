/*To Check That Our "Play Again?" Button Generates The Right Number Of Squares For Easy vs Hard Mode*/
var numSquares = 6; /*To Start Off, Keep Six Squares*/
/*Let's Give Each Square It's Own Color*/
var colors = generateRandomColors(numSquares);

    
/*Let's Loop Through Those Colors*/
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor(); /*We want the picked color to show in the header*/
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");


/*Button Toggle Logic*/
easyBtn.addEventListener("click", function() {
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    numSquares = 3;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    
    /*Let's Block Off The Bottom 3 Squares*/
    for(var i = 0; i < squares.length; i++){
        /*Below: We're Taking Advantage Of The Fact That The Colors Array Only Has 3 Elements*/
        if (colors[i]){ /*If there is a next color*/
            squares[i].style.background = colors[i];
        } else { /*Defining the rest as having NO STYLE*/
            squares[i].style.display = "none";
        }
    }
});

hardBtn.addEventListener("click", function() {
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    
    /*Let's Block Off The Bottom 3 Squares*/
    for(var i = 0; i < squares.length; i++){
        /*Below: We're Taking Advantage Of The Fact That The Colors Array Only Has 3 Elements*/
            squares[i].style.background = colors[i];
            squares[i].style.display = "block";
    }
})
/*==========================================*/

colorDisplay.textContent = pickedColor;

/*Here's Where I Add The Behaviours To Every Square*/
for (var i = 0; i < squares.length; i++)  {
    squares[i].style.backgroundColor = colors[i];
    
    /*We'll Add The Click Listeners To This Loop As Well*/
    squares[i].addEventListener("click", function() {
        /*Let's Get The Color And Compare It To The Picked Color*/
        var clickedColor = this.style.backgroundColor;
        
        if(clickedColor === pickedColor) {
            messageDisplay.textContent = "Correct!";
            changeColors(clickedColor);
            h1.style.background = pickedColor;
            /*Change The Button To "Play Again?"*/
            resetButton.textContent = "Play Again?";
        } else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
        }
    });
}

function changeColors(color) {
    //Loop Through All Squares & Changed Them To The Correct Color When User Picks Right
    
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    /*This Is Where We'll Choose A Random Square That Will Be The "Correct" Square*/
    var random = Math.floor(Math.random() * colors.length);
    return colors[random]; /*Choose A Random One Of The Colors*/
}

function generateRandomColors(num) {
    /*Make An Array*/
    var arr = [];
    
    /*Add num Random Colors*/
    for(var i = 0; i < num; i++){
        /*Get Random Color & Push Back Into Array*/
        arr.push(randomColor());
    }
    /*Return That Array*/
    return arr;
}

function randomColor(){
    /*Pick a red/green/blue from 0 - 255*/
    var r = Math.floor(Math.random() * 256); /*256 Because 'random' never reaches 1 AND we're flooring whole thing*/
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    
    /*Now string 'em together to generate one random color*/
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

/*Setting The Reset Button*/
resetButton.addEventListener("click", function(){
    /*Generate All New Colors*/
    colors = generateRandomColors(numSquares);
    /*Pick A New "Correct" Color*/
    pickedColor = pickColor();
    /*Change Display To Right Color*/
    colorDisplay.textContent = pickedColor;
    /*Change The Display Back To Nothing*/
    messageDisplay.textContent = "";
    /*Change The Reset Button Text Back To "New Colors"*/
    this.textContent = "New Colors";
    
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
    }
    /*Change The Background Back To Black*/
    h1.style.background = "SteelBlue";
})