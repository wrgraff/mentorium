const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (function(eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.setDataDeepMerge(true);

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

    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    };
});
