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
