import "./App.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./router/router";
import { AuthBootstrapper } from "./components/auth/AuthBootstrapper";

const queryClient = new QueryClient();

function App() {
  return (
    // 1. QueryClientProvider로 앱 전체를 감쌉니다.
    <QueryClientProvider client={queryClient}>
      <AuthBootstrapper />
      <RouterProvider router={router} />
      {/* 2. 개발자 도구를 추가하면 디버깅이 매우 편리해집니다. */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
