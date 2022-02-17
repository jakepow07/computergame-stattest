const canvas = document.querySelector('.myCanvas');
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext('2d');
canvas.setAttribute("tabindex", 0);

const gameOver2 = document.querySelector('.endgame p');

const score = document.getElementById("score");
const lives = document.getElementById("lives");

const key = document.querySelector('.topbar');
const rightbar = document.querySelector('.rightbar');
const section = document.getElementById('section');



let gameOver = false;
let score1 = 0;
let lives1 = 3;
let maxLength = 1;


let objects = [];


let scissors = new Scissors(width / 2, height / 2, 30, 30, false, 65);
let rock = new Rock(width / 2, height / 2, 30, 30, true, 50);
let paper = new Paper(width / 2, height / 2, 30, 30, false, 75);
objects.push(scissors);
objects.push(rock);
objects.push(paper);



let compObjects = [];

function gameLoss1(){
  if(lives1 > 0){
    lives1--;
    lives.textContent = "Lives: " + lives1;

  }

  if (lives1 === 0){
    gameOver = true;
    canvas.height = 0;
    gameOver2.style.display = "block";
    key.style.display = "none";

    gameOver2.style.height = "275px";
    var cancelAnimationFrame = window.cancelAnimationFrame;
    maxLength = 0;





  }
}




function CreateNew(compObjects) {

    let num = randomOf3();

    let height2 = random(height);
    let randomVar = Math.random();


    if (num === 0) {

      let randomVar = new CompRock(width, height2, 2, 0, true, 27);
      compObjects.push(randomVar);
    } else if (num === 1) {

      let randomVar = new CompPaper(width, height2, 2, 0, true, 75);
      compObjects.push(randomVar);
    } else if (num === 2) {

      let randomVar = new CompScissors(width, height2, 2, 0, true, 50);
      compObjects.push(randomVar);
    }

  if (compObjects.length === 2){
    console.log("very successful");
  }

}
/*function easyMode(){
  maxLength = 1;




}

function hardMode(){

  console.log("successful");
  maxLength = 5;
}
function superHard(){

  maxLength = 3;
}

setTimeout(hardMode, 1500);*/









function randomOf3() {
  const num = Math.floor(Math.random() * 3);
  return num;
}

function random(height1) {
  const num = Math.floor(Math.random() * (height1 - 187)) + 36;
  return num;
}


function Shape(x, y, velX, velY, exists, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
  this.size = size;
}

function Scissors(x, y, velX, velY, exists, size) {
  Shape.call(this, x, y, velX, velY, exists, size);


}

function Rock(x, y, velX, velY, exists, size) {
  Shape.call(this, x, y, velX, velY, exists);


}

function Paper(x, y, velX, velY, exists, size) {
  Shape.call(this, x, y, velX, velY, exists, size);

}

function CompRock(x, y, velX, velY, exists, size) {
  Shape.call(this, x, y, velX, velY, exists, size);

}

function CompPaper(x, y, velX, velY, exists, size) {
  Shape.call(this, x, y, velX, velY, exists, size);

}

function CompScissors(x, y, velX, velY, exists, size) {
  Shape.call(this, x, y, velX, velY, exists, size);

}



