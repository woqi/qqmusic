class MusicPlayer{
    constructor(el){
        this.$el = el
        this.$el.addEventListener('click', this)
        this.$audio = this.createAudio()

        this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'),this.$audio)
        console.log('this.lyrics')
        //console.log('this.lyrics')
        this.progress = new ProgressBar(this.$el.querySelector('.progress'))
        this.fetching = false
        //测试new ProgressBar(this.$el.querySelector('.progress'), 280, ture)        
    }

    createAudio(){
        let audio = document.createElement('audio')
        audio.id =`player-${Math.floor(Math.random()*100)}-${+new Date()}`       
        audio.addEventListener('ended',() => {
            this.$audio.play()
            this.lyrics.restart()
            this.progress.restart()
        })
        document.body.appendChild(audio)
        return audio
    }
    
    handleEvent(event){
        let target = event.target
        switch(true){
            case target.matches('.icon-play'):
            this.onPlay(event)
            break
            case target.matches('.icon-pause'):
            this.onPause(event)
            break
            case target.matches('.icon-list'):
            this.hide(event)
            break
            
        }
    }

    onPlay(event){
        this.$audio.play()
        this.lyrics.start()
        this.progress.start()
        event.target.classList.add('icon-pause')
        event.target.classList.remove('icon-play')
    }

    onPause(event){
        this.$audio.pause()
        this.lyrics.pause()
        this.progress.pause()
        event.target.classList.add('icon-play')
        event.target.classList.remove('icon-pause')
    }

    play(options = {}){
        if(!options) return
        this.$el.querySelector('.song-name').innerText = options.songname
        this.$el.querySelector('.song-artist').innerText = options.artist
        this.progress.reset(options.duration)

        let url = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${options.albummid}.jpg`
        this.$el.querySelector('.album-cover').src = url
        this.$el.querySelector('.player-background').style.backgroundImage = `url(${url})`
        if(options.songid){
            this.songid = options.songid
            this.$audio.src = `http://ws.stream.qqmusic.qq.com/${this.songid}.m4a?fromtag=46`
                             //http://pb5h7no6c.bkt.clouddn.com/${this.songid}.mp3
                             //http://ws.stream.qqmusic.qq.com/${this.songid}.m4a?fromtag=46

            fetch('https://qq-music-api.now.sh/lyrics?id=${this.songid}')
            .then(res => res.json())
            .then(json => json.lyric)
            .then(text => this.lyrics.reset(text))
            .catch(() => {})
            .then(() => this.fetching = false)
        }
        this.show()
        
    }

    show(){
        this.$el.classList.add('show')
    }

    hide(){
        this.$el.classList.remove('show')
    }

}

