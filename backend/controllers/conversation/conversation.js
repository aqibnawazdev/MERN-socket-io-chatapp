const Conversation = require("../../models/conversationModel");

const getSingleConversation = async (req, res) => {
    const currentUserId = req.userId;
    const selectedUserId = req.params.selectedUserId;

    try {
        const conversation = await Conversation.findOne({
            users: { $all: [currentUserId, selectedUserId] },
        });

        res
            .status(200)
            .send({ status: "success", conversationId: conversation._id });
    } catch (error) {
        console.log(error);
        return res
            .status(404)
            .send({
                status: "fail",
                message: "Conversation not found...",
                error: error,
            });
    }
};
const createConversation = async (req, res) => {
    const currentUserId = req.userId;
    const selectedUserId = req.params.selectedUserId;

    try {
        const newConversation = new Conversation({
            users: [currentUserId, selectedUserId],
        });
        await newConversation.save();
        const populate = await Conversation.findOne({
            users: { $all: [currentUserId, selectedUserId] },
        });
        res.status(200).send({ status: "success", conversationId: populate._id });
    } catch (error) {
        res.statu(404).send(error);
    }
};
const getAllConversation = async (req, res) => {
    const currentUserId = req.userId;

    try {
        const conversations = await Conversation.find({
            users: { $in: [currentUserId] },
        }).populate("users", { ObjectId: 1, username: 1, photoURL: 1 });

        const mutateConv = conversations.map((c, i, { users }) => ({
            ...c._doc,
            users: c.users.find((u) => u.id !== currentUserId),
        }));


        if (mutateConv.length < 1) {
            res
                .status(200)
                .send({ status: "fail", message: "No conversation Found" });
        } else {
            res.status(200).send({ status: "success", conversation: mutateConv });
        }
    } catch (error) {
        return res
            .status(404)
            .send({
                status: "fail",
                message: "Conversation not found...",
                error: error.message,
            });
    }
};

exports.getAllConversation = getAllConversation;
exports.getSingleConversation = getSingleConversation;
exports.createConversation = createConversation;
