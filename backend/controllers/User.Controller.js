import { Webhook } from "svix";
import User from "../models/userModel.js";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created":
        await handleUserCreated(data);
        break;

      case "user.updated":
        await handleUserUpdated(data);
        break;

      case "user.deleted":
        await handleUserDeleted(data.id);
        break;

      default:
        console.log(`Unhandled event type: ${type}`);
    }
    console.log("user updated", handleUserUpdated);
    res.status(200).json({ message: "Webhook handled successfully" });
  } catch (error) {
    console.error("Error handling webhook:", error.message);
    res.status(400).json({ error: "Invalid webhook signature or payload" });
  }
};

const handleUserCreated = async (userData) => {
  const { id, email_addresses, first_name, last_name, profile_image_url } =
    userData;

  // Add new user to MongoDB
  const user = new User({
    clerkId: id,
    email: email_addresses[0]?.email_address,
    name: `${first_name} ${last_name}`.trim(),
    profileImage: profile_image_url,
  });

  await user.save();
  console.log("User created:", user);
};

const handleUserUpdated = async (userData) => {
  const { id, email_addresses, first_name, last_name, profile_image_url } =
    userData;

  // Update user in MongoDB
  const updatedUser = await User.findOneAndUpdate(
    { clerkId: id },
    {
      email: email_addresses[0]?.email_address,
      name: `${first_name} ${last_name}`.trim(),
      profileImage: profile_image_url,
    },
    { new: true }
  );

  console.log("User updated:", updatedUser);
};

const handleUserDeleted = async (clerkId) => {
  // Delete user from MongoDB
  await User.findOneAndDelete({ clerkId });
  console.log("User deleted:", clerkId);
};
export { clerkWebhooks };
