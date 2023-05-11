class Book {
    constructor(title, name, year, genre, language, format, status) {
        this.title = title;
        this.name = name;
        this.year = year;
        this.genre = genre;
        this.language = language;
        this.format = format;
        this.status = status;
        // cover image is provided based on the genre of the book entered
        // ID and Date are not provided by the user
        this.date = new Date().toDateString();
        this.id = Date.now(); // way of making ID is not perfect
    }

    displayInformation() {
        console.log(this.title);
        console.log(this.status);
    }
}

var bookArray = [];

// var novel = new Book('jane eyre', 'Charlotte', 'Bronte', '1800', 'Classics', 'English', 'Paperback', 'Planning to read', '2');
// pushing test book to the array for display

bookArray.push(new Book('Jane Eyre', 'Charlotte Bronte', '1800', 'Classics', 'English', 'Paperback', 'Planning to read'));
bookArray.push(new Book('House of Leaves', 'Mark Z. Danielewski', '2000', 'Fiction', 'English', 'Hardback', 'Reading'));

// just checking that button click listener is working
var btn = document.getElementById('button');
btn.addEventListener("click", function() {
    console.log('button has been clicked');
});

// changing <p> to display the contents of the bookArray ???
var bookDisplay = document.getElementById('bookList');
// bookDisplay.textContent = `Book Array: ${bookArray[0]}`;
// console.log(bookArray[0]);
// console.log(bookArray[0].title);

// updates the # items button text (sidebar) based on the amount of books in the book array
if (bookArray.length == 1) {
    document.getElementById('numItems').textContent = `${bookArray.length} item`;
} else {
    document.getElementById('numItems').textContent = `${bookArray.length} items`;
}

bookArray.forEach(element => {
    console.log(element.name);
    console.log(element.year);
    console.log(element.id);

    let item = document.createElement('li');
    let thumbnail = new Image(250, 250);
    // not yet determined by genre, dimensions TBD
    thumbnail.src = './images/logo_book.png';

    item.innerHTML = `<p><strong>Title: ${element.title}</strong><br>Author: ${element.name}<br>Date added: ${element.date}</p>`;

    let delButton = document.createElement('button');
    delButton.textContent = 'Delete';

    item.appendChild(thumbnail);
    item.appendChild(delButton);
    bookDisplay.appendChild(item);
});