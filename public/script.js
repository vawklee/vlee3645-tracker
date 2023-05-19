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
}

var form = document.getElementById('bookForm'); // the form for adding books
var bookDisplay = document.getElementById('bookList'); // the p for displaying books in the tracking list  

// functionality for when a form is submitted
form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevents page from refreshing
    console.log(form.elements.title.value);

    let statusValue = "";
    if (form.elements.planning.checked) {
        statusValue = form.elements.planning.value;
    } else if (form.elements.reading.checked) {
        statusValue = form.elements.reading.value;
    } else if (form.elements.completed.checked) {
        statusValue = form.elements.completed.value;
    } else {
        statusValue = "Not Available";
    }

    addBook(
        form.elements.title.value,
        form.elements.author.value,
        form.elements.year.value,
        form.elements.genre.value,
        form.elements.language.value,
        form.elements.format.value,
        statusValue,
    )

    console.log(bookArray);
})

function displayBooks() {
    bookDisplay.innerHTML = "";

    let localBooks = JSON.parse(localStorage.getItem('books'));

    if (localBooks !== null) {
        localBooks.forEach(function(task) {
            let item = document.createElement('div');
            item.setAttribute('data-id', book-id);
            
            //TEMPORARY METHOD FOR IMAGES
            let thumbnail = new Image(150, 150);
            thumbnail.src = logoImage;

            let information = document.createElement('p');
            information.innerHTML = `<p><strong>Title: ${element.title}</strong><br>Author: ${element.author}<br>Date added: ${element.date}</p>`;

            item.appendChild(thumbnail);
            item.appendChild(information);
            bookDisplay.appendChild(item);

            form.reset();

            let delButton = document.createElement('button');
        })
    }
}

var bookArray = [];

// displaying the information for each book in the book array
/*bookArray.forEach(element => {
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
});*/

function addBook(title, author, year, genre, language, format, status) {
    let book = {
        title,
        author,
        year,
        genre,
        language,
        format,
        status,
        date: new Date().toDateString(),
        id: Date.now()
    }

    let localBooks = JSON.parse(localStorage.getItem('books'));

    if (localBooks == null) {
        localBooks = [book];
    } else {
        if (localBooks.find(element => element.id === task.id)) {
            console.log("Book ID already exists");
        } else {
            localBooks.push(book);
        }
    }

    localStorage.setItem('books', JSON.stringify(localBooks));
    displayBooks();
}

// testing if addBook() works
addBook('Jane Eyre', 'Charlotte Bronte', 1800, 'Classics', 'English', 'Paperback', 'Completed');

// bookArray.push(new Book('Jane Eyre', 'Charlotte Bronte', '1800', 'Classics', 'English', 'Paperback', 'Planning to read'));
// bookArray.push(new Book('House of Leaves', 'Mark Z. Danielewski', '2000', 'Fiction', 'English', 'Hardback', 'Reading'));

// updates the # items button text (sidebar) based on the amount of books in the book array
if (bookArray.length == 1) {
    document.getElementById('numItems').textContent = `${bookArray.length} item`;
} else {
    document.getElementById('numItems').textContent = `${bookArray.length} items`;
}

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