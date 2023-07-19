export const dataReducer = (dataState, { type, payload }) => {
  switch (type) {
    case "SET_USER_NOTES":
      return {
        ...dataState,
        notes: payload?.filter(
          (note) => !note?.isPinned && !note?.istrashed && !note?.isarchived
        ),
        pinned: payload?.filter(
          (note) => note?.isPinned && !note?.istrashed && !note?.isarchived
        ),
        trash: payload?.filter((note) => note?.istrashed),
        archive: payload?.filter(
          (note) => note?.isarchived && !note?.istrashed
        ),
      };
    case "SET_SEARCH":
      return { ...dataState, search: payload };
    case "SET_LOADER_TRUE":
      return { ...dataState, loading: true };
    case "SET_LOADER_FALSE":
      return { ...dataState, loading: false };
    default:
      console.log("something went wrong");
  }
};
