let books = [
  { title: 'Lorem', author: 'someone' },
  { title: 'Lorem2', author: 'someone' },
  { title: 'Lorem3', author: 'someone' },
];

function updateList() {
  console.log(books);
  document.getElementById('books-list').innerHTML = books.map(
    (x) => `<li>
             <h6>"${x.title}"  by ${x.author} </h6>
             <button type="button">Remove</button>
      </li>`,
  ).join('');

  const newBooks = JSON.stringify(books.map((x) => ({ ...x })));
  localStorage.setItem('books', newBooks);

  document.getElementById('books-list').querySelectorAll('button').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      // here is the remove logic
      books = books.filter((book, k) => i !== k);
      updateList();
    });
  });
}

window.addEventListener('load', () => {
  const newBooks2 = localStorage.getItem('books');
  books = JSON.parse(newBooks2);
  updateList();
  const btnAdd = document.querySelector('.btnAdd');
  btnAdd.addEventListener('click', (e) => {
    e.preventDefault();
    const title = form.title.value;
    const author = form.author.value;
    archive1.add(new Book(title, author));
    books = archive1.books;

  });

  var archive1 = new BookList([
    { title: "Book1", aythor: "author1" },
    { title: "Book2", aythor: "author2" }]);

  archive1.add("Harry Potter", "JK Rowling");
  archive1.add("book 4", "Author 4");
  books = archive1.books;

  //console.log(archive1);
});


class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookList {
  constructor(books) {
    this.books = books;
    this.htmlResult = '';
  }

  updateList() {
    console.log("list update");
    this.htmlResult = this.books.map((el) => {
      return `<li>
             <h6>"${el.title}"  by ${el.author} </h6>
             <button type="button">Remove</button>
      </li>`
    }).join('');
    document.getElementById('books-list').innerHTML = this.htmlResult;
  }

  add(x) {
    this.books.push(x);
    this.updateList();
  }

  remove(i) {
    this.books.splice(i, 1);
  }
}



