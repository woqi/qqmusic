class HotKey{
    constructor(el){
        this.$el = el
    }
    getData(){
        console.log(el)
        fetch(`https://qq-server-kfhdengskt.now.sh/gotHotkey`)
        .then(res=> res.json())
        .then(json=> this.renderHotKey(json.data))
        return this
    }
    renderHotKey(datas){
        console.log(datas)
        let datas = data.hotkey
        let html = this.getRandom(datas,9).map(hotkey =>`
        <a href="" class="js_keyword tag_s">${hotkey.k}</a>
        `).join('')
        // this.$el.insertAdjacentHTML('beforeend', `<a href="${data.special_url}" class="tag_s tag_hot">${data.special_key}</a>`+ html)
        this.$el.innerHTML = `<a href="${data.special_url}" class="tag_s tag_hot">${data.special_key}</a>` + html
    }
    getRandom(nub,len){
        var arr = []
        for(let i=0; i<len; ++i){
            let radom = Math.floor(Math.random() * nub.length)
            arr.push(nub[random])
            nub.splic(radom,1)
        }
        return arr
    }
    getRandomNum(array,len) {
        console.log(1)
        var reslut = [];
        for (let i = 0; i < len; ++i) {
            let random = Math.floor(Math.random() * array.length);
            reslut.push(array[random]);
            array.splice(random,1);
        }
        return reslut;        
      }
}




