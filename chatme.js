const chatInput = document.querySelector("#chat-input")
const sendButton = document.querySelector("#send-btn")
const chatContainer = document.querySelector(".chat-container")


let userText = null;
const API_KEY = "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";


const createElement = (html, className) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML =  html;
    return chatDiv
}


const getchatResponse = async () => {
    const API_URL = "https://api.openai.com/v1/completions";
    //Define the propertice and data for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-instruct",
            prompt: userText,
            max_tokens: 2048,
            temperature: 0.2,
            n: 1,
            stop: null
        })

    }
    try{
        const response = await (await fetch(API_URL, requestOptions)).json();
        console.log(response)
    }catch(error) {
        console.log(error);
    }
}

const showTypingAnimation = () => {

    const html = ` <div class="chat-content">
    <div class="chat-details">
        <img src="Images/chatme.png" alt="chatme image" width="100px" >
            <div class="typing-animation">
                <div class="typing-dot" style="--delay: 0.2s"></div>
                <div class="typing-dot" style="--delay: 0.3s"></div>
                <div class="typing-dot" style="--delay: 0.4s"></div>
            </div>
    </div>
    <span class="copy"><i class="fa-regular fa-copy"></i></span>
</div>`;
    const outgoingChatDiv = createElement(html, "incoming");
    chatContainer.appendChild(outgoingChatDiv)

    getchatResponse();

}
const handleOutgoingChat = () => {

    userText = chatInput.value;
    const html = ` <div class="chat-content">
                    <div class="chat-details">
                        <img src="Images/me.jpg" alt="user image"  width="100px">
                        <p>${userText}</p>
                    </div>
                </div>`;
    const outgoingChatDiv = createElement(html, "outgoing");
    chatContainer.appendChild(outgoingChatDiv)
    setTimeout(showTypingAnimation, 500)

    

}
sendButton.addEventListener("click", handleOutgoingChat);