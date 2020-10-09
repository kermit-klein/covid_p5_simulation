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

function createInputs() {
  createElement("h2", "Covid-19").position(50, 0);
  createElement("h3", "Simulator").position(60, 30);

  createElement("p", "Number of people").position(10, 70);
  let nOfPeopleInp = createInput(numberOfPeople);
  nOfPeopleInp.position(10, 110);

  createElement("p", "Social Distancing at day").position(10, 120);
  let sd_time = createInput(SOCIAL_DISTANCING_TIME);
  sd_time.position(10, 155);

  button = createButton("Start simulation");
  button.position(10, 180);
  button.mousePressed(() => {
    SOCIAL_DISTANCING_TIME = sd_time.value();
    numberOfPeople = nOfPeopleInp.value();
    setup();
  });
}
