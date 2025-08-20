import { Route, Routes } from "react-router"
import { LayoutMain } from "./layouts"
import {
  PageAccordion,
  PageDirFiles,
  PageDragNDrop,
  PageHome,
  PageInfinityScroll,
  PageLazyPic,
  PageModal,
  PagePagination,
  PageSlider,
  PageTabs,
  PageTicTacToe,
  PageTodo,
  PageTooltip,
} from "./pages"

export const Routing = () => {
  return (
    <Routes>
      <Route element={<LayoutMain />}>
        <Route path="/" index element={<PageHome />} />
        <Route path="accordion" element={<PageAccordion />} />
        <Route path="dir-files" element={<PageDirFiles />} />
        <Route path="drag-n-drop" element={<PageDragNDrop />} />
        <Route path="infinity-scroll" element={<PageInfinityScroll />} />
        <Route path="lazy-pic" element={<PageLazyPic />} />
        <Route path="modal" element={<PageModal />} />
        <Route path="pagination" element={<PagePagination />} />
        <Route path="slider" element={<PageSlider />} />
        <Route path="tabs" element={<PageTabs />} />
        <Route path="tic-tac-toe" element={<PageTicTacToe />} />
        <Route path="todo" element={<PageTodo />} />
        <Route path="tooltip" element={<PageTooltip />} />
      </Route>
    </Routes>
  )
}
