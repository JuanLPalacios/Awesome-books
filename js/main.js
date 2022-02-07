let books = [
  { title: 'Lorem', author: 'someone' },
  { title: 'Lorem2', author: 'someone' },
  { title: 'Lorem3', author: 'someone' },
];

function updateList() {
  document.getElementById('books-list').innerHTML = books.map(
    (x) => `<li>
          ${x.title}
          <ul>
              <li>${x.author}</li>
              <li><button type="button">Remove</button></li>
          </ul>
      </li>`,
  ).join('');

  const newBooks = JSON.stringify(books);
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
    const form = document.getElementById('form');
    const title = form.title.value;
    const author = form.author.value;
    const book = { title, author };
    books.push(book);
    updateList();
  });
});
