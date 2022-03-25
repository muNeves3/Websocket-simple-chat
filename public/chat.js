const socket = io();

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
const room = urlParams.get("select_room");
const usernameDiv = document.getElementById("username");

usernameDiv.innerHTML = `Olá, ${username} - Você entrou na sala <strong>${room}<strong>`;

socket.emit(
  "select_room",
  {
    username,
    room,
  },
  (messages) => {
    messages.forEach((message) => {
      createMessage(message);
    });
  }
);

document.getElementById("message_input").addEventListener("keypress", (e) => {
  if (event.key === "Enter") {
    const message = event.target.value;
    const messageData = { message, room, username };

    socket.emit("message", messageData);

    event.target.value = "";
  }
});

socket.on("message", (data) => {
  createMessage(data);
});

function createMessage(data) {
  const { room, username, message, createdAt } = data;
  const messageDiv = document.getElementById("messages");

  messageDiv.innerHTML += `
      <div class="new_message">
          <label class="form-label">
              <strong>${username}</strong> 
              <span>${message} - ${dayjs(createdAt).format(
    "DD/MM HH:mm"
  )}</span>
          </label>  
      </div>
      `;
}

document.getElementById("logout").addEventListener("click", (e) => {
  window.location.href = "index.html";
});
