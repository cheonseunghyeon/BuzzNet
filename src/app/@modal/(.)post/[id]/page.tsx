import PostPage from "@/app/(route)/post/[id]/page";
import Modal from "@/components/ui/modal/modal";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Modal>
      <PostPage params={params} />
    </Modal>
  );
}
