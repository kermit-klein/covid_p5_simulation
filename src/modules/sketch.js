import Home from "./home";
import Person from "./person";



const initial_infected_number = 1;
let social_distance_time = 5;
let numberOfPeople = 1000;

let homes = [];
let persons = [];
let totalSeconds = 0;
let time = 0;

let homeImg;
function preload(p5) {
debugger
  homeImg = p5.loadImage("./home_icon.png");
}

function setup(p5) {

  p5.createCanvas(p5.windowWidth, p5.windowHeight);
  p5.createElement("h3", "Hospital").position(p5.windowWidth / 2 + 50, 0);
  createInputs(p5);

  persons = [];
  homes = [];
  totalSeconds = 0;

  for (let i = 0; i < numberOfPeople; i++) {
    const isInfected = i < initial_infected_number;
    persons.push(new Person(p5,isInfected));
  }
  for (let i = 0; i < numberOfPeople / 5; i++) {
    homes.push(new Home(p5));
  }


}

function draw(p5) {
  p5.background(220);
  totalSeconds += p5.deltaTime;
  time = Math.floor(totalSeconds / (60 * 60));
  drawHospital(p5);
  persons.forEach((person) => person.update(p5));
  homes.forEach((home) => home.draw(p5));
  drawStats(p5);
}

function drawHospital(p5) {
  p5.fill(p5.color(30, 180, 22, 50));
  p5.rect(0, 0, p5.windowWidth, 50);
}

function createInputs(p5) {
  p5.createElement("h2", "Covid-19").position(50, 0);
  p5.createElement("h3", "Simulator").position(60, 30);

  p5.createElement("p", "Number of people").position(10, 70);
  let nOfPeopleInp = p5.createInput(numberOfPeople);
  nOfPeopleInp.position(10, 110);

  p5.createElement("p", "Social Distancing at day").position(10, 120);
  let sd_time = p5.createInput(social_distance_time);
  sd_time.position(10, 155);

  let button = p5.createButton("Start simulation");
  button.position(10, 180);
  button.mousePressed(() => {
    social_distance_time = sd_time.value();
    numberOfPeople = nOfPeopleInp.value();
    setup(p5);
  });
}

function drawStats(p5) {
  p5.fill(p5.color(256, 256, 256));
  p5.rect(0, 0, 200, p5.windowHeight);

  p5.fill(50);

  p5.textSize(18);
  let s = `Current Simulation`;
  p5.text(s, 10, 220, 190, 50);

  p5.textSize(12);
  s = `People: ${persons.length}`;
  p5.text(s, 10, 240, 150, 50);

  const infectedPeople = persons.filter((p) => p.isInfected()).length;
  s = `Infected: ${infectedPeople} (${Math.floor(
    (infectedPeople / persons.length) * 100
  )}%)`;
  p5.text(s, 10, 255, 150, 50);

  s = `Cases: ${persons.filter((p) => p.isIll()).length}`;
  p5.text(s, 10, 270, 150, 50);

  s = `Day: ${time}`;
  p5.text(s, 10, 285, 150, 50);
}

export { setup, draw,time,social_distance_time,persons,homes,homeImg,preload };
