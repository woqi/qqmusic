

import './tab.js'
import{Recommend} from './recommend.js'
import{TopList} from './toplist.js'
import{Search} from './search.js'
import{MusicPlayer} from './music_play.js'

let recommend = new Recommend(document.querySelector('#rec-view')).launch()
let toplist = new TopList(document.querySelector('#rank-view')).launch()
let search = new Search(document.querySelector('#search-view'))
let player = new MusicPlayer(document.querySelector('#player'))
Search
//测试
//let test =  player.lyrics.reset(text)   
// window.search = search
// window.player = player

document.querySelector('#header .player').addEventListener('click', ()=> {
    player.show()
})

onHashChange()
addEventListener('hashchange', onHashChange)

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




