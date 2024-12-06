let table = document.querySelector(".table");
let addItemForm = document.querySelector(".addItemForm");
let updateItemForm = document.querySelector(".updateItemForm");
let selectedRow=null;

   // console.log(document.getElementsByClassName("head_row")[0]);
    if(table.querySelectorAll("tr.contentRow").length==0){
        document.getElementsByClassName("head_row")[0].style.display="none";
    }
    else{
        document.getElementsByClassName("head_row")[0].style.display="table-row";
    }


 
// Show for after clicking add Item button
document.querySelector(".additem").addEventListener('click',()=>{
    addItemForm.style.display="flex";
    // Close add item form
    addItemForm.querySelector(".closeAddItemForm").addEventListener("click",()=> addItemForm.style.display="none");
})
// Submit add item form validate field and add item in table
document.querySelector(".addItemForm").addEventListener("submit",(e)=>{
    e.preventDefault();

        // Create object literal and store data
        let totalRows = table.getElementsByTagName("tr").length-2;
        const itemdata = {
            index:totalRows+1,
            name:document.getElementById("itemName").value,
            qty:parseInt(document.getElementById("itemQty").value),
            price:parseFloat(document.getElementById("itemPrice").value),
            status:document.getElementById("itemCheckStatus").checked
        }
        let validationFlag=true;
        if(itemdata.name==""){
                document.getElementsByClassName("errorName")[0].innerHTML="Name should not be Empty";
                validationFlag=false;
        }
        else{
            document.getElementsByClassName("errorName")[0].innerHTML="";
        }
        
        if (isNaN(itemdata.qty)){
            document.getElementsByClassName("errorQty")[0].innerHTML="Quantity should be a number";
            validationFlag=false;
        } 
        else{
            document.getElementsByClassName("errorQty")[0].innerHTML="";
        }
        if (isNaN(itemdata.price)){
            document.getElementsByClassName("errorPrice")[0].innerHTML="Price should be a number";
            validationFlag=false;
        }
        else{
            document.getElementsByClassName("errorPrice")[0].innerHTML="";
        }
        

        
        if(validationFlag){
            // add a row and insert data
            let tr = document.createElement("tr");
            tr.setAttribute("class","contentRow");
            for (let key in itemdata) {
                
                    let td1=document.createElement("td");
                    td1.textContent=itemdata[key] ;
                    if(key=="status"){  
                        td1.setAttribute("class","hidestatus");
                    }
                    tr.append(td1);
            }
            let statusTd = document.createElement("td");
            let statusIcon = document.createElement("i");

            // Check the value of 'status' and add the respective icon
            if (itemdata.status) {
                statusIcon.setAttribute("class", "fas fa-check-square checkBox"); // checked icon
            } else {
                statusIcon.setAttribute("class", "fas fa-times-circle checkBox"); // unchecked icon
            }
            statusTd.append(statusIcon);
            tr.append(statusTd);


            //create data for edit td in table
            let updatespan = document.createElement("span");
            updatespan.setAttribute("class","edititem");
            let updateIcon = document.createElement("i");
            updateIcon.setAttribute("class","fas fa-file-alt");
            updateIcon.setAttribute("title","Edit Row");
            updatespan.append(updateIcon);
      
        

            // Create delete item icon
            let deletespan = document.createElement("span");
            deletespan.setAttribute("title","Delete Row");
            deletespan.setAttribute("class","deleteitem ");
            let deleteIcon = document.createElement("i");
            deleteIcon.setAttribute("class","fas fa-trash-alt");
            deletespan.append(deleteIcon);
       
            // add edit and delete icon to td
            let td=document.createElement("td");
            td.appendChild(updatespan);
            td.appendChild(deletespan);
            tr.append(td);


            // Update (edit) item
            updatespan.addEventListener("click",(event)=>{
                    // Open the update form
                    updateItemForm.style.display="flex";
                    selectedRow=tr;
                    // Put previous values in update form to update
                
                    document.getElementById("updateitemName").value=selectedRow.querySelectorAll("td")[1].textContent;
                    document.getElementById("updateitemQty").value=selectedRow.querySelectorAll("td")[2].textContent;
                    document.getElementById("updateitemPrice").value=selectedRow.querySelectorAll("td")[3].textContent;
                    document.getElementById("updateitemCheckStatus").checked=selectedRow.querySelectorAll("td")[4].textContent;

                    // Close update item form
                    updateItemForm.querySelector(".closeAddItemForm").addEventListener("click",()=> updateItemForm.style.display="none");
                    
            })

            // Delete item
            deletespan.addEventListener("click",(event)=>{
                 selectedRow=tr;
                // Put previous values in update form to update
            
                let confirmDelete = confirm ("Are you sure ? delete selected item ?");
                if(confirmDelete){
                    let currIndex = selectedRow.querySelectorAll("td")[0].textContent;
                
                    selectedRow.remove();

                    let rows = table.querySelectorAll(".contentRow");
                    for(let i=0;i<rows.length;i++){
                        let indexCell = rows[i].querySelector("td");
                        indexCell.textContent=i+1;
                    }
                    if(table.querySelectorAll("tr.contentRow").length==0){
                        document.getElementsByClassName("head_row")[0].style.display="none";
                        document.getElementsByClassName("first_row")[0].style.backgroundColor="black";
                    }
                    else{
                        document.getElementsByClassName("head_row")[0].style.display="table-row";
                        document.getElementsByClassName("first_row")[0].style.backgroundColor="white";
                    }
                }
                selectedRow=null;
            })

            addItemForm.querySelector(".closeAddItemForm").click();
            table.getElementsByTagName("tbody")[0].append(tr);
            if(table.querySelectorAll("tr.contentRow").length==0){
                document.getElementsByClassName("head_row")[0].style.display="none";
                document.getElementsByClassName("first_row")[0].style.backgroundColor="black";
            }
            else{
                document.getElementsByClassName("head_row")[0].style.display="table-row";
                document.getElementsByClassName("first_row")[0].style.backgroundColor="white";
            }
        }

})
 
