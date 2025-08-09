import { Route, Routes } from "react-router"
import { LayoutMain } from "./layouts"
import { PageHome, PageTooltip } from "./pages"

export const Routing = () => {
  return (
    <Routes>
      <Route element={<LayoutMain />}>
        <Route path="/" index element={<PageHome />} />
        <Route path="tooltip" element={<PageTooltip />} />
      </Route>
    </Routes>
  )
}
