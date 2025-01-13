import { useDrag } from "react-dnd";
import { useTaskContext } from ".";
import { capitalizeFirstChar } from "@/utils/helper";

const DraggableTask = ({ task, index, itemTypes, moveTask, columnId }) => {
  const { setAddTask, setTaskView, setTaskDetails } = useTaskContext();
  const [{ isDragging }, drag] = useDrag(() => {
    const item = { taskId: task._id, task, from: columnId };
    return {
      type: itemTypes.TASK,
      item,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    };
  });

  return (
    <div
      ref={drag}
      onClick={() => {
        setTaskView("view");
        setTaskDetails({
          ...task,
          status: { label: capitalizeFirstChar(columnId), value: columnId },
        });
        setAddTask(true);
      }}
      className={`bg-white p-4 mb-3 rounded-md shadow-md cursor-pointer border 
      hover:shadow-lg transition-all duration-200 
      ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="font-medium text-lg">{task?.title}</div>
      <div className="text-sm text-gray-500 mt-2">{task?.desc}</div>
    </div>
  );
};

export default DraggableTask;
