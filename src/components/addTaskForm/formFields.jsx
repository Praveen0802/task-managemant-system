import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const FormFields = ({ questionValues, handleChange,readOnly, formData }) => {
  return (
    <>
      {questionValues.map((field,index) => (
        <div
          key={index}
          className="md:grid grid-cols-4 md:items-center md:gap-3 max-md:flex flex-col gap-1"
        >
          <label htmlFor={field.key} className="font-medium">
            {field.question}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          <div className="md:col-span-3">
            {field.inputType === "text" ? (
              <input
                type="text"
                id={field.key}
                value={formData[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className={`${readOnly && 'bg-gray-50 outline-none'} border  rounded-md p-2 w-full`}
                required={field.required}
                readOnly={readOnly}
                placeholder={field?.placeholder}
                autoComplete="off"
              />
            ) : field.inputType === "select" ? (
              <Select
                id={field.key}
                options={field.option}
                value={formData[field.key] || null}
                onChange={(selectedOption) =>
                  handleChange(field.key, selectedOption)
                }
                isDisabled={readOnly}
                placeholder={field?.placeholder}
                className="react-select-container"
                classNamePrefix="react-select"
                autoComplete="off"
              />
            ) : field.inputType === "datepicker" ? (
              <DatePicker
                id={field.key}
                selected={formData[field.key] || null}
                onChange={(date) => handleChange(field.key, date)}
                className="border rounded-md p-2 w-full"
                dateFormat="yyyy-MM-dd"
                disabled={readOnly}
                placeholderText={field?.placeholder}
                autoComplete="off"
              />
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
};

export default FormFields;
