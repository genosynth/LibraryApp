let myLibrary = [];

function Book(title, author, pages, read) { //Book Constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  
}



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
    
        
    
    let statusBtn = document.createElement("button");
    statusBtn.innerText="Change Status";
    statusBtn.className="statusBtn";
    let rowBtn2 = document.createElement("td");
    rowBtn2.innerText = myLibrary[i]["read"] + " ";
    rowBtn2.appendChild(statusBtn);

    let removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.className="removeBtn"; 
    let rowBtn1 = document.createElement("td");
    rowBtn1.appendChild(removeBtn);

    entry.appendChild(title)
    entry.appendChild(author)
    entry.appendChild(pages)
    entry.appendChild(rowBtn2)
    entry.appendChild(rowBtn1)
    
    library.appendChild(entry);
        
  }

  let buttons = document.querySelectorAll(".removeBtn"); //in this part we are adding the remove book event listener for each book
  for (let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", function() {
      myLibrary.splice(i, 1);
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

viewLibraryDOM();