//localStorage.clear();
if(!localStorage.getItem("listitems")){
    localStorage.setItem("listitems",JSON.stringify([]));
}

const addToList=()=>{
    let item = document.getElementById("list").value;
    if(item){
        let list=[];
         list = JSON.parse(localStorage.getItem("listitems"));
    
        list.push(item);
        localStorage.setItem("listitems",JSON.stringify(list));
    }

    showList();
}

const deleteFromList=()=>{
        let item=document.getElementById("list").value;
        
            let list=[];
            list = JSON.parse(localStorage.getItem("listitems"));
            let index = list.indexOf(item)
            if(index!=-1){
                list.splice(index,1);
                localStorage.setItem("listitems",JSON.stringify(list));
                showList();
            }
            else{
                alert("Not Found in list");
            }
           
        
}
const showList=()=>{
    let div = document.querySelector(".showlist");
    div.innerHTML="";
    let list = JSON.parse(localStorage.getItem("listitems"));
    console.log(list);
    let s="";
    list.forEach(element => {
        s += `<p>${element}</p>`;
    });
    div.innerHTML=s;

}
showList();
