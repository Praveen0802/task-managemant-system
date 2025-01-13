import { createContext, useContext, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DroppableColumn from "./droppablecolumn";
import RightModalViewWrapper from "../rightModalViewWrapper";
import axios from "axios";
import { checkEmptyObject } from "@/utils/helper";
import { fetchTaskDetails, updateTask } from "@/utils/request";
import Spinner from "../spinner";

const ItemTypes = {
  TASK: "task",
};

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

const TasksView = () => {
  const initialTasks = { todo: [], inprogress: [], done: [] };
  const [tasks, setTasks] = useState(initialTasks);
  const [addTask, setAddTask] = useState(false);
  const [taskView, setTaskView] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [pageLoader, setPageLoader] = useState(false);
  const getTaskFromApi = async (loader) => {
    try {
      if (loader) setPageLoader(true);
      const fetchValues = await fetchTaskDetails();
      const updatedTasks = fetchValues?.reduce((acc, task) => {
        if (!acc[task.status]) {
          acc[task.status] = [];
        }
        acc[task.status].push(task);
        return acc;
      }, {});
      setTasks({ ...initialTasks, ...updatedTasks });
      setPageLoader(false);
    } catch (err) {
      console.log(err, "generated error");
    }
  };

  useEffect(() => {
    getTaskFromApi(true);
  }, []);
  const moveTask = async (task, from, to) => {
   
    const { _id, status, ...rest } = task;
    const updatePayload = {
      ...rest,
      status: to,
      id: _id,
    };
    if (from == to) return;
    await setTasks((prevTasks) => {
      const fromColumn = [...prevTasks[from]];
      const toColumn = [...prevTasks[to]];
      fromColumn.splice(fromColumn.indexOf(task), 1);
      toColumn.push(task);

      return {
        ...prevTasks,
        [from]: fromColumn,
        [to]: toColumn,
      };
    });
    await updateTask(updatePayload);
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!value) {
      getTaskFromApi();
    } else {
      const filteredTasks = Object.keys(tasks).reduce((acc, key) => {
        acc[key] = tasks[key].filter((task) =>
          task.title.toLowerCase().includes(value.toLowerCase())
        );
        return acc;
      }, {});
      setTasks(filteredTasks);
    }
  };

  const popupClose = async () => {
    setAddTask(false);
    setTaskView("");
    setTaskDetails("");
    await getTaskFromApi();
  };

  return (
    <TaskContext.Provider
      value={{
        setAddTask,
        tasks,
        setTasks,
        getTaskFromApi,
        taskDetails,
        setTaskDetails,
        setTaskView,
        popupClose,
      }}
    >
      {pageLoader && <Spinner className="absolute w-full h-full  bg-black/30 " />}

      <div>
        <DndProvider backend={HTML5Backend}>
          <div className="p-4 h-[100vh] flex flex-col gap-4">
            <div className="flex max-md:flex-col gap-3 justify-between md:items-center">
              <p className="text-[1.4rem] md:text-[1.8rem] font-semibold">
                Task Management System
              </p>
              <button
                onClick={() => {
                  setTaskView("add");
                  setAddTask(true);
                }}
                className="bg-[#022b50] text-[16px] w-fit text-white font-medium px-3 py-2 rounded-md"
              >
                + Add New Task
              </button>
            </div>
            <div className="flex flex-col gap-3 h-full">
              <input
                className="w-full border border-gray-300 rounded-md p-2 outline-none"
                placeholder="Enter the task name to search"
                value={searchValue}
                onChange={(e) => {
                  handleSearch(e);
                }}
              />
              <div className="flex space-x-4 max-md:overflow-scroll h-full">
                {!checkEmptyObject(tasks) && (
                  <>
                    {Object.keys(tasks).map((columnId, index) => (
                      <DroppableColumn
                        key={index}
                        columnId={columnId}
                        tasks={tasks[columnId]}
                        moveTask={moveTask}
                        accept={ItemTypes.TASK}
                        itemTypes={ItemTypes}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </DndProvider>
        {addTask && (
          <RightModalViewWrapper
            show={addTask}
            onClose={() => {
              popupClose();
            }}
            taskView={taskView}
          />
        )}
      </div>
    </TaskContext.Provider>
  );
};

export default TasksView;
