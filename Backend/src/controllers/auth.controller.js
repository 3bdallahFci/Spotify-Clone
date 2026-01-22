import User from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });

    if(!user) {
        const newUser = new User({
            username: `${firstName} ${lastName}`,
            imageUrl,
            clerkId: id,
        });
        await newUser.save();
        return res.status(201).json(newUser);
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("AuthCallback error",error);
    return res.status(500).json({ message: "Internal server error",error });
  }
};
