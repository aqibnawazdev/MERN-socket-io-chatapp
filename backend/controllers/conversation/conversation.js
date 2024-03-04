const Conversation = require("../../models/conversationModel")


const getSingleConversation = async (req, res) => {

    try {
        const conversation = await Conversation.find({ users: { "$all": [currentUserId, selectedUserId] } }).populate('users', { "ObjectId": 1, "username": 1 })
        if (conversation.length < 1) {
            const newConversation = new Conversation({ users: [currentUserId, selectedUserId] })
            const creatConversation = await newConversation.save()
            const populate = await Conversation.find({ users: { "$all": [currentUserId, selectedUserId] } }).populate('users', { "ObjectId": 1, "username": 1 })
            res.status(200).send({ status: "success", conversation: populate[0] })
        } else {
            res.status(200).send({ status: "success", conversation: conversation[0] })
        }


    } catch (error) {
        return res.status(404)
            .send({ status: "fail", message: "Conversation not found...", error: error.message })
    }
}
const getAllConversation = async (req, res) => {
    console.log("object")
    console.log(req.userId)
    const currentUserId = req.userId

    try {
        const conversations = await Conversation.find({ users: { $in: [currentUserId] } }).populate('users', { "ObjectId": 1, "username": 1 })

        if (conversations.length < 1) {
            res.status(200).send({ status: "fail", message: "No conversation Found" })
        } else {
            res.status(200).send({ status: "success", conversation: conversations })
        }


    } catch (error) {
        return res.status(404)
            .send({ status: "fail", message: "Conversation not found...", error: error.message })
    }
}

exports.getAllConversation = getAllConversation
exports.getSingleConversation = getSingleConversation