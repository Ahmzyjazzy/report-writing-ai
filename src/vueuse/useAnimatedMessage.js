import { ref } from 'vue'

const welcomeMessageElem = ref(null);

const messages = ref([
    "Do hours worth of research in minutes",
    "How can I help you?",
    "Feel free to ask any questions.",
    "I am here to assist you."
])

function typeMessage(message, index, callback) {
    if (index < message.length) {
        welcomeMessageElem.value.innerHTML += message.charAt(index);
        index++;
        setTimeout(() => typeMessage(message, index, callback), 50);
    } else {
        setTimeout(callback, 1000);
    }
}

function displayMessages(messages, index) {
    if (index < messages.length) {
        welcomeMessageElem.value.innerHTML = ''; // Clear previous messages
        typeMessage(messages[index], 0, () => {
            displayMessages(messages, index + 1);
        });
    }
}

export {
    messages,
    welcomeMessageElem,
    displayMessages
}