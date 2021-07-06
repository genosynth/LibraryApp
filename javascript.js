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
  let library = document.getElementById("library");
  library.innerHTML ="";
  for (let i=0; i<myLibrary.length; i++){ //in this part we are creating a new div for each book and place it in the main library div
  
    let div = document.createElement("div");  
    div.innerText= myLibrary[i].title+ " " + myLibrary[i].author + " " + myLibrary[i].pages + "pgs Read: " + myLibrary[i].read;
    div.className = "book";
    let removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.className="removeBtn"; 
    
    let statusBtn = document.createElement("button");
    statusBtn.innerText="Change Status";
    statusBtn.className="statusBtn";

    div.appendChild(removeBtn);  //appending the buttons to the book/div so that after we can add event listener  
    div.appendChild(statusBtn)
    library.appendChild(div);
        
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