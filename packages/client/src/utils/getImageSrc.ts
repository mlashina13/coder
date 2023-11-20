const BASE_RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources';

export const getImageSrc = (src?: string) =>
  src?.trim() !== 'null' ? `${BASE_RESOURCES_URL}${src}` : undefined;
