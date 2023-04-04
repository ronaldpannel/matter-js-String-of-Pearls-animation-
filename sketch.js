// module aliases
const Engine = Matter.Engine,
  //Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint,
  Composite = Matter.Composite;

let boundary;
let boundaryArray = [];
let particleArray = [];
let world;
let engine;

function setup() {
  createCanvas(600, 600);
  frameRate(30);

  engine = Engine.create();
  world = engine.world;
  Matter.Runner.run(engine);

  let prev = null;
  for (let x = 300; x < 510; x += 10) {
    let fixed = false;
    if (!prev) {
      fixed = true;
    }

    let p = new Particle(x, 10, 5, fixed);
    // let p2 = new Particle(200, 150, 10);

    particleArray.push(p);

    // particleArray.push(p2);
    if (prev) {
      let options = {
        bodyA: p.body,
        bodyB: prev.body,
        length: 20,
        stiffness: 0.4,
      };

      let constraint = Constraint.create(options);
      Composite.add(engine.world, [constraint]);
    }
    prev = p;
  }

  boundaryArray.push(new Boundary(0, height, width * 2, 20, 0.0));

  //setup end
}

// function mouseDragged() {
//   particleArray.push(new Particle(mouseX, mouseY, random(5, 10)));
// }

function draw() {
  background(0);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    if (particleArray[i].isOffScreen()) {
      particleArray[i].removeFromWorld();
      particleArray.splice(i, 1);
      i--;
    }
  }
  for (let i = 0; i < boundaryArray.length; i++) {
    boundaryArray[i].draw();
  }
  // stroke('red')
  // strokeWeight(2)
  // line(
  //   particleArray[0].body.position.x,
  //   particleArray[0].body.position.y,
  //   particleArray[1].body.position.x,
  //   particleArray[1].body.position.y
  // )
  //console.log(particleArray.length, world.bodies.length);

  //draw end
}

function windowResized() {
  resizeCanvas(600, 600);
  draw();
}
