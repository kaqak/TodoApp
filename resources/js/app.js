//Selecting 
const form = document.querySelector('#todo-form');
const todoList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-todos');
const filter = document.querySelector('#filter');
const todoInput = document.querySelector('#todo');

//Load all event listeners
loadEventListners();

//Load all event listeners

function loadEventListners(){
  //ADD todo event 
  form.addEventListener('submit', addTodo);
  //Remove todo event 
  todoList.addEventListener('click', removeTodo);
  //Clear todos button 
  clearBtn.addEventListener('click', clearTodos);
  //Filter todo event
  filter.addEventListener('keyup', filterTodos);
}

//Add todo
function addTodo(e){
  if(todoInput.value === ''){
    alert('Please enter a todo!')
  }
  //Create li element
  const li = document.createElement('li');
  //Add class
  li.className='collection-item';
  //Create text node  and append to li
  li.appendChild(document.createTextNode(todoInput.value));
  //Create new link element 
  const link = document.createElement('a');
  //Add class 
  link.className = 'delete-item secondary-content';
  //Add icon html
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  li.appendChild(link);

  //Append li to ul
  todoList.appendChild(li);

  //Store in localStorage
  storeTodoInLocalStorage(todoInput.value);



  //Clear the input
  todoInput.value= '';


  e.preventDefault();
}
//Store Todo
function storeTodoInLocalStorage(todo){
  let todos;
  if(localStorage.getItem('todo')===null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo); 

  localStorage.setItem('todos', JSON.stringify(todos));
}
// Remove todo
function removeTodo(e){
  
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure')){

      e.target.parentElement.parentElement.remove();
    }
  }
}
//Clear todos
function clearTodos(){
  // todoList.innerHTML = '';

  while(todoList.firstChild){
    todoList.removeChild(todoList.firstChild);
  }
}

//Filter 
function filterTodos(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(todo){
      const item = todo.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1 ){
        todo.style.display ='block';
      }else{
        todo.style.display ='none';  
      }
    }
  );
}