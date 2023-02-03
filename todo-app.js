(function () {
    // создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2')
        appTitle.innerHTML = title
        return appTitle
    }
    // создаем и возвращаем форму для создания дела
    function createTodoItemForm() {
        let form = document.createElement('form')
        let input = document.createElement('input')
        let buttonWrapper = document.createElement('div')
        let button = document.createElement('button')

        form.classList.add('input-group', 'mb-3')
        input.classList.add('form-control')
        input.placeholder = 'Введите название нового дела'
        buttonWrapper.classList.add('input-group-append')
        button.classList.add('btn', 'btn-primary')
        button.disabled = true
        button.textContent = 'Добавить дело'

        // let input = document.querySelector('form-control')

        input.addEventListener('input', function() {
            button.disabled=false
        })

        buttonWrapper.append(button)
        form.append(input)
        form.append(buttonWrapper)

        return {
            form,
            input,
            button,
        }
    }
    // создаем и возвращаем список элементов
    function createTodoList() {
        let list = document.createElement('ul')
        list.classList.add('list-group')
        return list
    }

    function createTodoItem(name) {
        let item = document.createElement('li')
        let buttonGroup = document.createElement('div')
        let doneButton = document.createElement('button')
        let deleteButton = document.createElement('button')

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center')
        item.textContent = name

        buttonGroup.classList.add('btn-group', 'btn-groum-sm')
        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'Готово'
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить'

        buttonGroup.append(doneButton)
        buttonGroup.append(deleteButton)
        item.append(buttonGroup)

        return {
            item,
            doneButton,
            deleteButton,
        }
    }

    function createTodoApp(container, title = 'gdfgdСписок дел', arrOfTodos){
        let todoAppTitle = createAppTitle(title)
        let todoItemForm = createTodoItemForm()
        let todoList = createTodoList()

        container.append(todoAppTitle)
        container.append(todoItemForm.form)
        container.append(todoList)



        // браузер создает событие submit на форме по нажатию enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function (e) {
            // эта строчка нужна, чтобы предотвратить стандартное действие браузера
            // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault()

            // игнорируем создание элемента, если в поле ничего не введено
            if (!todoItemForm.input.value) {
                
                return
            }

            let todoItem = createTodoItem(todoItemForm.input.value)

            todoItem.doneButton.addEventListener('click', function (){
                todoItem.item.classList.toggle('list-group-item-success')
            })
            todoItem.deleteButton.addEventListener('click', function(){
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove()
                }
            })

            todoList.append(todoItem.item)
            // обнуляем значение в поле, чтобы не пришлось стирать его вручную
            todoItemForm.button.disabled=true
            todoItemForm.input.value = ''
        })
    }

    window.createTodoApp = createTodoApp
})()