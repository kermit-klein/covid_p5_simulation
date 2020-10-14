import {time,SOCIAL_DISTANCING_TIME,persons,homes} from "./sketch"
const CONTAMINATION_RADIUS = 10;
const INCUBATION_PERIOD = 2;

class Person {
  constructor(p5,isInfected = false) {
      debugger
    this.pos = new p5.createVector(
      p5.random() * (p5.windowWidth - 200) + 200,
      p5.random() * p5.windowHeight
    );

    this.angle = new p5.createVector(p5.random(), p5.random()).normalize();
    this.infectedAt = null;

    if (isInfected) {
      this.infectedAt = 0;
      this.pos = new p5.createVector(p5.windowWidth / 2, p5.windowHeight / 2);
    }
  }

  isInfected() {
    return this.infectedAt !== null;
  }

  isIll() {
    return this.isInfected() && this.infectedAt + INCUBATION_PERIOD < time;
  }

  isHealthy() {
    return this.infectedAt === null;
  }

  update(p5) {
    this.move(p5);
    this.checkIfInfected();
    this.draw(p5);
  }

  move(p5) {
    if (this.isIll()) {
      if (this.pos.y > 50) {
        const x = p5.random(0, p5.windowWidth);
        const y = p5.random(0, 50);
        this.pos = new p5.createVector(x, y);
      } else {
        this.angle.rotate((p5.random(-1, 1) * p5.PI) / 10);
        this.pos.add(this.angle);
      }
    } else if (SOCIAL_DISTANCING_TIME <= time) {
      const home = this.getClosestHome();
      this.angle = home.pos.copy().sub(this.pos).normalize();
      this.pos.add(this.angle);
    } else {
      this.angle.rotate((p5.random(-1, 1) * p5.PI) / 10);
      this.pos.add(this.angle);
    }
    this.limitPosition(p5);
  }

  limitPosition(p5) {
    const minY = this.isIll() ? 0 : 55;
    const maxY = this.isIll() ? 45 : p5.windowHeight;
    this.pos.x = p5.max(200, this.pos.x);
    this.pos.y = p5.max(minY, this.pos.y);
    this.pos.x = p5.min(p5.windowWidth, this.pos.x);
    this.pos.y = p5.min(maxY, this.pos.y);
  }

  checkIfInfected() {
    if (this.isInfected()) {
      return;
    }

    persons.forEach((person) => {
      if (this === person || !person.isInfected()) {
        return;
      }
      if (this.pos.dist(person.pos) < CONTAMINATION_RADIUS) {
        this.infectedAt = time;
      }
    });
  }

  draw(p5) {
    const x = Math.floor(this.pos.x);
    const y = Math.floor(this.pos.y);
    p5.noStroke();
    if (this.isIll()) {
      p5.fill(p5.color(255, 0, 0, 50));
      p5.ellipse(x, y, CONTAMINATION_RADIUS);
      p5.fill(p5.color("red"));
    } else if (this.isInfected()) {
      p5.fill(p5.color(255, 165, 0, 50));
      p5.ellipse(x, y, CONTAMINATION_RADIUS);
      p5.fill(p5.color(255, 165, 0));
    } else {
      p5.fill(p5.color("green"));
    }
    p5.ellipse(x, y, 2);
  }

  getClosestHome() {
    let closest = null;
    let dist = 99999;
    homes.forEach((home) => {
      if (this.pos.dist(home.pos) < dist) {
        dist = this.pos.dist(home.pos);
        closest = home;
      }
    });

    return closest;
  }
}

export default Person;
