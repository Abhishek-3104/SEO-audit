import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./common/Layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import NotFound from "./common/NotFound.jsx";
import SEOAnalyzer from "./components/SEOAnalyzer.jsx";
import CompetitorAnalysis from "./components/CompetitorAnalysis.jsx";
import WebScraper from "./components/WebScraper.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
       path: "/",
       element: <Home/>
      },
      {
       path: "/scrape",
       element: <WebScraper/>
      },
      {
        path:"/seo",
        element:<SEOAnalyzer />
      },
      {
        path:"/competitor",
        element:<CompetitorAnalysis />
      },
      {
        path: "*",
        element: <NotFound/>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
