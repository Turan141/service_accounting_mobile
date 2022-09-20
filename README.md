## Настройка окружения

1. Идем по ссылке и настраиваем окружение: https://reactnative.dev/docs/environment-setup
2. Устанавливаем **Yarn**
   ```bash
   npm i -g yarn
   ```

## Структура проекта в папке `/src`

- [assets](/src/assets) - Все статические файлы хранятся здесь
- [config](/src/config) - Файлы конфигурации проекта, переменные и т.д
- [hooks](/src/hooks) - Кастомные React хуки
- [navigation](/src/navigation) - Контейнеры в которых хранится навигация ([документация React Navigation v5](https://reactnavigation.org/docs/getting-started))
- [screens](/src/screens) - Основные экраны приложения
- [theme](/src/theme) - Общие настройки стилей для переиспользования (шрифты, цвета, layout)
- [ui-kit](/src/ui-kit) - Базовые UI kit компоненты
- [components](/src/components) - Компоненты приложения

## Сборка проекта

1. Сборка `.apk` или `.aab` файла для размещения на `Google Play`

   Для того, чтобы собрать `.apk` или `.aab` файл необходимо выполнить следующие команды:
   Данная команда соберет `release` версию приложения под андроид и сгенерирует `.apk` файл.

   ```bash
   cd ./android
   gradlew assembleRelease
   ```

   Данная команда соберет `release` версию приложения под андроид и сгенерирует `.aab` файл.

   ```bash
   cd ./android
   gradlew bundleRelease
   ```

   После выполнения данных команд сгенерированный файл можно забрать по пути: `/android/app/build/outputs`

#### Очистка проекта

Удаляет файлы сборки и все внешние зависимости

```bash
yarn clean
```

Удаляет файлы сборки и все внешние зависимости для `Android`

```
cd ./android && gradlew clean
```

## Разработка

#### Запуск дев окружения для разработки мобильного приложения под Андроид

1. Устанавливаем внешние зависимости, создаем ссылки между отдельными пакетами проекта
   ```bash
   yarn install
   ```
2. Чистим зависимости чтобы установить свежие

   ```bash
   cd ./android && gradlew clean
   ```

3. Запуск дев-сервера
   ```bash
    yarn start
    yarn run android
   ```
