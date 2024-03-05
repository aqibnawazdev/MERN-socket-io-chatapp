const Message = require("../../models/messageModel")


const createMessage = async (req, res) => {
    // const by = req.userId
    const { conversationId, to, body, by } = req.body

    try {
        const message = new Message({ conversationId, to, by, body })
        const sendMessage = await message.save()
        if (!sendMessage) {
            return res.status(400).send({ status: "fail", message: "Message not sent, Something went worng" })
        }

        res.status(200).send({ status: "success", message: "Message sent successfully..." })

    } catch (error) {
        return res.status(404)
            .send({ status: "fail", message: "Something went wrong...", error: error.message })
    }
}

const getMessages = async (req, res) => {

    const conversationId = req.params.id
    console.log(conversationId)
    try {
        const messages = await Message.find({ conversationId: conversationId })
        if (!messages) {
            return res.status(400).send({ status: "fail", message: "Messages not found.." })
        }

        res.status(200).send({ status: "success", message: messages })

    } catch (error) {
        return res.status(404)
            .send({ status: "fail", message: "Messages not found..", error: error.message })
    }
}

exports.createMessage = createMessage
exports.getMessages = getMessages