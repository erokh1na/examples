import { Route, Routes } from "react-router"
import { LayoutMain } from "./layouts"
import {
  PageAccordion,
  PageDirFiles,
  PageDrag,
  PageDragAndDropList,
  PageHome,
  PageInfinityScroll,
  PageLazyImage,
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
        <Route path="drag" element={<PageDrag />} />
        <Route path="drag-and-drop-list" element={<PageDragAndDropList />} />
        <Route path="infinity-scroll" element={<PageInfinityScroll />} />
        <Route path="lazy-image" element={<PageLazyImage />} />
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
