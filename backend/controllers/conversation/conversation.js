const Conversation = require("../../models/conversationModel")


const getSingleConversation = async (req, res) => {
    const { currentUserId, selectedUserId } = req.body

    try {
        const conversation = await Conversation.findOne({ users: { $all: [currentUserId, selectedUserId] } })
        if (!conversation) {
            const newConversation = new Conversation({ users: [currentUserId, selectedUserId] })
            const creatConversation = await newConversation.save()
            const populate = await Conversation.findOne({ users: { "$all": [currentUserId, selectedUserId] } }).populate('users', { "ObjectId": 1, "username": 1 })
            res.status(200).send({ status: "success", conversationId: populate._id })
        } else {
            res.status(200).send({ status: "success", conversationId: conversation._id })
        }


    } catch (error) {
        console.log(error)
        return res.status(404)
            .send({ status: "fail", message: "Conversation not found...", error: error })
    }
}
const createConversation = async (req, res) => {

}
const getAllConversation = async (req, res) => {
    const currentUserId = req.body.userId
    console.log("current user", currentUserId)

    try {
        const conversations = await Conversation.find({ users: { $in: [currentUserId] } }).populate('users', { "ObjectId": 1, "username": 1, photoURL: 1 })

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