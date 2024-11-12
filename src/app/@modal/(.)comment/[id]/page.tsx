import CommentPage from "@/app/(route)/comment/[id]/page";
import Modal from "@/components/ui/modal/modal";

export default function Page() {
  return (
    <Modal>
      <CommentPage />
    </Modal>
  );
}
