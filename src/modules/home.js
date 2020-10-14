import {homeImg} from "./sketch"
class Home {
  constructor(p5) {
    let x = p5.random(210, p5.windowWidth - 10);
    let y = p5.random(60, p5.windowHeight - 10);
    this.pos = new p5.createVector(x, y);
  }

  draw(p5) {
    p5.fill(p5.color(99, 111, 182, 50));
    const x = Math.floor(this.pos.x);
    const y = Math.floor(this.pos.y);
    p5.ellipse(x, y, 20);
    // p5.image(homeImg, x - 5, y - 5, 10, 10);
  }
}

export default Home;
