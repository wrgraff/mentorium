module.exports = (function(eleventyConfig) {
    eleventyConfig.addFilter('getlink', function(path) {
        return '0 KB';
    });

    eleventyConfig.addCollection("tagList", function(collection) {
        let tagSet = new Set();
        collection.getAll().forEach(function(item) {
            if( "tags" in item.data ) {
                let tags = item.data.tags;
      
                tags = tags.filter(function(item) {
                    switch(item) {
                        // this list should match the `filter` list in tags.njk
                        case "all":
                        case "nav":
                        case "post":
                        case "posts":
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