Rock.prototype.draw = function() {

  let radius = 54;
  ctx.fillStyle = 'rgba(127, 127, 127, 0.9)';
  ctx.beginPath();
  ctx.arc(this.x, this.y, radius, degToRad(0), degToRad(360), false);
  ctx.fill();
}
Rock.prototype.collisionDetect = function() {

  for (let j = 0; j < compObjects.length; j++) {
    if (compObjects[j].exists) {
      const dx = this.x - compObjects[j].x;
      const dy = this.y - compObjects[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + compObjects[j].size) {
        if (compObjects[j].prototype === CompScissors) {
          console.log("you have won");
          compObjects[j].exists = false;


        } else if (compObjects[j].prototype === CompPaper) {
          console.log("you have lost");
          this.exists = false;
        }
      }
    }
  }
}
Paper.prototype.draw = function() {

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.fillRect(this.x, this.y, 150, 150);


}
Paper.prototype.collisionDetect = function() {

  for (let j = 0; j < compObjects.length; j++) {
    if (compObjects[j].exists) {
      const dx = this.x - compObjects[j].x;
      const dy = this.y - compObjects[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + compObjects[j].size) {
        if (compObjects[j].prototype === CompRock) {
          console.log("you have won");
          compObjects[j].exists = false;


        } else if (compObjects[j].prototype === CompScissors) {
          console.log("you have lost");
          this.exists = false;
        }
      }
    }
  }
}
Scissors.prototype.draw = function() {


  let scissorLength = 130
  ctx.fillStyle = 'rgba(0, 0, 255, 0.9)';

  ctx.fillRect(this.x, this.y, scissorLength, 15);
  ctx.fillStyle = 'rgba(0, 0, 255, 0.9)';

  ctx.fillRect(this.x, this.y - 30, scissorLength, 15);


  ctx.strokeStyle = 'rgba(0, 0, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(this.x, this.y - 20, 20, degToRad(0), degToRad(360), false);
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgba(0, 0, 255, 0.9)';
  ctx.stroke();



  ctx.arc(this.x, this.y, 20, degToRad(0), degToRad(360), false);
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgba(0, 0, 255, 0.9)';
  ctx.stroke();


}
Scissors.prototype.collisionDetect = function() {

  for (let j = 0; j < compObjects.length; j++) {
    if (compObjects[j].exists) {
      const dx = this.x - compObjects[j].x;
      const dy = this.y - compObjects[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + compObjects[j].size) {
        if (compObjects[j].prototype === CompPaper) {
          console.log("you have won");
          compObjects[j].exists = false;


        } else if (compObjects[j].prototype === CompRock) {
          console.log("you have lost");
          this.exists = false;
        }
      }
    }
  }
}


Rock.prototype.setControls = function() {
  let _this = this;

  document.addEventListener('keydown', function(e) {
    if (e.key === 'a') {
      _this.x -= _this.velX;
    } else if (e.key === 'd') {
      _this.x += _this.velX;
    } else if (e.key === 'w') {
      _this.y -= _this.velY;
    } else if (e.key === 's') {
      _this.y += _this.velY;
    }

  });
};

Paper.prototype.setControls = function() {
  let _this = this;

  document.addEventListener('keydown', function(e) {
    if (e.key === 'a') {
      _this.x -= _this.velX;

    } else if (e.key === 'd') {
      _this.x += _this.velX;

    } else if (e.key === 'w') {
      _this.y -= _this.velY;

    } else if (e.key === 's') {
      _this.y += _this.velY;

    }

  });
};
Scissors.prototype.setControls = function() {
  let _this = this;

  document.addEventListener('keydown', function(e) {
    if (e.key === 'a') {
      _this.x -= _this.velX;
    } else if (e.key === 'd') {
      _this.x += _this.velX;
    } else if (e.key === 'w') {
      _this.y -= _this.velY;
    } else if (e.key === 's') {
      _this.y += _this.velY;
    }

  });
};


CompRock.prototype.draw = function() {
  let radius = 54;
  ctx.fillStyle = 'rgba(127, 127, 127, 0.9)';
  ctx.beginPath();
  ctx.arc(this.x, this.y, radius, degToRad(0), degToRad(360), false);
  ctx.fill();

}
CompRock.prototype.update = function() {

  if (this.x <= 0) {
    this.exists = false;
    console.log('you have lost');
    gameLoss1();

    compObjects.pop(this);


  }

  this.x -= this.velX;
  if(this.x < width - 50 && this.exists === false) {
    compObjects.pop(this);
  }

}
CompRock.prototype.collisionDetect = function() {
  for (let j = 0; j < objects.length; j++) {
    if (objects[j].exists) {
      const dx = this.x - objects[j].x;
      const dy = this.y - objects[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance - 95 < this.size + objects[j].size && objects[j] === paper) {

          console.log("you have won");
          this.exists = false;
          score1 += 10;
          score.textContent = "Score: " + score1;
        } else if (distance - 45 < this.size + objects[j].size && objects[j] === scissors) {
          console.log("you have lost");
          gameLoss1();
          objects[j].exists = false;
          this.exists = false;

        }
      }
    }
  }