addItemForm.addEventListener("click",(event)=>{
    if (event.target.classList.contains('xyz')) {
        //console.log('Dynamically created button clicked:', event.target);
    }
})

// Submit updated item form validate field and add item in table
document.querySelector(".updateItemForm").addEventListener("submit",(e)=>{
    e.preventDefault();
    if(selectedRow!=null){
     const updatedData = {
            
            name:document.getElementById("updateitemName").value,
            qty:parseInt(document.getElementById("updateitemQty").value),
            price:parseFloat(document.getElementById("updateitemPrice").value),
            status:document.getElementById("updateitemCheckStatus").checked
        }

        let validationFlag=true;
        if(updatedData.name==""){
                document.getElementsByClassName("errorName")[1].innerHTML="Name should not be Empty";
                validationFlag=false;
        }
        else{
            document.getElementsByClassName("errorName")[1].innerHTML="";
        }
        
        if (isNaN(updatedData.qty)){
            document.getElementsByClassName("errorQty")[1].innerHTML="Quantity should be a number";
            validationFlag=false;
        } 
        else{
            document.getElementsByClassName("errorQty")[1].innerHTML="";
        }
        if (isNaN(updatedData.price)){
            document.getElementsByClassName("errorPrice")[1].innerHTML="Price should be a number";
            validationFlag=false;
        }
        else{
            document.getElementsByClassName("errorPrice")[1].innerHTML="";
        }
        

        if(validationFlag){
             // Update the respective <td> values in the selected row
            selectedRow.querySelectorAll("td")[1].textContent = updatedData.name;  // Update name
            selectedRow.querySelectorAll("td")[2].textContent = updatedData.qty;   // Update quantity
            selectedRow.querySelectorAll("td")[3].textContent = updatedData.price; // Update price
            selectedRow.querySelectorAll("td")[4].textContent = updatedData.status ; // Update status

            if(updatedData.status){
            
                selectedRow.querySelector("td i.checkBox").setAttribute("class","fas fa-check-square checkBox");
            }
            else{
                selectedRow.querySelector("td i.checkBox").setAttribute("class","fas fa-times-circle checkBox");
            }
            // Hide the update form
            updateItemForm.style.display = "none";
            // Reset selectedRow
            selectedRow = null;
        }
       
    }

    
    
       
})
