//首页
import {RECOMMEND_URL} from './constants.js'
import {lazyload} from './lazyload.js'
import {Slider} from './slider.js'

export class Recommend{
    constructor(el){
    this.$el = el
    }

    launch(){
        fetch(RECOMMEND_URL)
        //https://qq-music-api.now.sh
        //json/rec.json
        .then(res => res.json())
        .then(json => this.render(json))
        return this //储存当前对象
    }

    render(json){
        this.renderSlider(json.data.slider)
        this.renderRadio(json.data.radioList)
        this.renderPlaylists(json.data.songList)
        lazyload()//引入懒加载
    }

    renderSlider(slides){
        new Slider({
            el: document.querySelector('#slider'),
            slides: slides.map(slide => (//map映射
                {link: slide.linkUrl, image: slide.picUrl.replace('http://', 'https://')}
            ))
        })
    }

    renderRadio(radios){
        this.$el.querySelector('.radios .list').innerHTML = radios.map(radio =>
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

    renderPlaylists(playlists){
        this.$el.querySelector('.playlists .list').innerHTML = playlists.map(playlist =>
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
}


