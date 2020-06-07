// Detecting Keyboard Press
var xSnake = 25;
var ySnake = 12;

// var kick = 0;
var id;
var opKey;
var speed = 120;
var lost = false;
var level = 0;
var walls = walls = document.querySelector("input").checked;

var xFood = Math.floor(Math.random() * 50) + 1;
var yFood = Math.floor(Math.random() * 25) + 1;

while (xFood === xSnake && yFood === ySnake) {
  xFood = Math.floor(Math.random() * 50) + 1;
  yFood = Math.floor(Math.random() * 25) + 1;
}

var snakeBoy = new SnakeBody(xSnake, ySnake, "")

document.querySelector("#snake").style.gridArea = ySnake + " / " + xSnake + " / " + (ySnake + 1) + " / " + (xSnake + 1)
document.querySelector("#food").style.gridArea = yFood + " / " + xFood + " / " + (yFood + 1) + " / " + (xFood + 1)


document.addEventListener("keydown", function(event) {

  keyEvent(event.key);

});

function keyEvent(key) {
  if (key === "ArrowRight" || key === "ArrowLeft" || key === "ArrowUp" || key === "ArrowDown") {
    if (opKey !== key && lost === false) {

      clearInterval(id);

      id = setInterval(function() {
        if (snakeBoy.growNext === true) {
          snakeBoy.grow();
          snakeBoy.growNext = false;
          if (snakeBoy.size % 5 === 0) {
            speed *= 0.85;
            level++;
            document.querySelectorAll(".points h2")[1].textContent = level;
          }
        }
        snakeBoy.direction = key;
        snakeBoy.move();

        if (snakeBoy.ded === true) {
          clearInterval(id);
          lost = true;
          alert("You died.");
          location.reload();
        }

        if (xFood === snakeBoy.xHead && yFood === snakeBoy.yHead) {
          generateFood();
          snakeBoy.growNext = true;
          document.querySelector(".points h2").textContent = snakeBoy.size + 1;
        }

        console.log("Snake: " + snakeBoy.xHead + ", " + snakeBoy.yHead + "| Food: " + xFood + ", " + yFood);
      }, speed);

    }
  }


}


function generateFood() {
  while (xFood === snakeBoy.xHead && yFood === snakeBoy.yHead) {
    xFood = Math.floor(Math.random() * 50) + 1;
    yFood = Math.floor(Math.random() * 25) + 1;
  }
  document.querySelector("#food").style.gridArea = yFood + " / " + xFood + " / " + (yFood + 1) + " / " + (xFood + 1)
}

// Snake Constructors

function SnakeBit(id, xPosition, yPosition) {
  this.id = id;
  this.xPosition = xPosition;
  this.yPosition = yPosition;

  this.create = function() {

    var newDiv = document.createElement("div");
    var screen = document.querySelector(".screen");
    newDiv.id = "bit" + this.id;
    newDiv.classList.add("snake-body");
    newDiv.style.gridArea = this.yPosition + " / " + this.xPosition + " / " + (this.yPosition + 1) + " / " + (this.xPosition + 1);
    screen.appendChild(newDiv);
  }
  this.place = function() {
    document.querySelector("#bit" + id).style.gridArea = this.yPosition + " / " + this.xPosition + " / " + (this.yPosition + 1) + " / " + (this.xPosition + 1);
  }
}

function SnakeBody(xHead, yHead, direction) {
  this.bits = [];
  this.size = this.bits.length;
  this.xHead = xHead;
  this.yHead = yHead;
  this.direction = direction;
  this.growNext = false;
  this.ded = false;
  this.grow = function() {

    this.bits[this.size] = new SnakeBit(this.size + 1, this.xHead, this.yHead);
    this.bits[this.size].create();
    this.size++;

  }

  this.move = function() {

    if (this.size > 0) {
      for (var i = this.size - 1; i >= 0; i--) {
        if (i === 0) {
          this.bits[i].xPosition = this.xHead;
          this.bits[i].yPosition = this.yHead;
          this.bits[i].place();
        } else {
          this.bits[i].xPosition = this.bits[i - 1].xPosition;
          this.bits[i].yPosition = this.bits[i - 1].yPosition;
          this.bits[i].place();
        }
      }
    }

    switch (this.direction) {

      case "ArrowRight":
        this.xHead++;

        if (this.xHead === 51) {
          if (walls === true) {
            this.ded = true;
            break;
          }
          this.xHead = 1;
        }

        opKey = "ArrowLeft"
        break;

      case "ArrowLeft":
        this.xHead--;
        if (this.xHead === 0) {
          if (walls === true) {
            this.ded = true;
            break;
          }
          this.xHead = 50;
        }
        opKey = "ArrowRight"
        break;

      case "ArrowUp":
        this.yHead--;
        if (this.yHead === 0) {
          if (walls === true) {
            this.ded = true;
            break;
          }
          this.yHead = 25;
        }
        opKey = "ArrowDown"
        break;

      case "ArrowDown":
        this.yHead++;
        if (this.yHead === 26) {
          if (walls === true) {
            this.ded = true;
            break;
          }
          this.yHead = 1;
        }
        opKey = "ArrowUp"
        break;

      default:

    }
    // Checks if it dies

    if (this.size > 0) {
      for (var i = this.size - 1; i >= 0; i--) {
        if (this.bits[i].xPosition === this.xHead && this.bits[i].yPosition === this.yHead) {
          this.ded = true;
          document.querySelector("#snake").style.backgroundColor = "red";
          document.querySelector("#bit" + this.bits[i].id).style.backgroundColor = "red";
        }
      }
    }




    document.querySelector("#snake").style.gridArea = this.yHead + " / " + this.xHead + " / " + (this.yHead + 1) + " / " + (this.xHead + 1)
  }
}

// Toggle walls

document.querySelector("input").addEventListener("click", function() {

  walls = this.checked;
  if (walls === true) {
    document.querySelector(".screen").style.border = ("5px solid #222831");
  } else {
    document.querySelector(".screen").style.border = ("5px solid #ececec");
  }

  console.log("Walls is " + this.checked);

});

// Arrow Buttons

for (var i = 0; i < document.querySelectorAll(".btn").length; i++) {

  document.querySelectorAll(".btn")[i].addEventListener("click", function() {
    var key;
    switch (this.id) {
      case "btnUp":
        key = "ArrowUp";
        break;

      case "btnRt":
        key = "ArrowRight";
        break;

      case "btnDn":
        key = "ArrowDown";
        break;

      case "btnLt":
        key = "ArrowLeft";
        break;
      default:

    }
    console.log (this.id);
    keyEvent(key);

  });

}
