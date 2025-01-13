import { IconStore } from "@/utils/iconStore";
import { useEffect, useState } from "react";
import FormFields from "./formFields";
import { formQuestions } from "@/utils/helper";
import { useTaskContext } from "../kanbanView";
import axios from "axios";
import { createTask, updateTask } from "@/utils/request";
import { useToast } from "@/pages/_app";

const AddTaskForm = ({ onClose, title = "", taskView, showEditIcon }) => {
  const questionValues = formQuestions;
  const { taskDetails, popupClose } = useTaskContext();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [editClick, setEditClick] = useState(false);
  const viewOnly = taskView == "view";

  const readOnlyMode = viewOnly && !editClick;
  const handleChange = (key, value) => {
    const updatedForm = { ...formData, [key]: value };
    setFormData(updatedForm);

    const allRequiredFilled = formQuestions
      .filter((q) => q.required)
      .every((q) => {
        const value = updatedForm[q.key];
        if (q.inputType === "select" || q.inputType === "datepicker") {
          return value && value.value ? value.value.trim() !== "" : false;
        }

        return value ? value.trim() !== "" : false;
      });
    setFormValid(allRequiredFilled);
  };

  useEffect(() => {
    if (viewOnly && taskDetails) {
      setFormData(taskDetails);
    }
  }, [taskView]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
    delete updatedData?.status;
    updatedData["status"] = formData?.status?.value;

    viewOnly
      ? await updateTask({ ...updatedData, id: taskDetails?._id })
      : await createTask(updatedData);
    setEditClick(false);
    popupClose();
    addToast(
      `${viewOnly ? "Task updated successfully!" : "Task added successfully!"}`,
      "success"
    );
  };
  return (
    <div className="bg-[#F2F4F6] m-3 flex flex-col gap-4 rounded-md p-3 h-[97vh]">
      <div className="flex justify-between items-center">
        <p className="text-[16px] font-semibold ">{title}</p>
        <div className="flex gap-3 items-center">
          {showEditIcon && (
            <>
              <div
                onClick={() => {
                  setEditClick(true);
                }}
                disabled={editClick}
                className={`${
                  editClick
                    ? "bg-gray-400 p-1 rounded-md cursor-not-allowed"
                    : ""
                }`}
              >
                <IconStore.editPencil className="size-5" />
              </div>
              {editClick && (
                <p
                  onClick={() => {
                    setEditClick(false);
                    setFormData(taskDetails);
                  }}
                  className="text-[14px] font-normal cursor-pointer"
                >
                  Reset
                </p>
              )}
            </>
          )}
          <IconStore.close
            onClick={onClose}
            className="size-5 cursor-pointer stroke-gray-900"
          />
        </div>
      </div>
      <div className="bg-white rounded-md flex flex-col gap-3 p-3 h-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between h-full"
        >
          <div className="flex flex-col gap-3 md:gap-5">
            <FormFields
              questionValues={questionValues}
              handleChange={handleChange}
              formData={formData}
              readOnly={readOnlyMode}
            />
          </div>
          {!readOnlyMode && (
            <button
              type="submit"
              className={`p-2 rounded-md ${
                formValid
                  ? "bg-[#022b50] text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
              disabled={!formValid}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
export default AddTaskForm;
