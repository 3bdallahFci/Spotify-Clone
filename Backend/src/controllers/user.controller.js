import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.params.userId;
		const users = await User.find({ clerkId: { $ne: currentUserId } });
		res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
		const { senderId, receiverId } = req.params;

		if (!senderId || !receiverId) {
			return res.status(400).json({ error: "Missing senderId or receiverId" });
		}

		const messages = await Message.find({
			$or: [
				{ senderId: senderId, receiverId: receiverId },
				{ senderId: receiverId, receiverId: senderId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
