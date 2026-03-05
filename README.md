## Запуск

```bash
pnpm install
pnpm dev
```

## Скрипты

- `pnpm dev` — запуск dev-сервера Vite
- `pnpm build` — type-check + production build
- `pnpm lint` — проверка ESLint
- `pnpm preview` — предпросмотр production-сборки
- `pnpm format` — форматирование всей код-базы prettier'ом

## Структура проекта

### `src`

- `App.tsx` — роутинг и корневой каркас приложения
- `main.tsx` — точка входа React
- `index.css` — глобальные стили

### `src/components`

- `RootLayout.tsx` — общий layout страниц
- `ProtectedRoute.tsx` — защита приватных маршрутов
- `Providers/` — провайдеры верхнего уровня
- `Providers/StoreProvider.tsx` — подключение Redux store

### `src/pages`

- `Auth.tsx` — страница авторизации
- `Profile/` — профиль текущего пользователя (создание поста, редактирование ника)
- `AuthorProfile/` — публичный профиль другого пользователя
- `Followers/`, `Followings/` — списки подписчиков и подписок
- `Thread/` — лента постов (вкладки “все”/“подписки”)
- `NotFound.tsx` — 404

### `src/redux`

- `store.ts` — конфигурация Redux и `redux-persist`
- `hooks.ts` — typed hooks (`useAppDispatch`, `useAppSelector`, `createAppSelector`)
- `slices/auth.ts` — авторизация
- `slices/users.ts` — пользователи
- `slices/subscriptions.ts` — подписки/подписчики + пагинация
- `slices/posts.ts` — посты

### `src/shared`

- `components/` — переиспользуемые доменные компоненты (`PostItem`, `SubsInfo`)
- `ui/` — базовые UI-компоненты (`Button`, `Dialog`, `Tabs`)
- `constants/` — общие константы

### `src/lib`

- `cn.ts` — утилита объединения Tailwind-классов

## Либы

- `react-router` — маршрутизация
- `@reduxjs/toolkit` — стейт менеджер
- `redux-persist` — сохранение стора в LocalStorage
- `tailwindcss` — стилизация
- `@radix-ui/react-dialog` — модалка
- `@radix-ui/react-tabs` — табы
- `lucide-react` — SVG-иконки
- `clsx` — база для условных стилей
- `tailwind-merge` — корректное объединение Tailwind классов без конфликтов

### Dev-зависимости

- `prettier`, `prettier-plugin-tailwindcss` — база
- `tw-animate-css` — Tailwindcss анимации
