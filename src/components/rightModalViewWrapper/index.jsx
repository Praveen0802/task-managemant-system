import AddTaskForm from "../addTaskForm";
import CustomModal from "../customModal";

const RightModalViewWrapper = ({ show, onClose, title, taskView }) => {
  const updateView = taskView == "update";
  const addView = taskView == "add";
  const viewOnly = taskView == "view";
  return (
    <CustomModal show={show} onClose={onClose} outSideClickClose={false}>
      <div className="absolute bg-white md:w-[500px] w-full right-0 top-0 h-full ">
        <AddTaskForm
          onClose={onClose}
          title={
            addView ? "Add Task" : updateView ? "Update Dask" : "View Task"
          }
          taskView={taskView}
          showEditIcon={viewOnly}
        />
      </div>
    </CustomModal>
  );
};

export default RightModalViewWrapper;
