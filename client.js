const socket = io("http://localhost:8000")

const name = prompt("Enter You Name to Join the Chat")
socket.emit("user-joined", name)

const first = document.querySelector(".first")
function generateMessage(side, message) {
    const div = document.createElement("div")                       
    div.classList.add("alert")
    div.innerHTML = message
    if (side === "left") {
        div.classList.add("alert-primary")
        div.classList.add("left")
    }
    else if (side === "right") {
        div.classList.add("alert-secondary")
        div.classList.add("right")
    }
    else {
        div.classList.add("alert-info")
        div.classList.add("center")
    }
    first.appendChild(div)
}

socket.on("new-user-joined", name => {
    if (name)
        generateMessage("center", `${name} Joined the Chat`)
})

function sendMessage() {
    let input = document.getElementById("message")
    if (input.value?.length) {
        generateMessage("right", `${input.value}: You`)
        socket.emit("send", input.value)
        input.value = ""
    }
}

socket.on("receive", ({name, message}) => {
    generateMessage("left", `${name} : ${message}`)
})

socket.on("user-left", (name) => {
    if (name)
        generateMessage("center", `${name} Left the Chat`)
})