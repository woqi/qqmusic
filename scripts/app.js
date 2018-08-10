(function(){

    fetch('json/rec.json')
    //https://qq-music-api.now.sh
    .then(res => res.json())
    .then(render)

    fetch('json/rank.json')                                                               
    .then(res => res.json())
    .then(json => json.data.topList)
    .then(renderTopLists)

    

    //测试
    //let test =  player.lyrics.reset(text)
    //测试   
    
    let search = new Search(document.querySelector('#search-view'))
    let player = new MusicPlayer(document.querySelector('#player'))

    window.search = search
    window.player = player
    
    document.querySelector('#header .player').addEventListener('click', ()=> {
        player.show()
    })
    onHashChange()
    window.addEventListener('hashchange', onHashChange)
    function onHashChange(){
        let hash = location.hash
        if(/^#player\?.+/.test(hash)){
            let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
            //indexOf('?') 问号的位置，slice截取问号位置+1的第8位进行match（检索）
            //\w+,匹配字母或数字或下划线或汉字一次或多次         
            //[^&]+,除了&外出现一次或多次
            let options = matches && matches.reduce((res, cur) =>{
                let arr = cur.split('=')
                res[arr[0]] = decodeURIComponent(arr[1])
                return res
            }, {})
            player.play(options)

        }else{
            player.hide()
        }
    }

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


