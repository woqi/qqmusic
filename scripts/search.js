
//import {SEARCH_URL} from './constants.js'
import {searchUrl} from './helpers.js'

export class Search{
constructor(el){
    
    this.$el = el 
    this.$input = this.$el.querySelector('#search') 
    
    this.$songs = this.$el.querySelector('.search_song_list')
    this.$hotkey = this.$el.querySelector('.search_hot_keys')
    this.$cancel = this.$el.querySelector('.search_bar_tip_text')
    this.$delBtn = this.$el.querySelector('.icon_delete')


    this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
    this.$input.addEventListener('focus', this.onFocus.bind(this))
    this.$input.addEventListener('input', this.onInput.bind(this))

    this.$cancel.addEventListener('click', this.cancelClick.bind(this))

    this.$delBtn.addEventListener('click', this.delBtnClick.bind(this))

    

    this.keyword = ''
    this.page = 1
    this.songs = []
    this.nomore = false//加载完毕
    this.fetching = false//请求
    this.perpage = 20
    this.onscroll = this.onScroll.bind(this)
    window.addEventListener('scroll',this.onscroll)
}

delBtnClick(event){
    this.$input.value = ''
    this.$delBtn.style.display = 'none'
    this.$songs.innerHTML = ''
    this.$el.querySelector('.loading-done').style.display = 'none'
    this.$el.querySelector('.search-loading').style.display = 'none'
}

onInput(event){
    this.$delBtn.style.display = 'block'
    this.$el.querySelector('.loading-done').style.display = 'none'
}

cancelClick(event){
    this.$cancel.style.display = 'none'
    this.$hotkey.style.display = 'block'
    this.$delBtn.style.display = 'none'
    this.$songs.innerHTML = ''
    this.$input.value = ''
    this.$el.querySelector('.search-loading').style.display = 'none'
    
}


onFocus(event){
    this.$cancel.style.display = 'block'
    this.$hotkey.style.display = 'none'

}

onKeyUp(event){
    let keyword = event.target.value.trim()
    if(!keyword) return this.reset()
    if (event.keyCode !== 13) return    
    this.search(keyword) 
                        
}

onScroll(event){
    if(this.nomore) return window.removeEventListener('scroll', this.onscroll)
    if(document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight -50){
        this.search(this.keyword, this.page + 1)
    }
    
}

reset(){
    this.page = 1
    this.keyword = ''
    this.songs = []
    this.nomore = false
    this.$songs.innerHTML = ''
}

search(keyword, page){
    if(this.fetching) return
    this.keyword = keyword
    this.fetching = true
    this.loading()

    fetch(searchUrl(this.keyword,page || this.page))
    //${SEARCH_URL}?keyword=${this.keyword}&page=${page || this.page}
    //https://qq-music-api.now.sh/search?keyword=${this.keyword}&page=${page || this.page}
    //http://localhost:4000/
    .then(res=> res.json())
    .then(json => {
        this.nomore = (json.message === 'query error')
        this.page = json.data.song.curpage
        this.songs.push(...json.data.song.list)//缓存songs
        return json.data.song.list
    
    })
    .then(songs => this.append(songs))
    .then(()=> this.done())
    .then(()=> this.fetching = false)
    .catch(()=> this.fetching = false)
}

append(songs){
    let html = songs.map(song =>{
        let artist = song.singer.map(s => s.name).join(' ')
        return `
        <li class="search_content">    
            <i class="icon"></i>
            <h6 class="main_tit">${song.songname}</h6>                   
            <p class="sub_tit">${artist}</p>
            <a href="#player?artist=${artist}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}&songmid=${song.songmid}" class="search_content_link"></a>
        </li>
        
    `}).join('')
    this.$songs.insertAdjacentHTML('beforeend', html)
}

loading(){
    this.fetching = true
    this.$el.querySelector('.search-loading').style.display = 'block'
}

done(){
    this.fetching = false
    if(this.nomore){
        this.$el.querySelector('.search-loading').style.display = 'none'
        this.$el.querySelector('.loading-done').style.display = 'block'
        
    }else{
        this.$el.querySelector('.search-loading').style.display = 'none'
        this.$el.querySelector('.loading-done').style.display = 'none'
    }
}

}

