import ProfileMain from "@/components/commons/ProfileMain";
import Modal from "@/components/ui/modal/modal";

const Profiles = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <Modal>
      <ProfileMain uid={id} />
    </Modal>
  );
};

export default Profiles;
