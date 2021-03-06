## CSS

Используется [БЭМ](https://ru.bem.info/methodology/quick-start/) в яндексовской нотации:

```css
.block
.block_mod
.block__element
.block__element_mod
```

Элементы обозначаются `__`, модификаторы `_`, схема ключ-значение в модификаторах может использоваться.

## Работа с изображениями

Изображения добавляются в папку со статьей и в папку `img` внутри нее. Изображения обрабатываются и конвертируются в различные форматы при сборке, поэтому используем только jpg и png.

Для вставки картинок используется разметка Markdown:
```
![Описание изображения](img/image.png)
```

Описания для изображений добавляем всегда (думаем: если изображение декоративное и описание не имеет смысла, то стоит ли его вообще вставлять в текст статьи?)

## Работа с видео

Видео вставляем с [YouTube](https://www.youtube.com/). Другие сервисы стараемся не использовать, так как под них не сделан обработчик.

Видео вставляем через iframe, он будет обработан и заменен на ссылку, по клику на которую будет загружен и запущен ролик. Если записать в `aria-label` заголовок, то он будет выведен на странице как подпись к видео.

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/W86cTIoMv2U" aria-label="Видео про маленького котика"></iframe>
```

## Инструменты

- Расширение [Nunjucks Template](https://marketplace.visualstudio.com/items?itemName=eseom.nunjucks-template) для VS Code
