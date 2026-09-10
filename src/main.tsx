import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@tabler/icons-webfont/dist/tabler-icons.min.css";
import "@fontsource/alegreya/500.css";
import "@fontsource/alegreya/700.css";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "./styles.css";
import { ThemeProvider } from "./theme/ThemeProvider";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