CompPaper.prototype.draw = function() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.fillRect(this.x, this.y, 150, 150);
}
CompPaper.prototype.update = function() {

  if (this.x <= 0) {
    this.exists = false;
    gameLoss1();

    compObjects.pop(this);

  }
  this.x -= this.velX;
  if ((this.x < width - 50) && this.exists === false) {
    compObjects.pop(this);
  }
}
CompPaper.prototype.collisionDetect = function() {
  for (let j = 0; j < objects.length; j++) {
    if (objects[j].exists) {
      const dx = this.x - objects[j].x;
      const dy = this.y - objects[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);


      if (distance + 10 < this.size + objects[j].size && objects[j] === scissors) {

          console.log("you have won");
          this.exists = false;
          score1 += 10;
          score.textContent = "Score: " + score1;
        } else if (distance < 110 && objects[j] === rock) {
          console.log("you have lost");
          gameLoss1();
          objects[j].exists = false;
          this.exists = false;

        }
      }
    }
  }

CompScissors.prototype.draw = function() {
  let scissorLength = 130
  ctx.fillStyle = 'rgba(0, 0, 255, 0.9)';

  ctx.fillRect(this.x, this.y, scissorLength, 15);
  ctx.fillStyle = 'rgba(0, 0, 255, 0.9)';

  ctx.fillRect(this.x, this.y - 30, scissorLength, 15);


  ctx.strokeStyle = 'rgba(0, 0, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(this.x, this.y - 20, 20, degToRad(0), degToRad(360), false);
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgba(0, 0, 255, 0.9)';
  ctx.stroke();



  ctx.arc(this.x, this.y, 20, degToRad(0), degToRad(360), false);
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgba(0, 0, 255, 0.9)';
  ctx.stroke();
}
CompScissors.prototype.update = function() {
  if(this.x < 50 && this.exists === false){
    compObjects.pop(this);
  }

  if (this.x <= 0) {
    this.exists = false;
    gameLoss1();

    compObjects.pop(this);
  }
  this.x -= this.velX;
  if ((this.x < width - 50) && this.exists === false) {
    compObjects.pop(this);
  }
}
CompScissors.prototype.collisionDetect = function() {

  for (let j = 0; j < objects.length; j++) {

    if (objects[j].exists) {
      this.size = 500;
      const dx = this.x - objects[j].x;
      const dy = this.y - objects[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);


        if (distance < 85 && objects[j] === rock) {
          console.log("you have won");
          this.exists = false;
          score1 += 10;
          score.textContent = "Score: " + score1;


        } else if (distance < 135 && objects[j] === paper) {
          console.log("you have lost");
          gameLoss1();
          objects[j].exists = false;
          this.exists = false;



        }
      }
    }
  };



window.onkeydown = function(e) {
  if (e.key === '1') {
    rock.exists = true;
    paper.exists = false;
    scissors.exists = false;


  } else if (e.key === '2') {
    rock.exists = false;
    paper.exists = true;
    scissors.exists = false;


  } else if (e.key === '3') {
    rock.exists = false;
    paper.exists = false;
    scissors.exists = true;
  }
}


scissors.setControls();
rock.setControls();
paper.setControls();





function loop() {
  ctx.fillRect(this.x - 100, this.y - 100, this.x + 100, this.y - 100);
  ctx.clearRect(this.x - 100, this.y - 100, this.x + 100, this.y - 100);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, width, height);

  for (i = 0; i < objects.length; i++) {
    if (objects[i].exists) {

      objects[i].draw();

    }
  }

  for (i = 0; i < compObjects.length; i++) {
    if (compObjects[i].exists) {
      compObjects[i].draw();
    }
    compObjects[i].collisionDetect();
    compObjects[i].update();
  }
  if(!gameOver){
    while(compObjects.length < maxLength){
      CreateNew(compObjects);
    }
  }





  let raf = requestAnimationFrame(loop);

};
loop();




function degToRad(degrees) {
  return degrees * Math.PI / 180;
};
