# Mentorium 🧠

Помощь для учащихся на курсах по HTML и CSS от [HTML Academy](https://htmlacademy.ru/)

## Разработка

- Установка зависимостей: `npm i`
- Запуск разработки: `npm start`

## Участие в разработке

Если есть [активные ишью](https://github.com/wrgraff/mentorium/issues), вы можете взять их в работу. Не забудьте об этом предупредить.  
Если нет задач, всегда можно предложить улучшения. По этому поводу стоит написать мне в Телеграм: [@wrgraff](https://t.me/wrgraff).

Процесс работы максимально прост и всем знаком: форкаем и пулл-реквестим =)

Нюансы работы со статьями и стилями описаны в файле [CONTRIBUTING.md](https://github.com/wrgraff/mentorium/blob/master/CONTRIBUTING.md)

## Как это все работает

Mentorium — статичный сайт, собирающийся с помощью генератора статики и галпа.

Данные обрабатываются с помощью [Eleventy](https://www.11ty.dev/): шаблоны написаны на [Nunjucks](https://mozilla.github.io/nunjucks/), тексты статей размечены в формате [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).  
Стили собираются с помощью [Sass](https://sass-lang.com/) в синтаксисе SCSS и все ресурсы жмутся.  
Наша ЦА — студенты Академии, поэтому пишем только под современные браузеры: никаких IE и прочей ерунды.

---
Автор проекта: [Артур Трифонов](https://github.com/wrgraff)
