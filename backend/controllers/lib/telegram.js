import axiosInstance from "./axios.js"
import dotenv from 'dotenv'
dotenv.config()


const WEBSITE = process.env.WEBSITE

const commands = [
    { "command": "start", "description": "Start interacting with the bot" },
    { "command": "get", "description": "Get the application link" },
    { "command": "info", "description": "Get information" }
]

const sendMessage = async (messageObj, messageText) => {
    console.log("hello from sendMessage", messageObj, messageText)
    const api = axiosInstance()
    // return api.post("setMyCommands", {commands})
    return api.post("sendMessage", {
        chat_id: messageObj.chat.id,
        text: messageText
    })
}

const handleMessage = (messageObj) => {
    const messageText = messageObj.text || ""
    console.log("messageText:", messageText)
    if (messageText.charAt(0) === "/") {
        const command = messageText.substr(1)
        switch (command) {
            case "start":
                return sendMessage(
                    messageObj,
                    "Welcome to metrics bot"
                )
            case "get":
                return sendMessage(
                    messageObj,
                    `${WEBSITE}`
                )
            case "info":
                return sendMessage(
                    messageObj,
                    "This is a accelerometer/gyroscope bot. It provides a mobile only website which is able to measure metrics."
                )
            default:
                return sendMessage(
                    messageObj,
                    "Command not found"
                )
        }
    }
    else {
        return sendMessage(
            messageObj,
            `to the message "${messageText}" could not find response`
        )
    }
}

export default handleMessage