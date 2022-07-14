const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

const originalHeight = myCanvas.height;
const originalWidth = myCanvas.width;

let points = 0;
let score = document.getElementById('score');
score.innerHTML = `Your Score: ${points}`;

render();
function render() {
  let dimensions = getObjectFitSize(
    true,
    myCanvas.clientWidth,
    myCanvas.clientHeight,
    myCanvas.width,
    myCanvas.height
  );
  const dpr = window.devicePixelRatio || 1;
  myCanvas.width = dimensions.width * dpr;
  myCanvas.height = dimensions.height * dpr;

  let ctx = myCanvas.getContext("2d");
  let ratio = Math.min(
    myCanvas.clientWidth / originalWidth,
    myCanvas.clientHeight / originalHeight
  );
  ctx.scale(ratio * dpr, ratio * dpr); //adjust this!
  }

// adapted from: https://www.npmjs.com/package/intrinsic-scale
function getObjectFitSize(
  contains /* true = contain, false = cover */,
  containerWidth,
  containerHeight,
  width,
  height
) {
  var doRatio = width / height;
  var cRatio = containerWidth / containerHeight;
  var targetWidth = 0;
  var targetHeight = 0;
  var test = contains ? doRatio > cRatio : doRatio < cRatio;

  if (test) {
    targetWidth = containerWidth;
    targetHeight = targetWidth / doRatio;
  } else {
    targetHeight = containerHeight;
    targetWidth = targetHeight * doRatio;
  }

  return {
    width: targetWidth,
    height: targetHeight,
    x: (containerWidth - targetWidth) / 2,
    y: (containerHeight - targetHeight) / 2
  };
}

let w = myCanvas.width;
let h = myCanvas.height;

function startGame(){
  let abcArr = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ];
  randLtr = abcArr[Math.floor(Math.random()*abcArr.length)];
  x = Math.floor(Math.random() * 290);
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "white";
  ctx.font = "1em Calibri";
  y = 5;
  const timer = ms => new Promise(res => setTimeout(res, ms));
  async function draw () {
     for(y; y <= 250; y++){
     console.log(randLtr);
     ctx.fillText(randLtr, x, y);
     await timer(150);
     ctx.clearRect(0, 0, w, h);
    };
  };
  draw();
};

function addPoints(){
  points += 10;
  score.innerHTML = `Your Score: ${points}`;
};

document.addEventListener('keyup', (event) => {
  let key = event.key;
  if(key == randLtr){
    addPoints();  
    startGame();
    };
  }, false);


function reset(){
  points = 0;
  score.innerHTML = `Your Score: ${points}`;
  startGame();
};
