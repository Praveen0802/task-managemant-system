import "@/styles/globals.css";
import ToastContainer from "@/utils/toastContainer";

import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export default function App({ Component, pageProps }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <ToastContainer toasts={toasts} />
      <Component {...pageProps} />
    </ToastContext.Provider>
  );
}

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
