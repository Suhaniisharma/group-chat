// Connect to backend Socket.IO server
const socket = io("http://localhost:3000"); // change port if backend runs elsewhere

const form = document.getElementById("chatForm");
const messageInput = document.getElementById("message");
const usernameInput = document.getElementById("username");
const messagesDiv = document.getElementById("messages");

// Submit message
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (username && message) {
    const msgData = { username, message };

    // Emit to server
    socket.emit("chatMessage", msgData);

    // Show your own message instantly
    appendMessage(msgData, true);

    messageInput.value = "";
  }
});

// Receive broadcast messages
socket.on("chatMessage", (msgData) => {
  appendMessage(msgData, false);
});

// Helper to display messages
function appendMessage({ username, message }, isSelf) {
  const div = document.createElement("div");
  div.classList.add("message", isSelf ? "self" : "other");
  div.innerText = `${username}: ${message}`;
  messagesDiv.appendChild(div);

  // Auto scroll
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
