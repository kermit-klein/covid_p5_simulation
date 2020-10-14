class Home {
  constructor(p5) {
    let x = p5.random(210, p5.windowWidth - 10);
    let y = p5.random(60, p5.windowHeight - 10);
    this.pos = new p5.Vector(x, y);
  }

  draw() {
    fill(color(99, 111, 182, 50));
    const x = Math.floor(this.pos.x);
    const y = Math.floor(this.pos.y);
    ellipse(x, y, 20);
    image(homeImg, x - 5, y - 5, 10, 10);
  }
}

export default Home;
