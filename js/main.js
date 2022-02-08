/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookList {
  constructor() {
    console.log(localStorage.getItem('books'));
    this.books = [];
    this.htmlResult = '';
    this.loaded = false;
    window.addEventListener('load', () => {
      this.loaded = true;
      const btnAdd = document.querySelector('.btnAdd');
      btnAdd.addEventListener('click', (e) => {
        e.preventDefault();
        const form = document.forms[0];
        const title = form.title.value;
        const author = form.author.value;
        this.add(new Book(title, author));
      });
      this.updateList();
    });
  }

  updateList() {
    if (!this.loaded) return;
    this.htmlResult = this.books.map((el) => `<li>
             <h6>"${el.title}"  by ${el.author} </h6>
             <button type="button">Remove</button>
      </li>`).join('');
    document.getElementById('books-list').innerHTML = this.htmlResult;
    document.getElementById('books-list').querySelectorAll('button').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.remove(i);
      });
    });
    localStorage.setItem('books', JSON.stringify(this.books.map((x) => ({ ...x }))));
  }

  load() {
    this.books = JSON.parse(localStorage.getItem('books') || '[]').map((x) => new Book(x.title, x.author));
    this.updateList();
  }

  add(x) {
    this.books.push(x);
    this.updateList();
  }

  remove(i) {
    this.books.splice(i, 1);
    this.updateList();
  }
}

const list = new BookList();
list.load();
