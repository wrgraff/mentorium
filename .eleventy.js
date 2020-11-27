const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (function(eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.addPassthroughCopy('src/**/*.(html|gif|jpg|png|svg|mp4|webm|zip)');

    eleventyConfig.addCollection('tagsList', function(collection) {
        let tagSet = new Set();
        collection.getAll().forEach(function(item) {
            if( 'tags' in item.data ) {
                let tags = item.data.tags;
      
                tags = tags.filter(function(item) {
                    switch(item) {
                        // this list should match the `filter` list in tags.njk
                        case 'all':
                        case 'article':
                        case 'articles':
                        return false;
                    }
            
                    return true;
                });
        
                for (const tag of tags) {
                    tagSet.add(tag);
                }
            }
        });
      
        return [...tagSet];
    });

    eleventyConfig.addTransform('articleImgs', (content, outputPath) => {
        const articles = /articles\/([a-zA-Z0-9_-]+)\/index\.html/i;
        const imgs = /\<img src\=\"([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+).(.*?)" (.*?)\>/ig;

        if (outputPath && outputPath.match(articles)) {
            content = content.replace(imgs, (match, p1, p2, p3, p4) => {
                return (
                    `<a href="${p1}/${p2}.png" class="img">
                        <picture>
                            <source
                                srcset="${p1}/${p2}-small.webp 1x, ${p1}/${p2}-small@2x.webp 2x"
								media="(max-width: 768px)"
								type="image/webp" />
                            <source
                                srcset="${p1}/${p2}-large.webp 1x, ${p1}/${p2}-large@2x.webp 2x"
                                type="image/webp"
                            />
                            <img
                                src="${p1}/${p2}-large.${p3}"
                                srcset="${p1}/${p2}-large@2x.${p3} 2x"
                                class="img__picture"
                                ${p4}
                            />
                        </picture>
                    </a>`
                );
            });
        }
        return content;
    });

    eleventyConfig.addTransform('lazyYouTube', (content, outputPath) => {
        const articles = /articles\/([a-zA-Z0-9_-]+)\/index\.html/i;
        const iframes = /\<iframe src\=\"https\:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)\"(.*?)\>\<\/iframe>/ig;

        if (outputPath && outputPath.match(articles)) {
            content = content.replace(iframes, (match, p1) => {
                const label = match.match(/aria-label=".*"/i);
                if (label) {
                    const labelText = label[0].slice(12, -1);
                    return (
                        `<div class="video video_labeled">
                            <a class="video__link" href="https://youtu.be/${p1}">
                                <img src="https://img.youtube.com/vi/${p1}/maxresdefault.jpg" alt="${labelText}">
                                <p class="video__label">
                                    <svg class="video__ico" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor"/></svg>    
                                    ${labelText}
                                </p>
                            </a>
                            <button type="button" class="video__button">
                                <span class="visually-hidden">Воспроизвести видео "${labelText}"</span>
                            </button>
                        </div>`
                    );
                } else {
                    return (
                        `<div class="video">
                            <a class="video__link" href="https://youtu.be/${p1}">
                                <img src="https://img.youtube.com/vi/${p1}/maxresdefault.jpg" alt="">
                            </a>
                            <button type="button" class="video__button">
                                <span class="visually-hidden">Воспроизвести видео</span>
                            </button>
                        </div>`
                    );
                };
            });
        }
        return content;
    });

    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    };
});
