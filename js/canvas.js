let canvas = document.querySelector("canvas");
let section = document.getElementById("test");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight / 2;

console.log(section.offsetWidth);
console.log(section.clientWidth);
console.log(section.scrollWidth);
console.log(section.offsetHeight);
console.log(section.clientHeight);
console.log(section.scrollHeight);
canvas.width = section.offsetWidth;
canvas.height = section.offsetHeight;

const c = canvas.getContext("2d");

// c.fillRect(x, y, width, height);
c.fillRect(100, 100, 100, 100);

let mouse = {
  x: null,
  y: null
};

let maxRadius = 50;
let minRadius = 2;
let colorArray = ["#3F8CCC", "#7DBC8E", "#EBE4C4", "#F3BA42", "#F06060"];

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  //   console.log(mouse);
});

window.addEventListener("resize", function() {
  canvas.width = section.offsetWidth;
  canvas.height = section.offsetHeight;
  init();
});

function Circle(x, y, dx, dy, radius, minRadius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };
  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    this.draw();
  };
}
let circleArray = [];
function init() {
  circleArray = [];
  for (let i = 0; i < 500; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
init();
animate();
