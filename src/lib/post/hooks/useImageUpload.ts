import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/init";

export const useImageUpload = () => {
  const uploadImage = async (image: File) => {
    const storageRef = ref(storage, `images/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(snapshot.ref);
    return imageUrl;
  };

  return { uploadImage };
};
