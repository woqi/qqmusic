
const express = require('express')
const request = require('request-promise')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 4000

const HEADERS = {
    'accept': 'application/json',
    'athority': 'c.y.qq.com',
    'origin': 'https://y.qq.com',
    'referer': 'https://c.y.qq.com/m/index.html',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
//伪造的头
} 

app.use(cors())

app.get('/',async(req, res)=>{
    const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+ new Date()}`
    //上面的是首页url
    try{
        res.json(await request({
            uri: url,
            json: true,
            headers: HEADERS
        }))
    } catch(e){
        res.json({error: e.message})
    }
})

app.get('/search',async(req, res)=> {
    const {keyword, page=1} = req.query
    //req.query请求带的参数
    //例如http://localhost:4000/search?keyword=薛之谦&page=2
    const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all&_=${+new Date()}`
    try{
        res.json(await request({
            uri: url,
            json: true,
            headers: HEADERS
        }))
    } catch(e){
        res.json({error: e.message})
    }


})

app.listen(PORT)

//listen里可以直接加四位数字

//git bash 输入nodemon server.js
//网页输入http://localhost:4000/
//http://localhost:4000/search?keyword=歌手名



