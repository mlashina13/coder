import { useState } from 'react';
import { string } from 'yup';
import { TEXT_FULLSCREEN } from '../constants/fullscreen';
import { DocumentElementFullscreen, DocumentFullscreen } from './fullScreenInterfase';

/**
 * Проверка отображается fullscreen или нет
 * */
const checkFullscreen = (): boolean => {
  const doc = document as DocumentFullscreen;

  return !!(
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement
  );
};

/**
 * Активая режима fullscreen
 * */
function activateFullscreen(element: DocumentElementFullscreen) {
  if (element.requestFullscreen) {
    element.requestFullscreen(); // W3C spec
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen(); // Firefox
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(); // Safari
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen(); // IE/Edge
  }
}

/**
 * Сворачивание экрана
 * */
function deactivateFullscreen(document: DocumentFullscreen) {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Компонент Разворачивание/сворачивание экрана
 */

export const useFullscreen = (): [handleFullScreen: () => void, textFullscreen: string] => {
  const [textContent, setTextContent] = useState<string>(TEXT_FULLSCREEN.fullscreen);

  const changeFullScreen = () => {
    const isFull = checkFullscreen();

    if (isFull) {
      deactivateFullscreen(document);
      setTextContent(TEXT_FULLSCREEN.fullscreen);
    } else {
      activateFullscreen(document.documentElement);
      setTextContent(TEXT_FULLSCREEN.default);
    }
  };

  return [changeFullScreen, textContent];
};
