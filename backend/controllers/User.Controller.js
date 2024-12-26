import { Webhook } from "svix";
import User from "../models/userModel.js";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("whook", whook);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    console.log("req.body", req.body);
    const { data, type } = req.body;
    if (!type || !data) {
      throw new Error("Invalid webhook payload");
    }

    switch (type) {
      case "user.created": {
        try {
          if (!data.email_addresses || !data.email_addresses[0]) {
            throw new Error("Invalid user data for creation");
          }
          const userData = {
            clerkId: data.id,
            email: data.email_addresses[0].email_address,
            name: `${data.first_name} ${data.last_name}`.trim(),
            photo: data.image_url,
          };
          await User.create(userData);
          return res.status(200).json({ message: "User created successfully" });
        } catch (error) {
          console.error("Error creating user:", error.message);
          return res.status(500).json({ error: "Failed to create user" });
        }
      }
      case "user.updated": {
        try {
          if (!data.email_addresses || !data.email_addresses[0]) {
            throw new Error("Invalid user data for update");
          }
          const userData = {
            email: data.email_addresses[0].email_address,
            name: `${data.first_name} ${data.last_name}`.trim(),
            photo: data.image_url,
          };
          await User.findOneAndUpdate({ clerkId: data.id }, userData);
          return res.status(200).json({ message: "User updated successfully" });
        } catch (error) {
          console.error("Error updating user:", error.message);
          return res.status(500).json({ error: "Failed to update user" });
        }
      }
      case "user.deleted": {
        try {
          await User.findOneAndDelete({ clerkId: data.id });
          return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
          console.error("Error deleting user:", error.message);
          return res.status(500).json({ error: "Failed to delete user" });
        }
      }

      default:
        console.warn(`Unhandled event type: ${type}`);
        res.status(400).json({ error: "Unhandled event type" });
        break;
    }
    res.status(200).json({ message: "Webhook handled successfully" });
  } catch (error) {
    console.error("Error handling webhook:", {
      message: error.message,
      headers: req.headers,
      body: req.body,
    });
    if (error.message.includes("Invalid webhook")) {
      return res.status(401).json({ error: "Invalid webhook signature" });
    }
    return res
      .status(400)
      .json({ error: "Invalid webhook signature or payload" });
  }
};

export { clerkWebhooks };
