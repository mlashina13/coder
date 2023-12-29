export const getCurrentUrl = () => {
  let currentUrl = window.location.origin;
  if (currentUrl[currentUrl.length - 1] === '/') {
    currentUrl = currentUrl.slice(0, currentUrl.length - 1);
  }
  return currentUrl;
};
