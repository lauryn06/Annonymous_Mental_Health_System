const chatForm = document.getElementById('chat-form');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message
    appendMessage('user', message);
    messageInput.value = '';

    // Simulate bot response
    setTimeout(() => {
        const botReply = "Thank you for sharing. Can you tell me more?";
        appendMessage('bot', botReply);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 800);
});

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
