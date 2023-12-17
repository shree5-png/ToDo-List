'use strict'

const text_date=  document.querySelector('.date');
const add_todo = document.querySelector('.addtask');
const input_container = document.querySelector('.input_container');

const container = document.querySelector('.container');
const input_title = document.querySelector('.input_heading');
const input_description = document.querySelector('.input_description');

const input_form = document.querySelector('.input_form');
const todo_btn = document.querySelectorAll('.todo_btn');

const text_field = document.querySelector('.text_field');

const list_container = document.querySelector('.list-container');

const HeadInput = document.querySelector('#headInput');
const Headdesc = document.querySelector('#headDesc');

const container_Body = document.querySelector('.container-Body');


//NOTE : DATE FORMAT 
//Date updater in navigation bar
const dateFormat= function(){

    const calendar = new Date();

    let options={
        weekday: 'short',  month: 'short', day: 'numeric'
    
    };

    const today = new Intl.DateTimeFormat('en-US', options).format(calendar);
    
    text_date.innerHTML=today;
   
}
dateFormat();



///////////////////////////////////////////////////////////////////////////////////////////////////



//NOTE TO GET ITEMS FROM LOCAL STORAGE
let list = getItems();

function getItems(){

    const value = localStorage.getItem('todos') || "[]";
    return JSON.parse(value);

};



//NOTE TO SET ITEMS TO THE LOCAL STORAGE
function setItems(items){

    localStorage.setItem('todos',JSON.stringify(items));
};


//NOTE TO STORE THE DATA IN LOCAL STORAGE
function storage(ttl = '',desc= '', isChecked = false){


    list.push({
        title: ttl ,
        description: desc,
        checked: isChecked,
    });


    setItems(list);
    refereshList();
};

function refereshList(){

    list_container.innerHTML="";
    list.forEach(each=>{
        
        
            showTask(each.title,each.description,each.checked);

        
    })
}




function updateTaskInLocalStorage(index, newTittle, newDescription){

    list[index].title= newTittle;
    list[index].description = newDescription;
    
    setItems(list);
    refereshList();

};




let iForIndex;
function indexTransfer(each_list, element){

     iForIndex = Array.from(each_list).indexOf(element);

};

function checkCircleIndex(cIndex,status){

if(status==="false"){

    list[cIndex].checked = false;
    setItems(list);

}
if(status==="true"){
    list[cIndex].checked = true;
    setItems(list);
}
};


function clickonAddEdit(){

    // console.log("Editing mode");
    if(input_container.querySelector('#headInput').value==='') return;

    const newTitle = input_container.querySelector('#headInput').value;
    const newDescription= input_container.querySelector('#headDesc').value;
    updateTaskInLocalStorage(iForIndex, newTitle, newDescription);

    toClearInputField();
    OpenCloseInputContainer('close');
    // solidCircle();

}


const ClickOnAdd = function(){
        

        if(input_container.querySelector('#headInput').value==='') return;
        console.log("Normal mode");

        const title = input_container.querySelector('#headInput').value;
        const description= input_container.querySelector('#headDesc').value;
       
          storage(title,description)
          toClearInputField();
          OpenCloseInputContainer('close');
        //   solidCircle();

};

function addHandler(){
    
    input_container.querySelector('.todo-add').removeEventListener("click", clickonAddEdit);
    input_container.querySelector('.todo-add').addEventListener("click", ClickOnAdd);
};


function ClickonDelete(){

    list.splice(iForIndex,1);
    setItems(list);
    refereshList();
    toClearInputField();
    OpenCloseInputContainer('close');

};


function toClearInputField(){

    input_container.querySelector('#headInput').value= '';
    input_container.querySelector('#headDesc').value = '';
}
    

//NOTE : OPENING AND CLOSING INPUT CONTAINER 
//opening input container after clicking on add task button

const OpenCloseInputContainer = function(task){

    if(task=="open"){
        add_todo.classList.add("hidden");
        input_container.classList.remove("hidden");

        input_container.querySelector('.todo-delete').classList.add('hidden');
        input_title.focus();
    }
    else if(task=='close'){ 

    input_container.classList.add('hidden');
    add_todo.classList.remove("hidden");
    }
    else{
        console.error("Error task input:: Not found");
    }

};

add_todo.addEventListener("click",function(){

    OpenCloseInputContainer("open");
    addHandler()
});















//NOTE SHOWING TASK ON CALLING FUNCTION
const showTask = function(mapDataTitle, mapDataDescription, ifchecked= false){

    const markup = `

    <div class="each-list" checked=${ifchecked}>

    <div class="icons">

        <div class="check-list regular">
            <i class="fa-regular fa-circle "></i>  
            <i class="fa-solid fa-circle hidden" style="color: #03871d;"></i>
        </div>

       

        <div class="edit-list  hidden">
            <i class="fa-regular fa-pen-to-square"></i>    
        </div>
    </div>

    <div class="text-list-box">
        <div class="list-title">
            <div class="text-content list-text-title">
            ${mapDataTitle}

            </div>

        </div>
        <div class="list-description">
            <div class="text-content list-text-desc">
            ${mapDataDescription}
            </div>

        </div>

    </div>
</div>
    `;
  
    list_container.insertAdjacentHTML('beforeend',markup);
    editButtonToggle();

    list_container.querySelectorAll('.each-list').forEach(each=>{

       if( each.getAttribute("checked")==="true"){
        // insideSolidCircle(each);
        checkedSolidCircle(each);
       }else{
        uncheckedSolidCircle(each);
       }
    })
    

};



