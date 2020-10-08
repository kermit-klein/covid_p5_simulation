class Person {
  constructor(isInfected = false) {
    this.pos = new p5.Vector(
      random() * (windowWidth - 200) + 200,
      random() * windowHeight
    );
    this.angle = new p5.Vector(random(), random()).normalize();
    this.infectedAt = null;
    if (isInfected) {
      this.infectedAt = 0;
      this.pos = new p5.Vector(windowWidth / 2, windowHeight / 2);
    }
  }
  isInfected() {
    return this.infectedAt !== null;
  }
  isIll() {
    return this.infectedAt() && this.infectedAt + INCUBATION_PERIOD < time;
  }
  isHealthy() {
    return this.infectedAt === null;
  }
  move() {
    if (this.isIll()) {
      if (this.pos.y > 50) {
        const x = random(0, windowWidth);
        const y = random(0, 50);
        this.pos = new p5.Vector(x, y);
      } else {
        this.angle.rotate((random(-1, 1) * PI) / 10);
        this.pos.add(this.angle);
      }
    } else if (SOCIAL_DISTANCING_TIME <= time) {
      const home = this.getClosestHome();
      this.angle = home.pos.copy().sub(this.pos).normalize();
      this.pos.add(this.angle);
    } else {
      this.angle.rotate((random(-1, 1) * PI) / 10);
      this.pos.add(this.angle);
    }
    this.limitPosition();
  }
  limitPosition() {
    const minY = this.isIll ? 0 : 55;
    const maxY = this.isIll ? 45 : windowHeight;
    this.pos.x = max(200, this.pos.x);
    this.pos.y = max(minY, this.pos.y);
    this.pos.x = min(windowWidth, this.pos.x);
    this.pos.y = min(maxY, this.pos.y);
  }
}

export default Person;
