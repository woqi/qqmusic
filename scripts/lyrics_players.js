//let text = "[ti&#58;李白]&#10;[ar&#58;李荣浩]&#10;[al&#58;模特]&#10;[by&#58;]&#10;[offset&#58;0]&#10;[00&#58;00&#46;45]李白&#32;&#45;&#32;李荣浩&#32;&#40;Ronghao&#32;Li&#41;&#10;[00&#58;00&#46;66]词：李荣浩&#10;[00&#58;00&#46;83]曲：李荣浩&#10;[00&#58;01&#46;01]编曲：李荣浩&#10;[00&#58;01&#46;48]&#10;[00&#58;17&#46;88]大部分人要我学习去看&#10;[00&#58;20&#46;95]世俗的眼光&#10;[00&#58;22&#46;91]&#10;[00&#58;26&#46;22]我认真学习了世俗眼光&#10;[00&#58;29&#46;26]世俗到天亮&#10;[00&#58;31&#46;08]&#10;[00&#58;34&#46;28]一部外国电影没听懂一句话&#10;[00&#58;37&#46;17]&#10;[00&#58;38&#46;27]看完结局才是笑话&#10;[00&#58;40&#46;39]&#10;[00&#58;42&#46;48]你看我多乖多聪明多么听话&#10;[00&#58;45&#46;98]多奸诈&#10;[00&#58;47&#46;09]&#10;[00&#58;51&#46;31]喝了几大碗米酒再离开是为了模仿&#10;[00&#58;56&#46;36]&#10;[00&#58;59&#46;66]一出门不小心吐的那幅是谁的书画&#10;[01&#58;04&#46;32]&#10;[01&#58;07&#46;54]你一天一口一个&#32;亲爱的对方&#10;[01&#58;10&#46;56]&#10;[01&#58;11&#46;57]多么不流行的模样&#10;[01&#58;13&#46;91]&#10;[01&#58;15&#46;78]都应该练练书法再出门闯荡&#10;[01&#58;18&#46;91]&#10;[01&#58;19&#46;43]才会有人热情买账&#10;[01&#58;22&#46;14]&#10;[01&#58;23&#46;36]要是能重来&#32;我要选李白&#10;[01&#58;26&#46;45]&#10;[01&#58;27&#46;40]几百年前做的好坏&#10;[01&#58;30&#46;09]没那么多人猜&#10;[01&#58;31&#46;90]要是能重来&#32;我要选李白&#10;[01&#58;34&#46;74]&#10;[01&#58;35&#46;64]至少我还能写写诗来澎湃&#10;[01&#58;38&#46;08]&#10;[01&#58;38&#46;62]逗逗女孩&#10;[01&#58;40&#46;28]要是能重来&#32;我要选李白&#10;[01&#58;43&#46;06]&#10;[01&#58;44&#46;03]创作也能到那么高端&#10;[01&#58;46&#46;82]被那么多人崇拜&#10;[01&#58;49&#46;66]&#10;[01&#58;51&#46;47]要是能重来&#10;[01&#58;52&#46;56]&#10;[01&#58;53&#46;99]喝了几大碗米酒再离开是为了模仿&#10;[01&#58;59&#46;09]&#10;[02&#58;02&#46;24]一出门不小心吐的那幅是谁的书画&#10;[02&#58;07&#46;33]&#10;[02&#58;10&#46;00]你一天一口一个&#32;亲爱的对方&#10;[02&#58;13&#46;27]&#10;[02&#58;14&#46;21]多么不流行的模样&#10;[02&#58;16&#46;73]&#10;[02&#58;18&#46;43]都应该练练书法再出门闯荡&#10;[02&#58;22&#46;00]才会有人热情买账&#10;[02&#58;24&#46;68]&#10;[02&#58;25&#46;97]要是能重来&#32;我要选李白&#10;[02&#58;29&#46;03]&#10;[02&#58;29&#46;94]几百年前做的好坏&#10;[02&#58;32&#46;64]没那么多人猜&#10;[02&#58;34&#46;25]要是能重来&#32;我要选李白&#10;[02&#58;37&#46;33]&#10;[02&#58;38&#46;24]至少我还能写写诗来澎湃&#10;[02&#58;40&#46;72]&#10;[02&#58;41&#46;23]逗逗女孩&#10;[02&#58;42&#46;31]&#10;[02&#58;42&#46;85]要是能重来&#32;我要选李白&#10;[02&#58;45&#46;65]&#10;[02&#58;46&#46;54]创作也能到那么高端&#10;[02&#58;49&#46;38]被那么多人崇拜&#10;[02&#58;53&#46;40]&#10;[02&#58;54&#46;07]要是能重来&#10;[02&#58;55&#46;49]&#10;[03&#58;28&#46;64]要是能重来&#32;我要选李白&#10;[03&#58;31&#46;61]&#10;[03&#58;32&#46;52]几百年前做的好坏&#32;没那么多人猜&#10;[03&#58;36&#46;82]要是能重来&#32;我要选李白&#10;[03&#58;39&#46;84]&#10;[03&#58;40&#46;79]至少我还能写写诗来澎湃&#10;[03&#58;43&#46;76]逗逗女孩&#10;[03&#58;45&#46;25]要是能重来&#32;我要选李白&#10;[03&#58;48&#46;25]&#10;[03&#58;49&#46;11]创作也能到那么高端&#10;[03&#58;51&#46;89]被那么多人崇拜&#10;[03&#58;55&#46;97]&#10;[03&#58;56&#46;72]要是能重来"
export class LyricsPlayer{
    constructor(el, audio){//为了使时间精确加一个audio
        this.$el = el
        this.$audio = audio
        this.$el.innerHTML = `<div class="player-lyrics-lines"></div>`//放歌词
        this.$lines = this.$el.querySelector('.player-lyrics-lines')
        
        
        this.text = ''
        this.lyrics = [] 
        this.index = 0 //当前第几句话
        this.elapsed = 0
        this.reset(this.text)

    }


