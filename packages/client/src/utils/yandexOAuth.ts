export const getCurrentUrl = () => {
  let currentUrl = window.location.origin;
  if (currentUrl[currentUrl.length - 1] === '/') {
    currentUrl = currentUrl.slice(0, currentUrl.length - 1);
  }
  return currentUrl;
};

export const getYandexAuthUrl = (clientId: string) => {
  const requestUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}`;
  return `${requestUrl}&redirect_uri=${getCurrentUrl()}`;
};

export const checkAccessKey = (searchStr: string) => {
  if (searchStr) {
    const param = new URLSearchParams(searchStr);
    return { code: param.get('code') };
  }
  return null;
};
