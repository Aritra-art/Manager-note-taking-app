import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export const getImageUrl = async (e, setPreview, setUserDetails) => {
  try {
    if (e.target.files[0]) {
      setPreview(() => true);
      const profileImage = ref(storage, `images/${e.target.files[0]?.name}`);
      await uploadBytes(profileImage, e.target.files[0]);
      const profileImageUrl = await getDownloadURL(
        ref(storage, `images/${e.target.files[0]?.name}`)
      );
      setUserDetails((userDetails) => ({
        ...userDetails,
        photoURL: profileImageUrl,
      }));
      setPreview(() => false);
    }
  } catch (error) {
    console.error(error);
  }
};
