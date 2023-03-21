window.addEventListener( 'load', () => {

    // Date
    const day = document.getElementById('day-num')
    const month = document.querySelector('.month')
    const year = document.querySelector('.year')


    // Toggle Theme
    const toggleTheme = document.querySelector('.toggle')
    const body = document.querySelector('body')
    const container = document.querySelector('#container')
    const circle = document.querySelector('#toggle-wrap .toggle span')
    const title = document.querySelector('#content .title h1')
    const input = document.querySelector('#content .add-task input[type="text"]')
    const btnAdd = document.querySelector('#content .add-task button')
    const gitIcon = document.querySelector('footer img')


    // Add Tasks
    const list = document.querySelector('#list')
    let id


    // Check Button
    const checkedCl = 'line-through'
    const check = 'fa-check-circle'
    const uncheck = 'fa-circle'


    // Local Storage
    let LIST


    // Set Date Function
    function setDate () {
        const date = new Date
        day.textContent = date.toLocaleString('es', { day: 'numeric' })
        month.textContent = date.toLocaleString('es', { month: 'short' }).toUpperCase()
        year.textContent = date.toLocaleString('es', { year: 'numeric' })
    }

    setDate()


    // Change Theme Function
    function changeTheme () {
        body.classList.toggle('theme-dark')
        toggleTheme.classList.toggle('theme-dark')
        container.classList.toggle('theme-dark')
        day.classList.toggle('theme-dark')
        month.classList.toggle('theme-dark')
        year.classList.toggle('theme-dark')
        circle.classList.toggle('theme-dark')
        title.classList.toggle('theme-dark')
        input.classList.toggle('theme-dark')
        btnAdd.classList.toggle('theme-dark')
        gitIcon.classList.toggle('theme-dark')
        list.parentNode.querySelectorAll('.text').classList.toggle('theme-dark')
    }

    toggleTheme.addEventListener('click', changeTheme)


    // Add Task Function
    function addTask (task, id, done, deleted) {
        if (deleted) { return }

        const checked = done ?check :uncheck
        const line = done ?checkedCl :''

        const taskHtml = `
            <li id="${ id }">
                <span id="check" class="far ${ checked }" data="done"></span> <p class="text ${ line }">${ task }</p> <span id="delete" class="fas fa-trash de" data="deleted"></span>
            </li>
        `
        list.insertAdjacentHTML('beforeend', taskHtml)
    }


    //Task Done Function
    function taskDone (element) {
        element.classList.toggle(check)
        element.classList.toggle(uncheck)
        element.parentNode.querySelector('.text').classList.toggle(checkedCl)
        LIST[element.id].done = LIST[element.id].done ?false :true
    }


    // Task Deleted Function
    function taskDeleted (element) {
        element.parentNode.parentNode.removeChild(element.parentNode)
        LIST[element.id].deleted = true
    }


    // Event to Add The Task
    btnAdd.addEventListener('click', () => {
        const task = input.value
        if (task) {
            addTask(task, id, false, false)
            LIST.push({
                name : task,
                id : id,
                done : false,
                deleted : false
            })
        } else {
            alert('Ingrese una tarea')
            return
        }
        localStorage.setItem('ToDo',JSON.stringify(LIST))
        id ++
        input.value = ''
    })


    // Event to Add the Task with the key Enter
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const task = input.value
            if (task) {
                addTask(task, id, false, false)
                LIST.push({
                    name : task,
                    id : id,
                    done : false,
                    deleted : false
                })
            } else {
                alert('Ingrese una tarea')
                return
            }
            localStorage.setItem('ToDo',JSON.stringify(LIST))
            id ++
            input.value = ''
        }
        
    })


    // Event to Check and to Delete the Task
    list.addEventListener('click', (event) => {
        const element = event.target 
        const elementData = element.attributes.data.value
        console.log(elementData)
        
        if (elementData === 'done') {
            taskDone(element)
        } else if (elementData === 'deleted') {
            taskDeleted(element)
        }
        localStorage.setItem('ToDo',JSON.stringify(LIST))
    })

    
    //LocalStorage
    function loadList (DATA) {
        DATA.forEach(element => {
            addTask(element.name, element.id, element.done, element.deleted)
        })
    }

    let data = localStorage.getItem('ToDo')

    if (data) {
        LIST = JSON.parse(data)
        id = LIST.length
        loadList(LIST)
    } else {
        LIST = []
        id = 0
    }
})