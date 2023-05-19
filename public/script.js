import logoImage from './images/icon_bookmark.png';

class Book {
    constructor(title, author, year, genre, language, format, status) {
        this.title = title;
        this.author = author;
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

bookArray.push(new Book('Jane Eyre', 'Charlotte Bronte', '1800', 'Classics', 'English', 'Paperback', 'Planning to read'));
bookArray.push(new Book('House of Leaves', 'Mark Z. Danielewski', '2000', 'Fiction', 'English', 'Hardback', 'Reading'));

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
console.log(bookArray);

bookArray.forEach(element => {
    console.log(element.author);
    console.log(element.year);
    console.log(element.id);

    let item = document.createElement('div');
    let thumbnail = new Image(150, 150);
    // image does not show up
    // not yet determined by genre, dimensions TBD
    // thumbnail.src = './images/icon_bookmark.png';
    thumbnail.src = logoImage;
    let information = document.createElement('p');

    information.innerHTML = `<p><strong>Title: ${element.title}</strong><br>Author: ${element.author}<br>Date added: ${element.date}</p>`;

    let delButton = document.createElement('button');
    delButton.textContent = 'Delete';

    item.appendChild(thumbnail);
    item.appendChild(information);
    item.appendChild(delButton);
    bookDisplay.appendChild(item);
});

// displays the form after the 'add book' button is clicked
// var openButton = document.getElementsByClassName('openForm');
var openButton = document.getElementById('addBookButton');
openButton.addEventListener('click', function() {
    console.log('opening form')
    document.getElementById('formContainer').style.display = "block";
})

// displays the form after the 'cancel' button is clicked 
// var closeButton = document.getElementsByClassName('closeForm');
var closeButton = document.getElementById('closeBookButton');
closeButton.addEventListener('click', function(event) {
    event.preventDefault(); // prevents page from refreshing when closing the form
    console.log('closing form')
    document.getElementById('formContainer').style.display = "none";
})