
import { RouterProvider } from "react-router-dom";

import router from "../routes/app.routes";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "../context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
