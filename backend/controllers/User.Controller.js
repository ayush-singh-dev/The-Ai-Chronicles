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
    if (!type || !data) {
      throw new Error("Invalid webhook payload");
    }

    switch (type) {
      case "user.created": {
        if (!data.email_addresses || !data.email_addresses[0]) {
          throw new Error("Invalid user data for creation");
        }
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          photo: data.image_url,
        };
        await User.create(userData);
        res.json({ message: "User created successfully" });
        break;
      }
      case "user.updated": {
        if (!data.email_addresses || !data.email_addresses[0]) {
          throw new Error("Invalid user data for update");
        }
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          photo: data.image_url,
        };
        await User.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({ message: "User updated successfully" });
        break;
      }
      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        res.json({ message: "User deleted successfully" });
        break;
      }

      default:
        console.warn(`Unhandled event type: ${type}`);
        res.status(400).json({ error: "Unhandled event type" });
        break;
    }
    res.status(200).json({ message: "Webhook handled successfully" });
  } catch (error) {
    console.error("Error handling webhook:", error.message);
    res.status(400).json({ error: "Invalid webhook signature or payload" });
  }
};

export { clerkWebhooks };
