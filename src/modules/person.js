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
}

export default Person;
