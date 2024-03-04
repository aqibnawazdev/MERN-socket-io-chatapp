const Message = require("../../models/messageModel")


const createMessage = async (req, res) => {
    const by = req.userId
    const { conversationId, to, body } = req.body

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


exports.createMessage = createMessage