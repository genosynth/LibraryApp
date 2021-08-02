let myLibrary = [];

class Book {
  constructor (title, author, pages, read) { //Book Constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.dateAdded = this.dateAdded(); 
  }

  dateAdded() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
  
    today = dd + '/' + mm + '/' + yyyy;
    return today;
  }
   
}
/* Book.prototype.dateAdded =function (){
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;
  return today;
}
*/

function addBookToLibrary() { //This function creates a new book using the constructor and pushes the new book in the myLibrary[] array
  let form = document.getElementById("form");
  let title = form["title"].value;
  let author = form["author"].value;
  let pages = form["pages"].value;
  let read = form["read"].value;
  if (!title || !author || !pages){
      return alert("Please enter all data.")
  }
 

  let book = new Book(title, author, pages, read);
  
  myLibrary.push(book);
  
 
  
  viewLibraryDOM();
}

function viewLibraryDOM(){ // This function manipulates and updates the DOM
  loadLocalStorage();
  let library = document.getElementById("table-body");
  library.innerHTML ="";
  for (let i=0; i<myLibrary.length; i++){ //in this part we are creating the table with the right values position in their respective parent element  
  
    let entry = document.createElement("tr");  

    let title = document.createElement("td");
    title.innerText = myLibrary[i]["title"];
    let author = document.createElement("td");
    author.innerText =  myLibrary[i]["author"];
    let pages = document.createElement("td");
    pages.innerText = myLibrary[i]["pages"];
    let dateOfBookAdded = document.createElement("td");
    dateOfBookAdded.innerText = myLibrary[i].dateAdded;
    
        
    
    let statusBtn = document.createElement("button");
    statusBtn.innerText="Change Status";
    
    statusBtn.className="statusBtn";
    let rowBtn2 = document.createElement("td");
    rowBtn2.innerText = myLibrary[i]["read"] + " ";
    if (myLibrary[i].read =="Yes"){ // uses green color for read books and red color for unread books
      rowBtn2.style["backgroundColor"]="lightgreen";
    }
    if (myLibrary[i].read =="No"){
      rowBtn2.style["backgroundColor"]="red";
    }
    rowBtn2.appendChild(statusBtn);

    let removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.className="removeBtn"; 
    let rowBtn1 = document.createElement("td");
    rowBtn1.style["backgroundColor"]="rgb(203, 232, 241)"
    rowBtn1.appendChild(removeBtn);

    entry.appendChild(title)
    entry.appendChild(author)
    entry.appendChild(pages)
    entry.appendChild(rowBtn2)
    entry.appendChild(rowBtn1)
    entry.appendChild(dateOfBookAdded)
    
    library.appendChild(entry);
        
  }

  let buttons = document.querySelectorAll(".removeBtn"); //in this part we are adding the remove book event listener for each book
  for (let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", function() {
      myLibrary.splice(i, 1);
      updateStorage();//this is used to clear local storage and saves the remainign books in the local storage to avoid gap holes qith indexes
      viewLibraryDOM();
    });
  }

  let statusBtns = document.querySelectorAll(".statusBtn"); //in this part we are adding the change status event listener for each book
  for (let i=0; i<statusBtns.length; i++){
    statusBtns[i].addEventListener("click", function() {
      if(myLibrary[i].read == "Yes") {
        myLibrary[i].read = "No";
      } else {myLibrary[i].read ="Yes"}
      viewLibraryDOM();
    })
  }

}

function setToLocalStorage(){
  for (book in myLibrary){
    //console.log(myLibrary[book])
    let x = JSON.stringify(myLibrary[book])
    localStorage.setItem(book, x);
    
  }
}

function loadLocalStorage(){
  
  if (myLibrary.length>0){
    return
  }

  if (localStorage.length>0){
    myLibrary=[];
    for (let i=0; i<localStorage.length; i++){
      let obj = JSON.parse(localStorage[i]);
      myLibrary.push(obj);
    }
  }
}

function updateStorage(){ //this is used when a users deletes a book, so that it clears localstorage and saves the remaining books in the local storagre
    localStorage.clear();
    setToLocalStorage();

}


viewLibraryDOM();
window.onbeforeunload = setToLocalStorage;
