const socket = io();
        
const chatForm = document.querySelector('#chat-form')
const chatMess = document.querySelector('#chat-mess')

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = chatMess.value;

    socket.emit('on-chat', { 
        message: message 
    })
    chatMess.value = ''
})

const messages = document.querySelector('#messages')

socket.on('user-chat', item => {
    console.log("item",item)
    const chatItem = document.createElement('li')
    chatItem.textContent = item.message;

    messages.appendChild(chatItem)
})
