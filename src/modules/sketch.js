let homeImg;
function preload() {
  homeImg = loadImage("../home_icon.png");
}

const INITIAL_INFECTED_PEOPLE = 1;
const CONTAMINATION_RADIUS = 1;
const INCUBATION_PERIOD = 2;
let SOCIAL_DISTANCING_TIME = 5;
let numberOfPeople = 1000;
