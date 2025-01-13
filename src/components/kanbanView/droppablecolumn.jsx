import DraggableTask from "./draggableTask";
import { useDrop } from "react-dnd";

const DroppableColumn = ({ columnId, tasks, itemTypes, moveTask, accept }) => {
  const [, drop] = useDrop(() => ({
    accept,
    drop: (item) => moveTask(item.task, item.from, columnId),
  }));

  return (
    <div
      ref={drop}
      className="flex flex-col w-1/3 bg-gray-100 p-4 max-md:min-w-[300px] shadow-md border border-gray-200"
    >
      <div className="flex gap-2 items-center mb-4">
        <div
          className={`${
            columnId == "todo"
              ? "bg-red-300"
              : columnId == "done"
              ? "bg-green-300"
              : "bg-yellow-300"
          }   w-4 h-4 rounded-full`}
        />
        <p className="text-xl font-semibold text-gray-700 capitalize">
          {columnId}
        </p>
      </div>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <DraggableTask
            key={index}
            task={task}
            index={index}
            moveTask={moveTask}
            itemTypes={itemTypes}
            columnId={columnId}
          />
        ))}
      </div>
    </div>
  );
};

export default DroppableColumn;
