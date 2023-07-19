import { getSingleData } from "../services/getSingleData";

export const getUserData = async (profileId, setUserDetails) => {
  try {
    const userData = await getSingleData("users", profileId);
    userData && setUserDetails(() => userData);
  } catch (error) {
    console.error(error);
  }
};
