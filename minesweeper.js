function setup() {
  bombs = [];
  stage = 0;
  bombamount = 0;
  start = false;
  createCanvas(800,800);
  grid = [];
  for (i = 0; i < 40; i++){
    grid.push([]);
    for (j = 0; j < 40; j++){
      grid[i].push(new cell(i,j));
    }
  }

}


function draw() {
  //title
  if (stage == 0){
    background(200);
    textSize(30);
    text('Minesweeper',300,330);
    textSize(12);
    fill(240);
    rect(140,430,50,30);
    fill(30);
    text('Easy',150,450);
    fill(240);
    rect(350,430,65,30);
    fill(30);
    text('Medium',360,450);
    fill(240);
    rect(570,430,50,30);
    fill(30);
    text('Hard',580,450);
    
    
  }
  //game
  if (stage == 1){
    for (i = 0; i < 40; i++){
        for (j = 0; j < 40; j++){
           grid[i][j].disp(); 
        }
    }
  }
  if (stage == 2){
    
  }
}
function mouseClicked(){
  if (stage == 1){
    grid[floor(mouseX/20)][floor(mouseY/20)].press();
  }
  if (stage == 0){
    if(mouseX >= 140 && mouseX <= 190 && mouseY >= 430 && mouseY <= 460){
       start = true;
       bombamount = 100;
    }
    if(mouseX >= 350 && mouseX <= 415 && mouseY >= 430 && mouseY <= 460){
       start = true;
       bombamount = 200;
    }
    if(mouseX >= 570 && mouseX <= 620 && mouseY >= 430 && mouseY <= 460){
       start = true;
       bombamount = 300;
    }
    if(start == true){
      stage = 1;
      for (i = 0; i < bombamount; i++){
        bx = floor(random(40));
        by = floor(random(40));
        if(grid[bx][by].bomb == 1){
          i -= 1;
        }
        else{
          grid[bx][by].bomb = 1;
          bombs.push([bx,by]);
          for (n = -1; n<2; n++){
            for (m = -1; m<2; m++){
              if(bx+n > -1 && bx+n < 40 && by+m > -1 && by+m < 40){
                grid[bx+n][by+m].bombno += 1;
              }
            }
          }
        }
      }
    }
  }
}

function reveal(i,j){
   check = [[i,j]];
   while (true){
     if (check.length == 0) {break}
     for(a = 0; a < check.length; a++){
        for(n = -1; n < 2; n++){
            for(m = -1; m < 2; m++){
               x1 = check[a][0]+n;
               y1 = check[a][1]+m;
               if(x1 > -1 && x1 < 40 && y1 > -1 && y1 < 40){
                  if (grid[x1][y1].bombno == 0  && grid[x1][y1].clicked == false){ 
                      check.push([x1,y1])
                      grid[x1][y1].clicked = true;
                  }
                  if(grid[x1][y1].bomb == true){}
                  
                  else if (grid[x1][y1].bombno > 0  && grid[x1][y1].clicked == false){
                      grid[x1][y1].clicked = true;
                  }  
               }
            }
        }
     }
     check.shift() 
   } 
}

function cell(x,y){
  this.x = x;
  this.y = y;
  this.bomb = 0;
  this.bombno = 0;
  this.clicked = false;
 
  this.disp = function(){
    if (this.clicked == true){
      fill(230);
      stroke(0);
      strokeWeight(2);
      rect(this.x*20,this.y*20,20,20);
      fill(100);
      text((this.bombno), (this.x*20)+7,(this.y*20)+15);
      if(this.bomb == 1){
        fill(200,0,20);
        rect(this.x*20,this.y*20,20,20);
        console.log('o');
      }
      else if(this.bombno == 0){
        fill(255);
        rect(this.x*20,this.y*20,20,20)
      }
    }else{
      fill(0);
      stroke(255);
      strokeWeight(2);
      rect(this.x*20,this.y*20,20,20);
    }   
  }
  
  this.press = function(){
    if(this.bombno == 0){
      reveal(this.x,this.y);
    }
    if(this.bomb == true){
      this.clicked = true;
      for(i = 0; i < bombs.length; i++){
          grid[bombs[i][0]][bombs[i][1]].clicked = true;
      }
    }
    else if (this.bombno > 0){
      this.clicked = true;
    }
  }
}
