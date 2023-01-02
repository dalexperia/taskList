const tarefa = document.querySelector("#tarefa");
const btnInserir = document.querySelector("#btn-inserir");
const listaTarefas = document.querySelector("#lista-tarefa");

const createLi = (task)=>{
    const li = document.createElement('li');
    li.textContent = task;
    li.style.color = '#3a3939'
    return li;
}
const insertTasks = (task)=>{
    let li = createLi(task);
    const btn = document.createElement('button');
            btn.setAttribute('class','btnDelete');
            btn.textContent = "␡";
            btn.style.marginLeft='10px';
            btn.style.border = '1px solid #cccccc';
            btn.style.borderRadius = '5px';
    li.append(btn);
    listaTarefas.append(li);
    salvarTarefas();
}

const salvarTarefas = ()=>{
    let arrayTarefas = [];
    let lis =listaTarefas.querySelectorAll('li');
    lis.forEach(item => {
        arrayTarefas.push(item.textContent.replace('␡','').trim());
    })
    localStorage.setItem('tarefas',JSON.stringify(arrayTarefas));
}
const clear = (field) => {
    field.value = '';
    field.focus();
}
const deleteTask = (btn) => {
    btn.parentElement.remove();
    salvarTarefas();
}

document.addEventListener('keypress',(e) => {
   if(e.key === 'Enter') {
       if(!tarefa.value) return;
       insertTasks(tarefa.value);
       clear(tarefa);
   }
});

btnInserir.addEventListener('click',()=>{
    if(!tarefa.value) return;
    insertTasks(tarefa.value);
    clear(tarefa);
})

document.addEventListener('click',(e) => {
    let botao = e.target;
    if(botao.classList.contains('btnDelete')) deleteTask(botao);
});

const carregaLista = ()=>{
    let tarefas = localStorage.getItem('tarefas');

    JSON.parse(tarefas).map(tarefa => {
        insertTasks(tarefa);
    })
    console.log(tarefas);
}
carregaLista();




