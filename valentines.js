let noCount = 0;
let yesString = "YAAAAAYYY";
function getRandomImage() {
  const imageDirectory = 'static-content/acceptance/';
  const images = ['1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.png',
    '9.jpg',
    '10.jpg',
    '11.gif',
    '12.gif',
    '13.jpg'
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return imageDirectory + randomImage;
}

function getRandomPosition() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const x = Math.floor(Math.random() * screenWidth);
  const y = Math.floor(Math.random() * screenHeight);
  return { x, y };
}

function getRandomScaling(mean, stdDev) {
  let u1 = Math.random();
  let u2 = Math.random();
  let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z0 * stdDev + mean;
}

function displayRandomImage() {
  const image = new Image();
  const randomPosition = getRandomPosition();
  const randomScaling = getRandomScaling(25,20);

  image.src = getRandomImage();
  image.style.width = randomScaling + '%';
  image.style.position = 'absolute';
  image.style.left = randomPosition.x + 'px';
  image.style.top = randomPosition.y + 'px';

  document.body.appendChild(image);

  // Remove the image after a timeout (adjust the timeout value as needed)
  setTimeout(() => {
    displayRandomImage(); // Call recursively for infinite loop
  }, 200); // Change 5000 to the desired display duration in milliseconds
}

function beExcited() {
  yesString += 'Y';
  document.getElementById('yay').innerTest = yesString;
}


