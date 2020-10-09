let homeImg;
function preload() {
  homeImg = loadImage("../home_icon.png");
}

const INITIAL_INFECTED_PEOPLE = 1;
const CONTAMINATION_RADIUS = 1;
const INCUBATION_PERIOD = 2;
let SOCIAL_DISTANCING_TIME = 5;
let numberOfPeople = 1000;

let homes = [];
let persons = [];
let totalSeconds = 0;
let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createElement("h3", "Hospital").position(windowWidth / 2 + 50, 0);
  createInputs();

  persons = [];
  homes = [];
  totalSeconds = 0;

  for (let i = 0; i < numberOfPeople; i++) {
    const isInfected = i < INITIAL_INFECTED_PEOPLE;
    persons.push(new Person(isInfected));
  }
  for (let i = 0; i < numberOfPeople / 5; i++) {
    homes.push(new Home());
  }
}

function draw() {
  background(220);
  totalSeconds += deltaTime;
  time = Math.floor(totalSeconds / (60 * 60));
  drawHospital();
  persons.forEach((person) => person.update());
  homes.forEach((home) => home.draw());
  drawStats();
}

function drawHospital() {
  fill(color(30, 180, 22, 50));
  rect(0, 0, windowWidth, 50);
}
