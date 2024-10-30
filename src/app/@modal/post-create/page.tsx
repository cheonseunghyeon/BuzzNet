import PostCreateForm from "@/components/post/PostCreateForm";
import Modal from "@/components/ui/modal/modal";

export default function Page() {
  return (
    <Modal>
      <PostCreateForm />
    </Modal>
  );
}
