const newBookButton = document.getElementById('new-book');
const form = document.getElementById('form');
const container = document.getElementById('container');

let bookID = [];

let myLibrary = [
  // {
  //   title: 'The Hobbit',
  //   author: 'J.R.R. Tolkien',
  //   pages: '295',
  //   read: true,
  //   id: 'xx',
  // },
  // {
  //   title: 'The Hobbit2',
  //   author: 'J.R.R. Tolkien2',
  //   pages: '2952',
  //   read: false,
  //   id: 'x9',
  // },
];

newBookButton.addEventListener('click', () => {
  form.classList.toggle('hidden');
  form.classList.contains('hidden')
    ? (newBookButton.innerText = 'New Book')
    : (newBookButton.innerText = 'Close form');
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = Math.random().toString(36).substring(2, 5);
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary(title.value, author.value, pages.value, read.checked);
  console.log('Submit was pressed');
  console.log(myLibrary);
  form.reset();
  updateDisplay();
});

function updateDisplay() {
  for (let x of myLibrary) {
    if (bookID.includes(x.id)) {
      continue;
    } else {
      let bookBodyDiv = document.createElement('div');
      bookBodyDiv.classList.add('book-body');
      let bookBodyH3 = document.createElement('h3');
      let bookBodyH1 = document.createElement('h1');
      let bookBodyH5 = document.createElement('h5');
      let bookBodyP = document.createElement('p');
      let bookToggles = document.createElement('div');
      let bookDelete = document.createElement('button');
      let readStatus = document.createElement('button');

      bookBodyDiv.appendChild(bookBodyH3);
      bookBodyH3.innerText = x.author;
      bookBodyDiv.appendChild(bookBodyH1);
      bookBodyH1.innerText = x.title;
      bookBodyDiv.appendChild(bookBodyH5);
      bookBodyH5.innerText = `Pages: ${x.pages}`;
      bookBodyDiv.appendChild(bookBodyP);
      bookBodyP.innerText = `Did read? ${x.read}`;
      bookDelete.innerText = 'Remove';
      readStatus.innerText = `${x.read === true ? 'Unread' : 'Read'}`;
      bookToggles.appendChild(bookDelete);
      bookToggles.appendChild(readStatus);
      bookDelete.type = 'button';
      readStatus.type = 'button';
      bookToggles.style = 'display: flex';

      container.appendChild(bookBodyDiv);
      bookBodyDiv.appendChild(bookBodyH3);
      bookBodyDiv.appendChild(bookBodyH1);
      bookBodyDiv.appendChild(bookBodyH5);
      bookBodyDiv.appendChild(bookBodyP);
      bookBodyDiv.appendChild(bookToggles);

      bookID.push(x.id);

      function toggleReadColor() {
        x.read === true
          ? (bookBodyDiv.style.backgroundColor = 'green')
          : (bookBodyDiv.style.backgroundColor = 'red');
      }
      toggleReadColor();

      bookDelete.addEventListener('click', () => {
        // bookBodyDiv.parentNode.removeChild(bookBodyDiv);
      });

      readStatus.addEventListener('click', () => {
        switch (x.read) {
          case true:
            x.read = false;
            bookBodyP.innerText = `Did read? ${x.read}`;
            toggleReadColor();
            break;
          case false:
            x.read = true;
            bookBodyP.innerText = `Did read? ${x.read}`;
            toggleReadColor();
            break;
        }
      });
    }
    continue;
  }
}
