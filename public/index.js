const socket = io();

const jsonRoomsData = fetch("../rooms.json")
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    var select = document.getElementById("select_room");

    response.forEach((room) => {
      var optionElement = document.createElement("option");
      optionElement.value = room.name;
      optionElement.innerHTML = room.name;

      select.appendChild(optionElement);
    });
  });

document.getElementById("add_room").addEventListener("click", (e) => {
  //   var form = document.getElementById("main_form");
  var div = document.getElementsByClassName("row")[1];
  var select = document.getElementById("select_room");
  var innerHTMLDiv = `
        <label for="form.label">Digite o nome da sala</label>
        <input type="text" name="roomname" placeholder="nome da sala" id="room_name"/>
    `;

  if (div.children[1].id === "") {
    div.innerHTML = innerHTMLDiv;
    return;
  }

  var newRoomName = div.children[1].value;
  // var optionElement = document.createElement("option");
  // optionElement.value = newRoomName;
  // optionElement.innerHTML = newRoomName;
  // select.appendChild(optionElement);

  div.innerHTML = `
    <label for="form.label">Digite seu usuário</label>
    <input type="text" name="username" placeholder="username" />
  `;
  
  
  socket.emit("new_room", {newRoomName})
});

socket.on("new_room", data => {
  const {newRoomName} = data;
  var select = document.getElementById("select_room");
  var optionElement = document.createElement("option");
  optionElement.value = newRoomName;
  optionElement.innerHTML = newRoomName;
  select.appendChild(optionElement);

  div.innerHTML = `
    <label for="form.label">Digite seu usuário</label>
    <input type="text" name="username" placeholder="username" />
  `;
})

