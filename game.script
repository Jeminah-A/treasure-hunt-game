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
  ["shiny rock"]
);

const river = new Room(
  "River",
  "You are by a fast-flowing river. A bridge leads west.",
  []
);

const treasureRoom = new Room(
  "Treasure Room",
  "You've found a secret chamber. In front of you is a BAG OF GOLD! 🎉",
  ["bag of gold"]
);

const trapRoom = new Room(
  "Trap Room",
  "You stepped into a trap! You fall into a pit of spikes. Game over.",
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

  actions.innerHTML = "";
  message.textContent = "";

  for (const direction in currentRoom.exits) {
    const btn = document.createElement("button");
    btn.textContent = `Go ${direction}`;
    btn.onclick = () => move(direction);
    actions.appendChild(btn);
  }

  if (currentRoom === treasureRoom) {
    hasWon = true;
    message.textContent = "🎉 You found the treasure and won the game!";
    actions.innerHTML = "";
  } else if (currentRoom === trapRoom) {
    hasLost = true;
    message.textContent = "💀 You fell into a trap. Game over.";
    actions.innerHTML = "";
  }
}

function move(direction) {
  const nextRoom = currentRoom.exits[direction];
  if (nextRoom) {
    currentRoom = nextRoom;
    displayRoomInfo();
  }
}

// Start the game
displayRoomInfo();
