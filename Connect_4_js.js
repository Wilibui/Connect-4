let coins = [[],[]];
let grid = [[],[]];

let w;
let player = 1;
let stop = 0;
let won = false;
let winP;

function setup() {
  setupAll();
}


function draw() {
  background(20, 20, 255);  
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      coins[i][j].update();
      coins[i][j].show();
    }
  }  
  idk();
  
  if(won){
    if(winP == 1){
      fill(255,0,0);
    }else if(winP == 2){
      fill(255,255,0);
    }
    

    text("WIN", 6.5*w, 4*w/10);
  }
}

function mousePressed() {
  if(!won){
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (stop == 0) {
          coins[i][j].clicked();       
        }
      }
    }
    stop = 0;
  }
}

function checkWin(i, j) {
  let P = grid[i][j];
  let C = 0;

  //Zuid
  for (let k = 1; k < 4; k++) {
    if (i + k < 6) {
      if (grid[i + k][j] == P) {
        C++;
        if (C == 3) {
          win(P);
        }
      }
    }
  } 
  C = 0;
  //Zuid-Oost
  for (let k = 1; k < 4; k++) {
    if (i + k < 6 && j + k < 7) {
      if (grid[i + k][j + k] == P) {
        C++;
        if (C == 3) {
          win(P);
        }
      }
    }
  }
  C = 0;
  //Zuid-West
  for (let k = 1; k < 4; k++) {
    if (i + k < 6 && j - k >= 0) {
      if (grid[i + k][j - k] == P) {
        C++;
        if (C == 3) {
          win(P);
        }
      }
    }
  }
  C = 0;
  //Oost
  for (let k = 1; k < 4; k++) {
    if (j + k < 7) {
      if (grid[i][j + k] == P) {
        C++;
        if (C == 3) {
          win(P);
        }
      }
    }
  } 
  C = 0;
  //West
  for (let k = 1; k < 4; k++) {
    if (j - k >= 0) {
      if (grid[i][j - k] == P) {
        C++;
        if (C == 3) {
          win(P);
        }
      }
    }
  } 
  C = 0;
  
  
}

function win(P) {
  winP = P;
  won = true;
}
class Coin{

  constructor(X, Y, I, J) {
    this.x = X;
    this.y = Y;
    this.i = I;
    this.j = J;
    this.r = 0.8*w;
  }

  show() {
    circle(this.x, this.y, this.r);
  } 
  update() {
    if (grid[this.i][this.j] == 0) {
      fill(255);
    }
    if (grid[this.i][this.j] == 1) {
      fill(255, 0, 0);
    }
    if (grid[this.i][this.j] == 2) {
      fill(255, 255, 0);
    }
  }
  clicked() {
    if (this.x - this.r/2 < mouseX && mouseX < this.x + this.r/2) {
      for (let k = 0; k < 6; k++) {
        if (grid[5 - k][this.j] == 0) {
          grid[5 - k][this.j] = player;
          changePlayer();
          checkWin(5 - k, this.j);
          k = 6;
        }
      }
    }
  }
}

function changePlayer() {
  if (player == 1) {
    player = 2;
  } else if (player == 2) {
    player = 1;
  }
  stop = 1;
}

function idk() {
  textAlign(RIGHT, CENTER);
  textSize(w/2);
  noStroke();
  fill(255);
  text("Player: ", 2*w, 4*w/10);
  stroke(0);
  strokeWeight(w/20);

  if (player == 1) {
    fill(255, 0, 0);
  }
  if (player == 2) {
    fill(255, 255, 0);
  }
  if(won){
    if (winP == 1) {
    fill(255, 0, 0);
  }
  if (winP == 2) {
    fill(255, 255, 0);
  }
  }
  circle(7*w/3, w/2, 0.5*w);
  
  line(0, w, width, w);
}

function setupAll(){ 
  
  if (0.7 * windowHeight < windowWidth) {
    createCanvas(windowWidth, windowHeight);
    w = height / 7;
  } else {
    createCanvas(windowWidth, windowHeight);
    w = 0.095 * height;
  }
  
  textAlign(RIGHT, CENTER);
  textSize(w/2);
  for (let i = 0; i < 6; i++) {
    coins[i] = [];
    grid[i] = [];
    for (let j = 0; j < 7; j++) {
      let x = w/2 + j*w;
      let y = 3*w/2 + i*w;

      coins[i][j] = new Coin(x, y, i, j);
      grid[i][j] = 0;
    }
  }
}
