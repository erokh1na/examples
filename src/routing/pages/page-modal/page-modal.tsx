import { Modal, useModal } from "@/core/lib"
import { Button } from "antd"

export const PageModal = () => {
  const modal = useModal()

  const title = "Meow!"
  const content = <img src="/images/polite-cat.jpg" alt="polite-cat" width="360" />

  return (
    <div>
      <Button onClick={() => modal.open()}>Открыть</Button>
      <Modal isOpen={modal.isOpen} onClose={() => modal.close()} title={title} content={content} />
    </div>
  )
}
