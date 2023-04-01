import { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

const RootLayout = lazy(() => import("./layouts/RootLayout"));

const Home = lazy(() => import("./pages/Home"));
const Lobby = lazy(() => import("./pages/Lobby"));
const Game = lazy(() => import("./pages/Game"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/lobby/:conversationId" element={<Lobby />} />
        <Route path="/game/:conversationId" element={<Game />} />
      </Route>
    </>,
  ),
);
