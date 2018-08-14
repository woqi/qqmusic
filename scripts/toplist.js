import {TOPLIST_URL} from './constants.js'
import {lazyload} from './lazyload.js'

export class TopList{
    constructor(el){
        this.$el = el
    }

    launch(){
        fetch(TOPLIST_URL)                                                               
        .then(res => res.json())
        .then(json => this.render(json.data.topList))
        return this
    }

    render(list){
        this.$el.querySelector('.topic').innerHTML = list.map(item =>
        `<li class="topic-item">
            <div class="topic-main">
                <a href="" class="topic-media">                                   
                    <img class="lazyload" data-src="${item.picUrl}">
                    <span class="listen-count"><i class="icon icon-listen"></i>${(item.listenCount/10000).toFixed(1)}万</span>
                </a>
                <div class="topic-info">
                    <div class="topic-cont">
                        <h3 class="topic-tit">${item.topTitle}</h3>                                            
                        ${this.songList(item.songList)}   
                    </div>
                    <i class="topic-arrow"></i>
                </div>
            </div>
        </li>`).join('')
    
        lazyload(this.$el.querySelectorAll('.lazyload'))  
    }

    songList(songs){
        return songs.map((song, i) =>
    `
    <p>${i + 1}<span class="text-name">${song.songname}</span>- ${song.singername}</p> 
    `).join('')
    }
}

