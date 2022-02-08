/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookList {
  constructor() {
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

class Navigator {
  constructor() {
    this.links = [];
    this.activeSection = '#list';
  }

  navigate(x) {
    const lastActiveSection = document.querySelector(this.activeSection);
    lastActiveSection.classList.remove('active');
    this.activeSection = x;
    const section = document.querySelector(x);
    section.classList.add('active');
  }

  initiate() {
    window.addEventListener('popstate', () => {
      this.links = Array.from(document.querySelectorAll('nav a '));
      this.links.filter((el) => el.href !== window.location.href).forEach((el) => {
        el.classList.remove('active');
      });
      this.links.filter((el) => el.href === window.location.href)[0].classList.add('active');
      this.navigate(window.location.hash);
    });
  }
}

const nav1 = new Navigator();
nav1.initiate();
const list = new BookList();
list.load();
