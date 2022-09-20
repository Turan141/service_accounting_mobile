import { PixelRatio, Dimensions } from 'react-native';

const pixelRatio = PixelRatio.get();
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const adjustFontSize = (size: number): number => {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // IPhone 5s and старые Android девайсы
    if (deviceWidth < 360) {
      return size * 0.95;
    }

    // IPhone 5
    if (deviceHeight < 667) {
      return size;
    }

    // IPhone 6-6s
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    }

    // Старые фаблеты
    return size * 1.25;
  }

  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // font scaling на Android девайсах с маленьким экраном
    // там где pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
    }

    // Остальные неизвестные размеры экранов на Android
    if (deviceHeight < 667) {
      return size * 1.15;
    }

    // Определяем Android девайс среднего размера и немного увеличиваем шрифт
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }

    // Определяем устройства с крупным экраном
    // Например: IPhone 6s plus / 7 plus / mi note
    return size * 1.27;
  }

  if (pixelRatio >= 3.5) {
    // Определяем font scaling на Android с небольшим экраном
    // там где pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
    }

    // Определяем другие Android девайсы с меньшией высотой экрана
    if (deviceHeight < 667) {
      return size * 1.2;
    }

    // Определяем Android девайс среднего размера и немного увеличиваем шрифт
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }

    // Старые фаблеты
    return size * 1.4;
  }

  return size;
};

export default adjustFontSize;
