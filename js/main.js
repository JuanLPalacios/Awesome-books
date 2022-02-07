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

  let newBooks  = JSON.stringify(books);
  localStorage.setItem('books',newBooks);

  document.getElementById('books-list').querySelectorAll('button').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      // here is the remove logic
       books = books.filter((book, k) => i !== k);
       updateList();
    });
  });
}

window.addEventListener('load', () => {
  let newBooks2 = localStorage.getItem('books');

  books = JSON.parse(newBooks2);
  updateList();
  var btnAdd = document.querySelector('.btnAdd');
  btnAdd.addEventListener("click", (e) => {
    e.preventDefault();
    var form = document.getElementById("form");
    var title = form.title.value;
    var author = form.author.value;
    var book = { title, author };
    books.push(book);
    updateList();
  });
});
