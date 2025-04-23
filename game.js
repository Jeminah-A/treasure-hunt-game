const startButton = document.getElementById("start-game");
const replayButton = document.getElementById("replay-btn");
const introSection = document.getElementById("intro");
const gameSection = document.getElementById("game");

startButton.addEventListener("click", () => {
  introSection.style.display = "none";
  gameSection.style.display = "block";
  bgMusic.volume = 0.3;
  bgMusic.play();
  displayRoomInfo();
});


const bgMusic = document.getElementById("bg-music");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");

const directionInput = document.getElementById("direction-input");
directionInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const typedDirection = directionInput.value.trim().toLowerCase();
    directionInput.value = ""; // Clear input box
    move(typedDirection);
  }
});
  
const roomImages = {
  "Forest": "images/forest.jpg",
  "Cave": "images/cave.jpg",
  "River": "images/river.jpg",
  "Treasure Room": "images/treasure.jpg",
  "Trap Room": "images/trap.jpg"
};

// Start background music when the page loads
document.getElementById("start-game").addEventListener("click", () => {
  bgMusic.volume = 0.3;
  bgMusic.play().catch(() => {
    console.log("Music blocked until interaction.");
  });

  // Hide the start button
  document.getElementById("start-game").style.display = "none";

 
  // Start the game
  displayRoomInfo();
});

class Room {
  constructor(name, description, objects = [], exits = {}) {
    this.name = name;
    this.description = description;
    this.objects = objects;
    this.exits = exits;
  }
}

// Rooms
const forest = new Room(
  "Forest",
  "You are in a dark forest. There's a path to the north and east.",
  []
);

const cave = new Room(
  "Cave",
  "You entered a cave. It's cold and damp. Something glimmers in the corner...",
  []
);

const river = new Room(
  "River",
  "You are by a fast-flowing river. A bridge leads west.",
  []
);

const treasureRoom = new Room(
  "Treasure Room",
  "You've found a secret chamber. In front of you is a room filled with GOLD! 🎉",
  []
);

const trapRoom = new Room(
  "Trap Room",
  "You stepped into a trap! You've been trapped in this room. Game over.",
  []
);

// Connect rooms
forest.exits = { north: cave, east: river };
cave.exits = { south: forest, east: trapRoom };
river.exits = { west: forest, north: treasureRoom };

// Game state
let currentRoom = forest;
let hasWon = false;
let hasLost = false;

function displayRoomInfo() {
  const roomDescription = document.getElementById("room-description");
  const roomObjects = document.getElementById("room-objects");
  const actions = document.getElementById("actions");
  const message = document.getElementById("message");

  roomDescription.textContent = `📍 ${currentRoom.name}: ${currentRoom.description}`;
  roomObjects.textContent = currentRoom.objects.length > 0
    ? `You see: ${currentRoom.objects.join(", ")}`
    : "";

    const roomImage = document.getElementById("room-image");
    roomImage.src = roomImages[currentRoom.name] || "";


  //actions.innerHTML = "";
  message.textContent = "";

  if (currentRoom === treasureRoom && !hasWon) {
    hasWon = true;
    message.textContent = "🎉 You found the treasure and won the game!";
    actions.innerHTML = "";
    bgMusic.pause();
    winSound.play();
    replayButton.style.display = "block";
    return;
  }
  
  if (currentRoom === trapRoom && !hasLost) {
    hasLost = true;
    message.textContent = "💀 You fell into a trap. Game over.";
    actions.innerHTML = "";
    bgMusic.pause();
    loseSound.play();
    replayButton.style.display = "block";
    return;
  }
  


}
function move(direction) {
  const nextRoom = currentRoom.exits[direction];
  if (nextRoom) {
    currentRoom = nextRoom;
    displayRoomInfo();
  } else {
    const message = document.getElementById("message");
    message.textContent = "❌ You can't go that way. Try another direction.";
  }
}


// Start the game
displayRoomInfo();

replayButton.addEventListener("click", () => {
  location.reload(); // Simple page refresh for reset
});

