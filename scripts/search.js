class Search{
    constructor(el){
        this.$el = el 
        this.$input = this.$el.querySelector('#search')
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
        this.$songs = this.$el.querySelector('.search_song_list')
        this.keyword = ''
        this.page = 1
        this.songs = []
        this.perpage = 20
    }

    onKeyUp(event){
        let keyword = event.target.value.trim()
        if(!keyword) return this.reset()
        //if(event.key !== '/') return
        if (event.keyCode == 13) return
        //return false;
        this.search(keyword)
        //event.preventDefault();
        console.log(keyword)
    }

    reset(){
        this.page = 1
        this.keyword = ''
        this.songs = []
        this.$songs.innerHTML = ''
    }
    
    search(keyword){
        this.keyword = keyword
        fetch(`https://qq-music-api.now.sh/search?keyword=${this.keyword}&page=${this.page}`)
        //https://qq-music-api.now.sh/
        //http://localhost:4000/
        .then(res=> res.json())
        .then(json => json.data.song.list)
        .then(songs => this.append(songs))
        this.keyword = keyword
    }

    append(songs){
        let html = songs.map(song =>
        `
        <li class="search_content">
            <i class="icon "></i>
            <h6 class="main_tit">${song.songname}</h6>                   
            <p class="sub_tit">${song.singer.map(s => s.name).join(' ')}</p>
        </li>
        `).join('')
        this.$songs.insertAdjacentHTML('beforeend', html)
    }

}


