class Slider {
    constructor(options = {}){ 
        this.$el = options.el
        this.slides =options.slides
        this.interval = options.interval || 3000//interva是默认值
        this.index = 0
        this.render()
        this.start()
    }

    render(){
        this.$el.innerHTML = `<ul class="qq-slider-wrap"></ul>`
        this.$el.innerHTML += `
        <ul class="qq-slider-dots">
                <span class="qq-slider-dots-active"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </ul>
        `
        this.$wrap = this.$el.firstElementChild
        this.$wrap.style.width = `${this.slides.length * 100}%`
        this.$wrap.innerHTML = this.slides.map(slide =>
        `<li class="qq-slider-item">
            <a href="${slide.link}">
                <img src="${slide.image}" alt="">
            </a>
        </li>`
        ).join('')
        let arr = []
        arr.forEach.call(this.$wrap.children, item =>{
            item.style.width = `${100/this.slides.length}%`
        })
    }

    start(){
        setInterval(()=>{
            this.index ++
            this.next()
        }, this.interval)//每三秒调用一个函数，this.inresval是三秒       
    }

    next(){
        if(this.index === this.slides.length){
            this.index = 0
            this.$wrap.style.left = 0
        }

        this.$wrap.style.left = `-${100 * this.index}%` //现在是5张图500除5是每一张图移动的像素，挪到第几张图就乘第几张图
        let arr = []
        arr.forEach.call(this.$el.children[1].children,(item) =>{
            item.classList.remove('qq-slider-dots-active')
        })
        this.$el.children[1].children[this.index].classList.add('qq-slider-dots-active')
    }
    
}