# Сайт репетитора по информатике

React 18 + TypeScript + Tailwind CSS 4 + Framer Motion 12 + Lucide React, сборка на Vite 8.

## Запуск

```bash
npm install
npm run dev      # разработка, http://localhost:5173
npm run build    # проверка типов + продакшен-сборка в dist/
npm run preview  # посмотреть собранную версию
```

## Что поменять под себя

Весь текст лежит в `src/data/content.ts`, заглушки помечены `TODO`:

1. `TUTOR_NAME`: имя.
2. `CONTACTS`: ВК и почта.
3. `SERVICES`: услуги и цены.
4. `HERO_PORTRAIT`: фото. Положите файл в `public/` (лучше PNG без фона) и укажите его имя.
5. `ABOUT_TEXT`, `LESSON_STEPS`, `MARQUEE_TILES`: тексты про себя, формат занятий, темы в бегущей ленте.

## Разделы

Главный экран → лента тем → Обо мне → Цены → Как проходят занятия → Контакты.

Цвета и шрифты — токены в `src/index.css` (блок `@theme`).