//NOTE TOGGLING THE EDIT BUTTON 

const addHandlerToggleEdit = function(e){
  
    const editList =  e.currentTarget.querySelector(".edit-list").classList;
     if(e.type==="mouseover"){
         editList.remove("hidden");
     }else{
         editList.add("hidden");
     }

 };

  function editButtonToggle(){

    const each_list= document.querySelectorAll('.each-list');

    each_list.forEach((element)=>{

    element.addEventListener('mouseover',addHandlerToggleEdit);
    element.addEventListener('mouseout',addHandlerToggleEdit);
    // solidCircle();


    
//NOTE ON EDIT

function onClickEdit(){

    element.querySelector(".edit-list").addEventListener('click',function(e){


        const index = Array.from(each_list).indexOf(element);

        indexTransfer(each_list, element);

        OpenCloseInputContainer('open');
        const deleteBtn= input_container.querySelector('.todo-delete');
        deleteBtn.classList.remove('hidden');

        input_container.querySelector('#headInput').value =element.querySelector('.list-text-title').textContent.trim();
        input_container.querySelector('#headDesc').value =element.querySelector('.list-text-desc').textContent.trim();

    function addEditHandler(){
        input_container.querySelector('.todo-add').removeEventListener("click",  ClickOnAdd);
        input_container.querySelector('.todo-add').addEventListener("click",clickonAddEdit);
    };
    addEditHandler();

    

    function deletehandler(){

        deleteBtn.addEventListener('click',ClickonDelete);
    }
    deletehandler();

  

    
    })
}
onClickEdit();

  });
};

//on cancel

function onCLickCancel(){

    input_container.querySelector(".todo-cancel").addEventListener("click",function(e){
        e.preventDefault();
        toClearInputField()
        OpenCloseInputContainer('close');

    })

}
onCLickCancel();



///////////////////////////




function checkedSolidCircle(element){

    element.querySelector('.text-content').style.cssText="color:var(--desc); text-decoration:line-through";
    element.querySelector('.list-text-desc').style.cssText="color: rgba(183, 183, 183, 0.521)";

  
    element.querySelector('.fa-solid').classList.remove('hidden');
    element.querySelector('.fa-regular').classList.add('hidden');

 
    const each_list= document.querySelectorAll('.each-list');
    const solidIndex = Array.from(each_list).indexOf(element);
    checkCircleIndex(solidIndex,"true");

}

function uncheckedSolidCircle(element){

    element.querySelector('.text-content').style.cssText="color:var(--title); text-decoration:none";
    element.querySelector('.list-text-desc').style.cssText="color:var(--desc)";

    element.querySelector('.fa-solid').classList.add('hidden');
    element.querySelector('.fa-regular').classList.remove('hidden');

    const each_list= document.querySelectorAll('.each-list');
    const solidIndex = Array.from(each_list).indexOf(element);
    checkCircleIndex(solidIndex,"false");

}


function toggleSolidCircle(element){
    
  
    if( element.getAttribute("checked") === "true"){

        element.setAttribute("checked","false");
        uncheckedSolidCircle(element);

    }
    else if( element.getAttribute("checked")=== "false"){

        checkedSolidCircle(element);
        element.setAttribute("checked","true");

    }

}


 
////////////////////////
function solidCircle() {
    list_container.addEventListener('click', function (e) {

        const checkList = e.target.closest('.check-list');

        
        // if (e.target.classList.contains('edit-list', 'fa-pen-to-square')) {
        //     return;
        // }

        if (checkList) {

            const element = checkList.closest('.each-list');

                toggleSolidCircle(element);  
        }
    });
}


function toClearTask(){
    
    
    document.querySelector('.toClear').addEventListener('click',function(e){
        
        e.preventDefault();
    // list = [];
    list.length=0;
    setItems(list);
    refereshList();
    
})

}

toClearTask();



function darkMode(){
    
    document.querySelector('.night_mode').addEventListener("click",function(e){
        e.preventDefault();
        
        const html=  document.querySelector('.html');
        const lightMoon = document.querySelector('.lightMoon');
        const darkMoon = document.querySelector('.darkMoon');
        html.classList.toggle('dark-theme');
        html.classList.toggle('light-theme');
        
        lightMoon.classList.toggle('hidden');
        darkMoon.classList.toggle('hidden');
    })
}


darkMode();
solidCircle();



//NOTE calling the refersh list that calls the show task
refereshList();