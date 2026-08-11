import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import BingChunPage from "./pages/bing-chun";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BingChunPage />
  </StrictMode>,
);
