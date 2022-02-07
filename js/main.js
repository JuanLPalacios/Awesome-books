const books = [
  { title: 'Lorem', author: 'someone' },
  { title: 'Lorem2', author: 'someone' },
  { title: 'Lorem3', author: 'someone' },
];

function updateList() {
  document.getElementById('books-list').innerHTML = books.map(
    (x) => `<li>
          ${x.title}
          <ul>
              <li>${x.title.author}</li>
              <li><button type="button">Remove</button></li>
          </ul>
      </li>`,
  ).join('');
  document.getElementById('books-list').querySelectorAll('butons').forEach((btn) => {
    btn.addEventListener('click', () => {
      // here is the remove logic
    });
  });
}

window.addEventListener('load', () => {
  updateList();
});