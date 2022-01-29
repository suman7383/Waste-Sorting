let select = document.getElementById("locality-search");
let table = document.getElementById("table-body")
let wasteData = [];
let count = 0;

function getData(event){
  event.preventDefault();
  let value = select.value;
  clearTable();

  axios.get(`http://localhost:5000/api/waste/data/get?locality=${value}`).then((res)=>{
    console.log(res.data);
    wasteData=res.data;
    console.log(wasteData);
    addRow();
  }).catch((err)=>{
    console.log(err);
  })
}

function addRow(){
  wasteData.forEach((elm)=>{
    count+=1;
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    let thText = document.createTextNode(count);
    th.appendChild(thText);
    tr.appendChild(th);
    th.setAttribute("scope","row");

    let td = document.createElement("td");
    let tdText = document.createTextNode(elm.name);
    td.appendChild(tdText); 
    tr.appendChild(td);

    td= document.createElement("td");
    tdText =document.createTextNode(elm.organicCount);
    td.appendChild(tdText);
    tr.appendChild(td);

    td=  document.createElement("td");
    tdText =document.createTextNode(elm.recyclableCount);
    td.appendChild(tdText);
    tr.appendChild(td);

    td= document.createElement("td");
    tdText =  document.createTextNode(elm.electronicCount);
    td.appendChild(tdText);
    tr.appendChild(td);

    table.appendChild(tr);
  })

  updateDetails();
}

function updateDetails(){

  if(wasteData.length!=0){
    console.log(count);

    let house = document.getElementById("house-count");
    house.setAttribute("data-title",count);
  
    let max_waste = document.getElementById("max-type");
    max_waste.setAttribute("data-title","Recyclable Waste");
  }else{
    count=wasteData.length;;
  }
}

function clearTable(){
  let house = document.getElementById("house-count");
  house.setAttribute("data-title"," ");

  let max_waste = document.getElementById("max-type");
  max_waste.setAttribute("data-title"," ");

  let tableBody = document.getElementById("table-body");
  let child = tableBody.lastElementChild;

  while (child) {
      tableBody.removeChild(child);
      child = tableBody.lastElementChild;
  }
}