(function(){

    fetch('http://localhost:4000/')
    //https://qq-music-api.now.sh
    ///json/rec.json
    .then(res => res.json())
    .then(render)

    fetch('/json/rank.json')
    .then(res => res.json())
    .then(json => json.data.topList)
    .then(renderTopLists)

    let search = new Search(document.querySelector('#search-view'))

    function render(json){
        renderSlider(json.data.slider)
        renderRadio(json.data.radioList)
        renderPlaylists(json.data.songList)
        lazyload(document.querySelectorAll('.lazyload'))//引入懒加载
    }


    function renderSlider(slides){
        slides = slides.map(slide => {//map映射
            return {link: slide.linkUrl, image: slide.picUrl}
        })
        new Slider({
            el: document.querySelector('#slider'),
            slides
        })
    }

    function renderRadio(radios){
        document.querySelector('.radios .list').innerHTML = radios.map(radio =>
            `
            <li class="list-item">
                <a href="" class="list-main">
                    <div class="list-media">
                        <img class="lazyload" data-src="${radio.picUrl}">
                        <span class="icon icon-play"></span>
                    </div>

                    <div class="list-info">
                        <h3>${radio.Ftitle}</h3>
                    </div>
                </a>
                
            </li>
            `
        ).join('')
    }

    function renderPlaylists(playlists){
        document.querySelector('.playlists .list').innerHTML = playlists.map(playlist =>
            `
            <li class="list-item">
                <a href="" class="list-main">
                    <div class="list-media">
                        <img class="lazyload" data-src="${playlist.picUrl}">
                        <span class="icon icon-play"></span>
                    </div>
                    <div class="list-info">
                        <h3>${playlist.songListDesc}</h3>
                    </div>
                </a>
                
            </li>
            `
        ).join('')
    }

    function renderTopLists(list){
        document.querySelector('.toplist-wrap .topic').innerHTML = list.map(item =>
        `<li class="topic-item">
            <div class="topic-main">
                <a href="" class="topic-media">                                   
                    <img class="lazyload" data-src="${item.picUrl}">
                    <span class="listen-count"><i class="icon icon-listen"></i>${(item.listenCount/10000).toFixed(1)}万</span>
                </a>
                <div class="topic-info">
                    <div class="topic-cont">
                        <h3 class="topic-tit">${item.topTitle}</h3>                                            
                        ${songList(item.songList)}   
                    </div>
                    <i class="topic-arrow"></i>
                </div>
            </div>
        </li>`).join('')
        lazyload(document.querySelectorAll('.toplist-wrap .topic .lazyload'))

        function songList(songs){
            return songs.map((song, i) =>
        `
        <p>${i + 1}<span class="text-name">${song.songname}</span>- ${song.singername}</p> 
        `).join('')
        }
    }

})()


