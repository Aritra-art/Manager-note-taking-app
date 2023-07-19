export const filterNote = (originalData, dataState) => {
  let filteredData = originalData;
  if (dataState?.search?.trim()?.length > 0) {
    filteredData = filteredData?.filter(
      (note) =>
        note?.title
          ?.toLowerCase()
          ?.includes(dataState?.search?.toLowerCase()) ||
        note?.label?.toLowerCase()?.includes(dataState?.search?.toLowerCase())
    );
  }
  return filteredData;
};
