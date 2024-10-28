import CommentPage from "@/app/comment/[id]/page";
import Modal from "@/components/ui/modal/modal";

export default function Page() {
  return (
    <Modal>
      <CommentPage />
    </Modal>
  );
}
