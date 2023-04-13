


const form=document.querySelector('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const fd= new FormData(form);


    const obj= Object.fromEntries(fd);
    //console.log(obj);

    // const json= JSON.stringify(obj);
    // localStorage.setItem('form',json);

   // window.location.href="invoice.html";

});


function printInv(){
    document.title='Inv.pdf';window.print()



}
 
//auto fill date                           
document.getElementById('prep-date').valueAsDate = new Date();
document.getElementById('invoicenum').value =new Date().getTime().toString();



   function calc(idx) {
    let price = parseFloat(document.getElementById("cost" + idx).value) *
      parseFloat(document.getElementById("qty" + idx).value);
    //  alert(idx+":"+price);  
    document.getElementById("price" + idx).value = isNaN(price) ? "0.00" : price.toFixed(2);
  
  }
  let depo= parseFloat(document.getElementById("deposit").value);


 
  
  function totalIt() {
    let qtys = document.getElementsByName("qty[]");
    let total = 0;
    let depo= parseFloat(document.getElementById("deposit").value).toFixed(2);
    for (let i = 1; i <= qtys.length; i++) {
      calc(i);
      let price = parseFloat(document.getElementById("price" + i).value);
      if(document.getElementById("deposit").value.length == 0){
        document.getElementById("deposit").value = 0.00;

      }
      

      total += isNaN(price) ? 0 : price;

    }
    
    let total2 = (document.getElementById("total")).value= (total-depo).toFixed(2);
    


  }

  
  
  window.onload = function() {
    document.getElementsByName("qty[]")[0].onkeyup = function() {
      calc(1)
    };
    document.getElementsByName("cost[]")[0].onkeyup = function() {
      calc(1)
    };
  }
  
  let rowCount = 0;
  
  function addRow(tableID) {
  
    let table = document.getElementById(tableID);
  
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
  
    let cell1 = row.insertCell(0);
    let element1 = document.createElement("input");
    element1.type = "checkbox";
    element1.name = "chk[]";
    cell1.appendChild(element1);
  
    let cell2 = row.insertCell(1);
    cell2.innerHTML = rowCount;
  
    let cell3 = row.insertCell(2);
    let element3 = document.createElement("input");
    element3.type = "text";
    element3.name = "item[]";
    element3.required = "required";
    cell3.appendChild(element3);
  
    let cell4 = row.insertCell(3);
    let element4 = document.createElement("input");
    element4.type = "text";
    element4.name = "qty[]";
    element4.id = "qty" + rowCount;
    element4.onkeyup = function() {
      calc(rowCount);
    }
    cell4.appendChild(element4);
  
    let cell5 = row.insertCell(4);
    let element5 = document.createElement("input");
    element5.type = "text";
    element5.name = "cost[]";
    element5.id = "cost" + rowCount;
    element5.onkeyup = function() {
      calc(rowCount);
    }
    cell5.appendChild(element5);
  
    let cell6 = row.insertCell(5);
    let element6 = document.createElement("input");
    element6.type = "text";
    element6.name = "price[]";
    element6.id = "price" + rowCount
    cell6.appendChild(element6);
  
  
  
  }
  
  function deleteRow(tableID) {
    try {
      let table = document.getElementById(tableID);
      let rowCount = table.rows.length;
  
      for (let i = 0; i < rowCount; i++) {
        let row = table.rows[i];
        let chkbox = row.cells[0].childNodes[0];
        if (null != chkbox && true == chkbox.checked) {
          table.deleteRow(i);
          rowCount--;
          i--;
        }
  
  
      }
    } catch (e) {
      alert(e);
    }
  }
  

  // Save the PDF
  doc.save('document.pdf');