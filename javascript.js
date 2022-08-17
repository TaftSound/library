let myLibrary = [];
const bookGrid = document.querySelector('.book-grid');


// function Book(title, author, pages, haveRead) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.haveRead = haveRead;
// }

class Book {
  constructor(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }
}

function addBookToLibrary(title, author, pages, haveRead = false) {
  myLibrary.push(new Book(title, author, pages, haveRead));
}

function createBookCard(bookObject, index) {
  const bookCard = document.createElement('div');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');
  const contentDiv = document.createElement('div');
  const title = document.createElement('h3');
  const bookLink = document.createElement('a');
  const bookImage = document.createElement('img');
  const author = document.createElement('h4');
  const pages = document.createElement('h4');
  const readButton = document.createElement('button');

  bookCard.classList.add('book-card');
  deleteButton.classList.add('delete-button');
  deleteButtonImg.src = './images/close-circle-outline.png';
  deleteButtonImg.alt = 'delete-icon';
  contentDiv.classList.add('card-content');
  bookLink.href = './index.html';
  bookImage.src = './images/book.png';
  bookImage.alt = 'book-icon';
  bookImage.classList.add('book-icon');
  readButton.classList.add('read-button');
  if (!bookObject.haveRead) {
    readButton.classList.add('unread');
    readButton.textContent = 'Unread';
  }
  else {
    readButton.textContent = 'Read';
  }

  title.textContent = bookObject.title;
  author.textContent = `By: ${bookObject.author}`;
  pages.textContent = `Pages: ${bookObject.pages}`;

  deleteButton.addEventListener('click', deleteThisCard);
  readButton.addEventListener('click', changeReadStatus);

  deleteButton.appendChild(deleteButtonImg);
  bookCard.appendChild(deleteButton);
  bookCard.appendChild(contentDiv);
  contentDiv.appendChild(title);
  bookLink.appendChild(bookImage);
  contentDiv.appendChild(bookLink);
  contentDiv.appendChild(author);
  contentDiv.appendChild(pages);
  bookCard.appendChild(readButton);

  return bookCard;

  function deleteThisCard() {
    removeAllChildren(bookCard);
    bookGrid.removeChild(bookCard);
    console.log(myLibrary[index]);
    myLibrary.splice(index, 1);
    displayLibrary();
  }
  
  function changeReadStatus() {
    if (bookObject.haveRead) {
      bookObject.haveRead = false;
      console.log(bookObject.haveRead);
      console.log(readButton);
      readButton.classList.add('unread');
      readButton.textContent = 'Unread';
      return;
    }
    console.log(bookObject.haveRead);
    console.log(readButton);
    bookObject.haveRead = true;
    readButton.classList.remove('unread');
    readButton.textContent = 'Read';
    return;
  }
}

function createNewBookButtonCard() {
  const newBookButtonCard = document.createElement('div');
  const newBookButton = document.createElement('button');
  const newBookImg = document.createElement('img');

  newBookButtonCard.classList.add('new-card');
  newBookImg.src = './images/add.png';
  newBookImg.alt = 'new card button';
  newBookButton.addEventListener('click', displayNewCardForm);

  newBookButtonCard.appendChild(newBookButton);
  newBookButtonCard.appendChild(newBookImg);
  return newBookButtonCard;
}

function displayBookCard(newBookCard) {
  bookGrid.appendChild(newBookCard);
}

function displayLibrary() {
  removeAllChildren(bookGrid);
  for (let book in myLibrary) {
    let newBook = createBookCard(myLibrary[book], book);
    displayBookCard(newBook);
  }
  displayBookCard(createNewBookButtonCard());
}

function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function displayNewCardForm() {
  const newCardForm = document.querySelector('.form-container');
  const submitButton = document.getElementById('submit-button');
  const deleteButton = document.querySelector('.new-book-form').firstChild.nextSibling;
  const title = document.getElementById('title-input');
  const author = document.getElementById('author-input');
  const pages = document.getElementById('pages-input');
  
  title.value = '';
  author.value = '';
  pages.value = '';
  bookGrid.classList.add('remove-from-display');
  newCardForm.classList.remove('remove-from-display');
  submitButton.addEventListener('click', submitNewCardForm);
  deleteButton.addEventListener('click', undoSubmitCardForm);
}

function submitNewCardForm() {
  const title = document.getElementById('title-input');
  const author = document.getElementById('author-input');
  const pages = document.getElementById('pages-input');
  const newCardForm = document.querySelector('.form-container');

  addBookToLibrary(title.value, author.value, pages.value);
  newCardForm.classList.add('remove-from-display');
  bookGrid.classList.remove('remove-from-display');
  displayLibrary();
}

function undoSubmitCardForm() {
  const newCardForm = document.querySelector('.form-container');

  newCardForm.classList.add('remove-from-display');
  bookGrid.classList.remove('remove-from-display');
}


addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '350');
addBookToLibrary('Harry Potter', 'J.K. Rowling', '475');
displayLibrary();

