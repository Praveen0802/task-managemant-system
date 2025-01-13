const ToastContainer = ({ toasts }) => {
  return (
    <div className="absolute z-2 top-3 right-3 z-50 space-y-3">
      {toasts.map((toast) => {
        return (
          <div
            style={{
              background: toast?.type === "success" ? "#36a536" : "#e64444",
              padding: "8px",
              position: "fixed",
              top: "10px",
              right: "10px",
            }}
            key={toast.id}
            className={`px-4 py-2 rounded-md shadow-lg text-white ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            {toast.message}
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
