import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const analyticsEnv = import.meta.env as Record<string, string | undefined>;
const analyticsEndpoint = analyticsEnv.VITE_ANALYTICS_ENDPOINT?.replace(/\/$/, "");
const analyticsWebsiteId = analyticsEnv.VITE_ANALYTICS_WEBSITE_ID;

if (analyticsEndpoint && analyticsWebsiteId) {
  const analyticsScript = document.createElement("script");
  analyticsScript.defer = true;
  analyticsScript.src = `${analyticsEndpoint}/umami`;
  analyticsScript.dataset.websiteId = analyticsWebsiteId;
  analyticsScript.dataset.autoTrack = "false";
  document.head.appendChild(analyticsScript);
}

createRoot(document.getElementById("root")!).render(<App />);
