import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./store.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/note/:id" element={<App />} />
        </Routes>
        {/* <App /> */}
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
