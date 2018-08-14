//原理：监听页面scroll事件是否在视窗，是就加载，不是就不加载


//------------------------老方法
// function lazyload(images){
//     let imgs = [].slice.call(images)//转化为数组
//     let onscroll = throttle(function(){
//         //console.log(new Date())//如果body高度不设限制就会一直调用这个，需要设置一个截留函数（类似水龙头效果）

//         if (imgs.length === 0){
//             return window.removeEventListener('scroll', onscroll)
//         }
//         imgs = imgs.filter(img => img.classList.contains('lazyload'))
//         //找出class为lazyload的图片

//         //contains判断数组中是否包含某个值
//         //filter返回过滤后的新数组。用法跟map极为相似
//         //map原数组映射一个新数组
//         //imgs.filter(img => img.classList.contains('lazyload'))
//         //imgs.filter(function(img){
//             //return img.classList.contains('lazyload')
//         //})
//         imgs.forEach(img => {
//             if(inViewport(img)){//在视口就加载图片
//                 loadImage(img)
//             }
//         })
//     }, 500)

//     window.addEventListener('scroll', onscroll)
//     window.dispatchEvent(new Event('scroll'))


// }

// //节流函数
// function throttle(func, wait){//传入函数和等待的事件
//     let prev, timer//上次调用的时间
//     return function fn(){
//         let curr = Date.now()//记录当前时间
//         let diff = curr - prev
//         if(!prev || diff >= wait){ 
//             func()//第一次调用prev肯定是 undefined所以讲func传进来
//             prev = curr
//         }else if(diff < wait){
//             clearTimeout(timer)//有旧的消除一下
//             timer = setTimeout(fn, wait- diff)
//         }   
//     }
// }

// function inViewport(img){
//     let {top, left, right, bottom } = img.getBoundingClientRect()//获取图片位置
//     let vpWidth = document.documentElement.clientWidth//获取视口宽度
//     let vpHeight = document.documentElement.clientHeight//高度
//     return (
//         (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) &&
//         (left > 0 && left < vpWidth || right > 0 && right < vpWidth )
//         //大于0且小于视口高度或者
//     )
// }

// function loadImage(img){
//     let image = new Image()
//     image.src = img.dataset.src
//     image.onload = function(){//图片加载成功后
//         img.src = image.src
//         img.classList.remove('lazyload')
//     }
// }


//------------------------新方法IntersectionObserver，但是兼容性差，eag15以下及ios基本不能用

// function lazyload(images){
//     let imgs = [].slice.call(images)//转化为数组
//     let observer = new IntersectionObserver(function(entries){
//         entries.forEach(entry => {
//             if(entry.intersectionRatio > 0){
//                 loadImage(entry.target, ()=>{//此处回调                   
//                     observer.unobserve(entry.target)//加载成功就不用观察图片
//                 })
//             }
//         })
//     },{threshold: 0.01})
//     imgs.forEach(img => observer.observe(img))
// }



// function loadImage(img, callback){
//     let image = new Image()
//     image.src = img.dataset.src
//     image.onload = function(){//图片加载成功后
//         img.src = image.src
//         img.classList.remove('lazyload')
//         if(typeof callback === 'function') callback()
//     }
// }


//------------------------新老兼容

export function lazyload(images){
    let imgs = [].slice.call(images || document.querySelectorAll('.lazyload'))//转化为数组
    if('IntersectionObserver' in window){
        let observer = new IntersectionObserver(function(entries){
            entries.forEach(entry => {
                if(entry.intersectionRatio > 0){
                    loadImage(entry.target, ()=>{//此处回调                   
                        observer.unobserve(entry.target)//加载成功就不用观察图片
                    })
                }
            })
        },{threshold: 0.01})
        imgs.forEach(img => observer.observe(img))
    }else{
        let onscroll = throttle(function(){
            if (imgs.length === 0){
                return window.removeEventListener('scroll', onscroll)
            }
            imgs = imgs.filter(img => img.classList.contains('lazyload'))
            imgs.forEach(img => {
                if(inViewport(img)){//在视口就加载图片
                    loadImage(img)
                }
            })
        }, 500)
    
        window.addEventListener('scroll', onscroll)
        window.dispatchEvent(new Event('scroll'))
    
    }
    
}

function throttle(func, wait){
    let prev, timer
    return function fn(){
        let curr = Date.now()
        let diff = curr - prev
        if(!prev || diff >= wait){ 
            func()
            prev = curr
        }else if(diff < wait){
            clearTimeout(timer)
            timer = setTimeout(fn, wait- diff)
        }   
    }
}

function inViewport(img){
    let {top, left, right, bottom } = img.getBoundingClientRect()
    let vpWidth = document.documentElement.clientWidth
    let vpHeight = document.documentElement.clientHeight
    return (
        (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) &&
        (left > 0 && left < vpWidth || right > 0 && right < vpWidth )
    )
}

function loadImage(img, callback){
    let image = new Image()
    image.src = img.dataset.src
    image.onload = function(){//图片加载成功后
        img.src = image.src
        img.classList.remove('lazyload')
        if(typeof callback === 'function') callback()
    }
}