    start(){
        this.pause()
        this.intervalId = setInterval(this.update.bind(this),1000)
    }

    pause(){
        clearInterval(this.intervalId)
    }

    update(){
        this.elapsed = Math.round(this.$audio ? this.$audio.currentTime : this.elapsed + 1)
        if(this.index === this.lyrics.length - 1) this.reset()
        for(let i = this.index + 1; i < this.lyrics.length; i++){
            let seconds = this.getSeconds(this.lyrics[i])
            if(
                this.elapsed === seconds &&
                (!this.lyrics[i+1] || this.elapsed < this.getSeconds(this.lyrics[i + 1]))
            ){//只比较比当前时间大一秒的内容
               this.$lines.children[this.index].classList.remove('active')
               this.$lines.children[i].classList.add('active')
               this.index = i
               break//跳出循环
           }
        }
        
        if(this.index >2){
            let y = -(this.index -2) * this.LINE_HEIGHT
            this.$lines.style.transform = `translateY(${y}px)`
        }
    }

    render(){
        let html = this.lyrics.map(line =>`
        <div class="player-lyrics-line">${line.slice(10)}</div>
        `).join('')//slice(10)第十个开始提取
        this.$lines.innerHTML = html
    }

    reset(text){
        //console.log(text)
        this.pause()
        this.index = 0
        this.elapsed = 0
        if(text){
            this.text = this.formatText(text) || ''
            this.lyrics = this.text.match(/^\[\d{2}:\d{2}\.\d{2}\](.+)$/gm) || []
            //match(/^\[\d{2}:\d{2}\.\d{2}\].+$/gm)^以什么开头，.任意，+一次以上含一次，$以什么结尾，m匹配多行

            if(this.lyrics.length){
                this.render()
                this.$lines.children[this.index].classList.add('active')
            }
        }
    }

    restart(){
        this.reset()
        this.start()
    }

    getSeconds(line){//歌词所在秒数
        return +line.replace(/^\[(\d{2}):(\d{2}).*/,(match, p1, p2) => 60 * (+p1) + (+p2))//+是转换成数字
    }

    formatText(text){
        let div = document.createElement('div')
        div.innerHTML = text
        return div.innerText
    }
    formatText(text){  //把歌词文本转为更直观的排版(格式化)
        let div = document.createElement('div')
        div.innerHTML = text
        return div.innerText
      }
}

LyricsPlayer.prototype.LINE_HEIGHT = 42



