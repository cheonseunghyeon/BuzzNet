import BookPage, { PostDetailProps } from "@/app/post/[id]/page";
import Modal from "@/components/ui/modal/modal";

export default function Page({ params }: PostDetailProps) {
  return (
    <Modal>
      <BookPage params={params} />
    </Modal>
  );
}