const responsesForNo = [
  "Haha. Nice joke. Why don't you try again?",
  "Okay, yeah, funny the first time. Please try again.",
  "No seriously please stop.",
  "Please.",
  "This isn't funny any more. Is everything okay?",
  "Please just click the yes button.",
  "I thought we were in this together. Click yes, please!",
  "Is there something you're not telling me? Click yes!",
  "I'm starting a petition. #SayYes",
  "Stop messing with me. Click yes, for real!",
  "I'm starting to doubt our relationship status. Say yes!",
  "I'll buy you sushi if you say yes. Deal?",
  "I'll get a mullet if you say yes. Deal?",
  "I'll go dancing with you every night for a month if you say yes. Deal?",
  "I'll buy you a Dior bag if you say yes. Deal?",
  "I'm running out of stupid things to say. Please just say yes",
  "Do you enjoy seeing me suffer? Say yes, please!",
  "Please click yes.",
  "Please.",
  "PLEASE",
  "PLEASE",
  "PLEASE",
  "PLEASE",
  "PLEASE",
  "PLEASE",
  "PLEASE",
  "P̶̡̼͖͗̈́̌͌̉̋͘LEASE.",
  "PLEASE",
  "PLEASE",
  "PLEASE",
  "PLEASE",
  "PLEASE",
  "PLEASE",
  "PĻ̵̪̳̣͙͂̐̅̈́̽̈EASE",
  "PLEASE",
  "PLEASE",
  "P̷̖̭͡Ļ̀̕͏̠̩̠̬̩ͅͅͅE̷̛̤͈̞̠̞͍A̹̝̝̟̬͕̠̩͢͠S̡̙Ę̗̹̠͙̻͈̕",
  "P̸̧̡̧̧̨̢̧̛̛̛̛̣̜̱̳͙͕͕̥͓̳̰͉͔͙̺͔͈̰̜͚̺͖̘̰̘͓̪̯͔̠͓͇̯͙͎̭͙̝̠̺̻͈͚͕͚̼̫̟̘̣̳̳̯͈̥͍̰̝̺͖̤̭͙̥̬͉̳̼̠̥̣̞̊́̐̍͛̅̉̆͛̒̍̏̏̅̈͑̒̿̌̈̇͑̈́̾̍̆͑͐̓̊́̉̈́̂̈̒̈́́͂͑̎͐́́̐̆̅̇͋͊̋͗̔̓̿͐̈̇̆̉͛̄̆̆̿͛̕͘̚͘͜͜͝͝͝͠͝͠ͅͅĻ̷̨̢̡̧̢̧̡̛̯̖͕̥͕̼͔͖̤̲̯̥͕͓̝̩̲͕͎͍̻̬̘̘͖̙͎̘͙̖̗͈̥̻̬̬̤̹͇̜̗̤̥͉̜͎̬͕̱̯̪̥̪̰̘̙̻͙̹͕̭͎̼̬̙̙̺͔̼̦̯͒̈́̽͊̏̔̔͐̈́̑̋̇͛̀͊̌̄̐́̏̏̉͊̽̈̅̐̆͆̒̿́̈́̽̏̚̕͠͝ͅȨ̴̡̧̢̧̨̢̡̧̜̳͖̱̥̗̻̟̺̟̯͚̜̣̭̰͈͕̪͔̟͍͎̗̯̻̣̖͈̟̖̹͚͙͍͇͉̺̙̫͓̼͍̙̲̯̠̫̳̻̫̜̮̫̮͙̙̗̥̔͗̆̇̆̾̈̎̊͆͆̿̊͐̌̋̏̈́͗͊̐̒̌̎̓͐̄͗͗̿͐̇͑͐̈̉̌̃̎̓̉̀̀̃͂̋̊͌̅͊̀͐͋͗͌̓̃́̔̋͗̐̋̎̕̚͘̕̚͘͘͜͝͝͝͝ͅͅǍ̶̢̛̛̺͗̋͒͗̃̽̉͑̐̉̑̂́͂̌̈́̊͒̄̑͆̕̕͘͘̕̕͝Ś̶̙͍́̅̑̄̌͆̄̈̃͋̓̉̓̏̆͘͠͝Ę̸̡̛̛̛̛̱̜̺̝̩̮̲̣̝͓͈̬̳͍̻̭͉̤̻̦̝̜̤̹̺̦̞͉̩̣̦̬̬͉͈̩͉̗͓̼̮̜̪̝͉̤͉̮̖̪̮͕̳̲̩̭̪̣͍̈́͌̎̿̑͛̆̍̇̆̐́̒̃̎͋̉͐̑̾̒̅̓͐́͋͑͋̈̒͊̓̈́͌̊́͆͐̏̏̌̾͋̓̔͐͌̈́͋̒̋̃̑̀̿͋͆̍͊̃͊̑̎̇͆̊̑͛̆̔̾͊̓̋́͑͌̓̐͛̅̇̇̾̽̃͒̐̅̍̋̍͒̃̐͘̚̚̕̕͜͜͜͜͜͜͠͠͝ͅ",
  "P̴̢̡̢̡̛̛̛͈̲̟͖͉̩̦̱̹͍͙̭̫̜̘͎̞͙̟̭͈̳̦̯̟̼̪͈͚̞̼̟͖̺̹̳̳͎̹̞͉̱̣̋̈͌͂̅̒̃̈͗̄̆͒́́̏̾͐̽̒̽̄̔͌͌̄͑̌̄̌̓̀̃͒̿̍̃̍̔͐̊̐̿͑̓̈̈́̐͋̓̃̉̌̒̃̌͛̊̄̄̃̍̋̐̒͆̎̍̅̚͘͘̕͘͘͜͜͝͝͝͝͠͠ͅͅͅĻ̸̢̢̧̨̡̢̧̧̧̡̛̛̛̛̛̯̖̟̫͉̠͉̬̗͇̰̬̣̬͖̝͉̜͇̭̘͔̫̮͔͎̤͇̱̞̣͕̟͚̹̹̪̻̞̭̠̘͔̺̩͎̺͍̗̤͔̬̯̟̝̯̝͕͕̭̭͉̞͖͚̯̮̩̖̬̞̘̘͉̝͍̰͉͖̜̱̱͎͔͙͙̻̦͓͉̜̞̩͓̪̤̦͚̲͓̼̱̜͍̘̥͎̟̗͚̺̤̽͗̉͆̐̉̄͒͛̈̏͊̏͑͐̋͗̃̽͗̃̂̇͒̓͑͐͗̈́̐͛͛̈̈̈́̈́͌̔̾͛̂͛̿͑́̇̊̆̍̿̊̉̏̏͌̇̾̀̿͗̍̑͒̽͐͒̍̉̆̽͒̃̐͛̇́͌͂͊́̊̆̆̔̑̄͊͐͑̓̀̐̿̾̽̉͒̌̍̊̒͗́̍̆̑̍̅̃̓̿̀͗̆̐͛̒͆͆̋͐̔͒͂͋̔̕̕̚̕͘̚̚̚̚̕͘̕̚̚͜͝͝͝͝͠͝͝͠͝ͅͅͅE̶͇̱͗̓̉̏̈́͛͗́̍͊͂́̔̀̎̔͂̂͋̄̀͑̏̋͒̚͠A̵̡̧̢̡̢̢̨̨̢̡̨̧̡̛̛̛̛̫̼̺̞̪̭̲̮̫͓͉̥̖̬̺̳͍͖̩͇̩̟̦̖͈̮͖͙̳̰̼͚̜̻͖̫̪̲̰̹̰̯͎̥̟̝͕̥̦̰̼͇̤͔̱̭̝͎͈̥̹̖͕̣̗̮̰̱̻͓͔̣̤̲̙̫̮̖̬̬̥̼͍̰͖͈͔̘̟͎̗̼͎̤̼̝̦̗̗̙̞̙̻̫̥̓̿̋̓̏̈́͐͐͛̀̊̈́͐́̈́͋̐́̒̐͑̅̀͒̐͑͐̀̔̐̊̋̄̇̂̃̓̏̿̓̋̂̿͌͋̄̎̇͛͛̌̽̏̋̑͐̅͛̀͒̋̍̆͒͊̇̅́̒͆̃̒̓̅̃͋̾̋̏̎̏͐̀̎̈͗͋͛̈̈͌̅̿́̾̒̽̃̒̍̌͒̎̀̓͆̐̏̊̃͂͗̊̂̂͊͗́͌̊̏̃͂̀̂͒̊͒̒̾̋̽̂̋͌̅̀̇͘̚̕͘͘͘͘̕̕͜͝͠͝͝͝͝͝͝͠͝ͅͅͅͅŚ̶̡̧̢̨̧̢̧̡̨̢̢̨̧̛̛̛̛̺̖͍̳̫͈̥̗̤͔̪͕̖͍̜͕̟̳̳̗̹̜̟͕̳̲̟̖͍͓͔͔͇̪̜̩̯͓͚̬̗̗̯̘̘̗̣̟͖̪̗̖͕͔͎̻̪̟̥̹̗̹̘̪̩̥̗̣̩̞̰͚͈̞͉͔̝͖͍̰̫̤͖̮̣̪̖̲͍͕̖̳͚̖̭̗̤̫͈͇̖̥̺̖̞̣̗̳̻̗̱͉͙͙̗̼͕̺̦͙̰͎̯̰̖̗͈̝̰̙͙̠̦̗͓͍͍̲͓̤̰̬̯̜̣̲͇̣̫̮̺̝̜̖̙̫̮̤̰̼̬͚̪̼̦̖͈͍͈̻̻̤̠̺̼͐͆̂̀̆͌̉̂͂͗̓͊̌̾̂̒͂̍͗̌̀́̾̋̍̈́̌̂̽̇̊̑́̀́͌̀̎̈́̈̔̿͗͂͑͆̋͆̍̏͂̅̋͑͑̃̈͑̍͌̍̇̑͌̔̄͊̎̇̽̿̓̃̊͗̂̒̑́̒͆̾̑̊͛̋̂̋̔̄̽͐̉̌͗̀̋̃̌͘̕͘̕̚̕͘̕̚͜͜͜͜͜͜͠͠͝͝͝͝͠͝ͅͅͅͅͅͅͅȨ̷̧̧̧̡̬̲̣̘̬̥̮̘̹̯͔̠̯͙̩̖͎̟̭̻̬͖̮͓̫̙̣̞̬͕̤͕͓͉͑̀̈́̀͌̋̉̓̀͛̔͆͌͐͛̈́͛̅̄͒̎̃͗̋̽͗̍̈́̋̈́̇͑̉̈́̒̈́̇͂̀̏̉̄̀̆̈͒̈́̆̎͛͌̎̆̎̉̃́̒͋̽̂̔̎̾̀̒̎́͊̆̂̂͌͊͑̾̾̄̕̚̕̚͘͘̕͜͜͝͝͝͝ͅͅ",
  "P̵̧̣̪͕̤̭̲̋̄̎̀̈́̈́͐͌̈̍͆͆̎̋́̽̀̄̀̇̎͂͘̕͘͝ͅĻ̷̢̨̧̧̨̨̢̨̧̧̧̢̨̢̡̨̧̡̛̥͈͉̥̠̹̯͕̜̠͕̗̬̯͎̠̥͓͓̣̺̜̤͓̺̖̖̦͚͉̟̬̤̯̙̤̣̰̘̱̱̣̜̱͍̙̯̗̬̹̦̣͈̪̖̣̭̙͔̭̥̰̮̗͚̯͕̦̬͚̮̫̣̝͉̲̯̺̱̞͓̳̰͎͚͕̳͓͇̥̟͙͚͓͓̗̗͕͚̼̬͈͔̤͇̹̺̙̥̜͇͖͔̘̯͉̠͖̥̥̹̗͈̫͚͔͔͎̭̞̯͎̥͉̻̯̗̼̻̖̖̤̟̪̬͖͕̼͔̠̪͆̓́̒́̾̂͐͑̈́̽̈́͒̄͛̔͆̌̀̾̋̈̄̄͑͐͗̋̇͋́̃̑̅̌̋̽̾́̎̃̍͋͘̚̕͘͘̕͜͜͠͝͝͝ͅͅͅͅĘ̸̧̧̨̧̢̧̧̙̦̘͖͇̗̖̤͚̲̝̠̺̯͕̯̰͓̼̠̯͉͖̥̺̮̰̫̙͕̮̪͕̯͖̭͎̬̺͕̜͇͚̼̝̱̰̠̱̘̩̠̮̪̓̇́̽͋̈́̽̉͗͗̑͗̅̑̌͌̓̐͌̓͘̚͜͜Ạ̸̢̢̧̨̨̧̢̡̨̡̡̛̮̭̯͖̯̤̜̳͇͙̘̳̲̱̟̬͇̠͖̞̺̞̥̻̪͎̙̤̰̥̙̘͙̞̹̮̗͎̺̖̘̳̜͚̠̖̣̳͚̗̜͇̤͖̳̤͍̘̗̟̖̲̮̗̺̤̘̼̭̯̦̪̟͍͔̗̹̟͚̙͙̰̩̣͈̳̜̘̮͚̘͚͕̙͇̼͇͓͉͉̗̻͆̈͆̒̈̾́̌͗̊̌̃̔̃̅̅̑̔̃̈̅̆͋̎̇͑̌̀̓̇̀̾͂̑̊̍͑͗͛̈́̾̃͋͂̊́͛͑̓̀̆͗̾̔͋̂̀̃͒͐̊̅̈͛͊̊̄͗̿̾͑̉̏̌̎̽̃̇͆̌̽̋̿̀̊̅̽͒͑̿̌̌̔̅̑̉̐̒̈͊͆͂̈̑̽̓̒͑̄͆̆̄̆̃̀͐͋́̉̓̃͂̆͛̍͂͒̽͗̏̓̍͗̀̔̿̿͌̑͌̔̋̿̃̌̍͗̽̆͌͌͌̅̽̔̋̏͒̉̆̾̈͋͗̄̋̐̋̉͂͋̔̿͐͂͑̎͌́́͆͆͘̚̚̕̚̚̚̕͘̚͘̚͜͜͝͝͠͝͠͝͝͝͝͝͝͝͝͠͝ͅͅͅS̴̡̨̡̡̢̨̧̡̧̢̧̢̨̨̧̧̡̨̨̢̞͚̰͓̳̯̦̗͈͓̦̞̳̳̖̩̣̳̮̺̯͔̖͕̹͉̥̫̣̺͖̙̹̰̳̮̣͈̙̬͚̘̹̤͕̻̘̳̥̹͚̻̝̣͙̼͇͈̹̠̝͍̪̯͎͙͚̯͙̰̫͉̤̹̺̥̫̝̳̞̫̜̘̟̜̰̙̗̝̻̦͖̘͔̤̹̖̼̪͕͈̺̼̠̪̳̗̜̰̞̘̱̼̝̼̝͇͓̦̤̦͇̯͚̹̜̩̠͇͔̪̥̳͇͈̫̯͙̻͓̫̖͖̦̖̻̼͕̖̻͇̩̠̤̼̪̻͍̩̟̹̝̬̘̹̯̘̣̭̞̰̺͕̼̲̯͈̥͔̳͇̟̳̪̺̭̗̣̲̬͍͈̜̳̠̲̻̩̼̖̱̹͓͈̯̙̳̥̙̝͇͍̺̹̜̦̩͕͉̟̪̪̲̩̀͜͜͜͜͜͜͜ͅͅͅĘ̵̧̧̛̛̛̛͙̹͓̬̤͖̫͖͎͈̙̯̲͍̤̦͉͚͎̮̟̱̻͖͍͙̲̳͇͎̤̃̔̓̀̒̊̊͒͌͌́͆̓̈̇͑̀̈́͗̇̒̓̾̑͗̽̍̈̆̊́́̐̅̍̇̂́̈̊͛̿̀̿̀̀͂̂̄̄̽͒͑̍̐̅̅̎̆̎̊͆̎̔̌͂͂̾̒̔̊̒̓̽͂̚͘̕͘̕͘͝͝͝͝͠͝",
  "P̶̡̧̢̨̡̡̨̡̨̡̡̡̢̨̢̧̡̨̨̢̧̨̨̧̨̨̨̨̢̨̨̢̧̡̛̥̳̖̰̰̳̙̳̮͎͈̱͈͔̣͈̦͉̜̜͍̗͔͍͎̖̯̬̼̤̪͚͕̙̜̖͈̩̣̯̹̬̪̥̦͔̼̩̬̦̺̗̭̭͎͇͙̙̯͙̠̥̞͔͇̥̰̯̹̺̱͍̺̩̹͕͙̤̙̱̺̥͔̤̳̼̬̺̼̬̼̠̮͍̻̭̣̲̳͓̩̫͙͍̤̫̙̭̘͓̥͙̘̻̝̭̻͈̝̖̜̖̩̞̤͕̯͖̰̞̫̰̙̗̳̦̟̘͙̺͕̘̬̪̰̥̝͇̦̥̞͓̪̠̮̯̺̦̹͕͕̯͎̬͇͕̙̗̫̹͎͙̹̖̖̲̰̪͈̝͈̭̻̤̮̝̻̩̠̟̺͓͔̟͕̯͍̮̣̫̞͍̗͉̜͍̦̝̪̭͙̥͙͍͇̥̙͖͓̳̺̫̻̣̱̭̭̥͙͈͈̱̘̥͚̞̺̹̺̲̰̦̳̣̾̂́̀̒̇̈́̈́̇̆̈̾̓̓̎̃̎͊́͗̂̀̽͊̏̅͗͐̌̓͋̇̅̉̃̂͐́̂͐͂͒̑͒͒̀̾̓́̓̎͌̅̊̂̌̔̑͑̓̂̏̕̚̕̚͜͜͜͜͜͜͜͠ͅͅͅͅͅĻ̸̢̛̛̟̯̪̬̦̻̖͙̤̺̜̪̹̲̺̭̜͖͚̣̝̘̖͍̯͇̪̳͆̏̂̑̃́́̇̓́̾̊̄̑͐́̃͐͐̆̊̈̿̿̀̓̆̃͌̊̊͊͌̿͗̓̓̉̔̋̑͗̾̅͌̏̉͂̓̋̇̏̐̓̇́̈̂̾̓̅̾̎̋̌̒̑̄̃͋̌̑͊̎̚̕̕̕͘͜͠͝͠͝͠͝E̶̡̢̧̡̧̡̨̡̡̧̨̧̢̡̧̢̨̧̡̡̢̢̧̧̛̛̱̮̳̹̜͙͍̦͉̯̰͔̻͕̤̪̬̪͉̖̫͓̺͎̜̘̳̻͔͍͓̰̪͈̜̥͍̗̟̪̺̜̞̜̱͙͚͖͚͇͎̰͖͔͙̖̺̥̗̯̬͇̳͉͎̹̹̘̥̥͈͇̩͇̲̱̤̜̙̻͍̘͎͈̦̲̗̥̠͉̬͈͇̞͚̯̲͎̖̤͈̦͍̻̺̱̯̗͕͈̘̦͎̗͖̙̹̼̳͖͈̣̻̯͍͇̟̘̱̭̬͖̖͉͉͍̻͖͎̖̞͈͍̜̫̤̹̥̟̤͖̟̟̩͖̖̯̺̱͉̲͔̼͔̪͔̹̱͓̎̓́̌̈́͊̇͐͊̃̆̿̈́͐̈̾́̀͋͌̈̎̋̄̅̓̍̾̅̿̊̈́͋͒͗͗̈́̾̈̔͆̏̄͂̑̑̒̽̄͌̽̿̂̄̅͑̔̇̔̾͐̄̔̐̀̄̂̎̆̐͌̒̍̿́̎͂̌́̋̏͌͆͘̕̕͘̕̕͜͜͜͝͝͝͝͝͝ͅͅͅͅͅͅͅĀ̶̡̡̧̡̡̢̨̡̧̧̢̢̧̧̺͍͔͔͇͍͇̗̪̩͈̙̲̹̬̩̩̝̜͉̼̭̹̻͇̝̟͙̦͎͔̱̭͖̞̗̫̙̥̰̰̩͍̹̺̺̥͖̪͎͎̻͙̮͚͚̗̟̻̞̹̳̼͈̲̖͍͍̖͚͍͉͔̙̗̼̹̖̪̖̱̰̳̝͚̝̪̯͎̻͕̱̠̗͇̘̣̹̗͙͍̟̹̠̬̘͇̱͇̜͖̱̝̟̫͖͔̟̟̞͎͙̩̼̹̻̪͇͉͖͖̘͍͈͔̘̻͍͚͉͔̤̜̹̮͍͖̰̩͓͔͙̣̞̻̟̩̥̝̰͎̩̙̟̰̗̭͖̠̝͈̮͙̹̫̠͎͈͙͔̘͎̘̯͙͉̩̰̲̠͎̩̜̣̣͙̣̲̗͔̖̣̗̪͙͙͙̯͔̖̞̠̣͂͒͌̐̾͐̄̈͗̋̉̂͛̈͊͑͜͜͜͜͜͜͜͜ͅͅͅͅŞ̶̡̡̨̢̨̢̢̨̡̨̨̡̡̡̡̢̨̧̢̛̻͖̖̥͍̣͉͚̦̜̙̲͇̫͇͉̥̩̩͚͖̲̫͚͎̺̼̱̻̩̬̘̭͉̮̦̣̟̲̬͉̯̩̜̬̣̹͉̤͔͈̺͙̱̥̜̟̖̯͇̩̘̪͎͕̩̬͖͈̮̩͖͖̜͓̫͎̫̳̘̮̞͚̹̻͇̮͚̩͖̙̠͎͔̟̪̤̻͖̜̮͈̱͖̫̜̘͙͖̟̱͔̫̪̼̙̦̦͎͉̰̰͙̱͉̫̤̪͇̲̫̳̤̮͉̬̰͕͇̥̬̠̮̬̲̦̪̻̺̳̻̱̦͇̩̖̤̥̗͈͕̭̟̙̲̞̘̱͈͉̩͖͚̦̼̭̩̬͙̺̺̹͕͎̺̺̹̱̻̣͓̞̜̣̺̺̝̰͔̤̲̜̪̠̱̘͈͖͎̗̱̦̞̯̠̼̭͖̘̖͖̖̝̹̠̖̺͔̰̪̝͇̫͈̙̮̠̖̺̗̜̥̆͌̄̉̃̃̊͆͛͊̄́̃̄͒̅̍̒́̈̀̈̆̏̂̈͆͛̐̓̋͌̊̀́̈̈́͂̌͛́̃̐̌̊̉̇͌̔̊̔̅͗̓̿̓͗̓͐̐͛̀̏̊͆̿͒͒͊̑̅̉̌͛͋̑͌̀͒̀͊̎̄̀̄͒̆͐̿̿̍̔̉̑̂̑͂̈̑͒̏̃͆͑̇̐̽̏͆́́̏́͊̒͊̍͗̅̉̐̃͋̃̃͋̔͌̔̋͌͒̉̀̂̇̔̀͑̃͋̅͑̀͊̌̐̅̒̂͑̉͐̊̑̿̔̓̅̽̐̐̽̎͂͒͗͋͐̀̄̋̔̎̃̂̑̚͘͘͘̕̚̕̕̚͘͘̚̚͘̚̚͘̕̕͜͜͜͜͝͝͠͝͝͠͠͝͠͝͝͝͝͝͠͝͝ͅͅͅͅͅͅͅĘ̴̨̧̡̡̡̡̧̢̢̧̡̨̨̡̛̛̛̛̛̝̩̖̝̘̦̟̜̞̘̟͇͎̠̞̝͉͎̦̻̯̰̳͖̪̠̱͇̰͖̯̳͕̯̦̦̜͈͈̣̞̬͚͇̩̳̥͎̲͇̫̗̞͕̪̬̭̰͉̠̲̞̹̲͓͇̖͍̦̘̮͙̻̗̲̘̦̳͚̗̬̥̗̹͉̣̣̙̰̜̥͎͇͖͎̭̜̺̯̲̠͕̤̖̙̼̲͚̯̣͇̗̹̞̝̤̞̗̩͕͖͇̳̘̜̬̮̟̙̳͈̰̼̼̗̘̲̻̹̫̙͕͚̱̹̰̘̥͇̭͇̤͚͚̹̫͔̯̝͚̖͚̼͓̣̯̭͍̺̩̗͆̂͋̒͐̔̒́̑̂̑͛̀̿͛̀̅̿͐̓̈͊͌͆̍̆́̈́̀͐͋́̄̿̓̎̐̇̇̊͒͋̎̈̄͆͋͛͌̀̏̄͑̃̇̉͊̇͂̋̿̄͑̓̆̅̂͊͂͒͐̾̐̍̃̽̈̾̎̀̇̐͑́̽̑̀͛̾͆̄͌͂̆̔̀͂͗́͑͂͆̇̏̆̅̓̂̽̽̋͛͊͊͊̋͗͊̔̌̈͂̉̂̆̓͋͋̄͂̈͌̆̋̍͗̂̃̂͆̊̑͛́̊̄́̅̀̏͑͗̂̂̒̚̕͘͘͘͘͘̕͜͜͜͜͠͝͝͝͠͝͠͝͝͝͝ͅͅͅ",
];

function wipePage() {
  document.body.innerHTML = '';
}

function setInnerHTMLFromFile(filename) {
  wipePage();
  fetch(filename)
    .then(response => response.text())
    .then(htmlContent => {
      document.body.innerHTML = htmlContent;
    })
    .catch(error => console.error('Error fetching' + filename + ':', error));
}

function showForeverAlone() {
  wipePage();
  var img = document.createElement('img');
  img.src = 'static-content/forever-alone.jpg';
  document.body.appendChild(img);
}

function beExcited() {
  yesString += 'Y';
  document.getElementById("yay").innerText = yesString;
}

function doYes() {
  setInnerHTMLFromFile('yes.html');
  setInterval(beExcited, 2);
  displayRandomImage();
}

function doNo() {
  if (noCount > 38) {
    showForeverAlone()
  }
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = responsesForNo[Math.min(noCount, responsesForNo.length - 1)];
  noCount++;
document.body.append(div);
}

document.getElementById("yesButton").onclick = () => { doYes(); };
document.getElementById("noButton").onclick = () => { doNo(); };
