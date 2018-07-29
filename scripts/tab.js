document.addEventListener('click',function(event){
    let target = event.target
    if(target.dataset.role !== 'tab') return //如果没有data-role = tab
    
    [].forEach.call(target.parentElement.children, tab =>{
        tab.classList.remove('active')
       
    })

    target.classList.add('active')

    let content = document.querySelector(target.dataset.view)//target.dataset.view是你选到的内容


    if(content){//如果有content就执行下列操作
        [].forEach.call(content.parentElement.children, child =>{
            child.style.display = 'none'
        })
        content.style.display = 'block'
    }
})
//事件委托方式实现