
const socket =io('http://localhost:4000')



const form = document.getElementById('send-container')
const messageInput =document.getElementById('messageInp')
const container = document.querySelector('.container')

const append = (message,position)=>{

    const messageElement = document.createElement('div')
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    container.append(messageElement)
    messageInput.value='';

}

form.addEventListener('submit' ,(e)=>{

    e.preventDefault();
    const messagecontent=messageInput.value;
    append(messagecontent,'right')
    socket.emit( 'send', messagecontent)
})
const naam = prompt('enter name to join');
socket.emit('new-user-joined',naam);

socket.on('user-joined', data=>{
    append(`${data} is here`,'center')
})


socket.on('recieve', data=>{
    append(`${data.name} : ${data.message} `,'left')
})

socket.on('left',user =>{
    append(`${user} is no more`, 'center');
})