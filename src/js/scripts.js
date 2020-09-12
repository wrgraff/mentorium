(function() {
    findVideos();

    function findVideos() {
        const videos = document.querySelectorAll('.video');

        videos.forEach(video => {
            setupVideo(video);
        });
    };

    function setupVideo(video) {
        const link = video.querySelector('.video__link');
        const id = parseMediaURL(link);
        const button = video.querySelector('.video__button');

        video.addEventListener('click', () => {
            const iframe = createIframe(id);

            link.remove();
            button.remove();
            video.appendChild(iframe);
        });

        link.removeAttribute('href');
        video.classList.add('video_enabled');
    };

    function parseMediaURL(link) {
        const regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;
        const url = link.href;
        const match = url.match(regexp);

        console.log(link)

        return match[1];
    };

    function createIframe(id) {
        const iframe = document.createElement('iframe');

        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${id}?rel=0&showinfo=0&autoplay=1`);
        iframe.classList.add('video__frame');

        return iframe;
    };
}());
