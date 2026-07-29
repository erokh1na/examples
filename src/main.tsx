import { store } from "@/core/store/store"
import "@ant-design/v5-patch-for-react-19"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router"
import "./composition/styles/main.scss"
import { Routing } from "./routing"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routing />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
