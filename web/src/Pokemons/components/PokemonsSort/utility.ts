export const getIdFromUrl = (url: string) => {
  const srcArray = url.split('/');
  const id = srcArray[srcArray.length - 2];

  return Number(id);
};