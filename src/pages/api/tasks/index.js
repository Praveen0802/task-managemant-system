import connectMogoDB from "@/utils/lib/mongodb";
import Task from "@/utils/modal/mogoSchema";

export default async function handler(req, res) {
  const { method } = req;

  try {
    // Connect to MongoDB
    await connectMogoDB();

    switch (method) {
      case "POST":
        const { title, status } = req.body;
        if (!title || !status) {
          return res
            .status(400)
            .json({ success: false, error: "Title and Status are required" });
        }

        const newTask = await Task.create(req.body);
        return res.status(201).json({
          success: true,
          message: "Task created successfully",
          data: newTask,
        });

      case "GET":
        const tasks = await Task.find();
        return res.status(200).json({
          success: true,
          message: "Tasks retrieved successfully",
          data: tasks,
        });

      case "PUT":
        const { id, ...updateData } = req.body;

        if (!id) {
          return res
            .status(400)
            .json({ success: false, error: "Task ID is required" });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
          new: true,
        });

        if (!updatedTask) {
          return res
            .status(404)
            .json({ success: false, error: "Task not found" });
        }

        return res.status(200).json({
          success: true,
          message: "Task updated successfully",
          data: updatedTask,
        });

      default:
        res.setHeader("Allow", ["POST", "GET", "PUT"]);
        return res.status(405).json({
          success: false,
          error: `Method ${method} not allowed`,
        });
    }
  } catch (err) {
    console.error("Error handling request:", err);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
