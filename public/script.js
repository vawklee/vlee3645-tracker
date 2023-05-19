// import logoImage from './images/icon_bookmark.png';
import images from './images/thumbnails/*.jpg';
console.log(images);

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

function displayBooks() {
    bookDisplay.innerHTML = "";

    let localBooks = JSON.parse(localStorage.getItem('books'));
    console.log(localBooks);
    console.log(localBooks.length);

    if (localBooks !== null) {
        localBooks.forEach(function(book) {
            // images set based on format of the book from a thumbnails folder
            let thumbnail = null;
            switch (book.format) {
                case 'audiobook':
                    thumbnail = images['katze-musik-hoerer']
                    break;
                case 'ebook':
                    thumbnail = images['katze-musik-hoerer']
                    break;
                case 'hardcover':
                    thumbnail = images['katze-musik-hoerer']
                    break;
                case 'kindle':
                    thumbnail = images['lucian-roman']
                    break;
                case 'manuscript':
                    thumbnail = images['lucian-roman']
                    break;
                case 'paperback':
                    thumbnail = images['lucian-roman']
                    break;
                case 'photobook':
                    thumbnail = images['lucian-roman']
                    break;
                default: 
                    break;
            }
            
            let item = document.createElement('div');
            item.setAttribute('data-id', book.id);
            
            //TEMPORARY METHOD FOR IMAGES
            // let thumbnail = new Image(150, 150);
            // thumbnail.src = logoImage;

            let information = document.createElement('p');
            information.innerHTML = `<p><img src=${thumbnail} width='150'><strong>Title: ${book.title}</strong><br>Author: ${book.author}<br>Date added: ${book.date}</p>`;

            // item.appendChild(thumbnail);
            item.appendChild(information);
            bookDisplay.appendChild(item);

            // form.reset(); // WHY IS THIS NOT WORKING

            let delButton = document.createElement('button');
            let delButtonText = document.createTextNode('Delete');
            delButton.appendChild(delButtonText);
            item.appendChild(delButton); // delete button is attached to each book item

            delButton.addEventListener('click', function(event) {
                localBooks.forEach(function(arrayElement, arrayIndex) {
                    if (arrayElement.id == item.getAttribute('data-id')) {
                        localBooks.splice(arrayIndex, 1);
                    }
                })

                localStorage.setItem('books', JSON.stringify(localBooks));

                item.remove();

                if (localBooks.length == 1) {
                    document.getElementById('numItems').textContent = `${localBooks.length} item`;
                } else {
                    document.getElementById('numItems').textContent = `${localBooks.length} items`;
                }
            })
        })
    }
}

var bookArray = [];

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
        if (localBooks.find(element => element.id === book.id)) {
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

// updates the # items button text (sidebar) based on the amount of books in the localBooks storage array
let localBooks = JSON.parse(localStorage.getItem('books'));
if (localBooks.length == 1) {
    document.getElementById('numItems').textContent = `${localBooks.length} item`;
} else {
    document.getElementById('numItems').textContent = `${localBooks.length} items`;
}

// displays the form after the 'add book' button is clicked
// var openButton = document.getElementsByClassName('openForm');
var openButton = document.getElementById('addBookButton');
openButton.addEventListener('click', function() {
    // displays the form after the 'cancel' button is clicked 
    // var closeButton = document.getElementsByClassName('closeForm');
    var closeButton = document.getElementById('closeBookButton');
    closeButton.addEventListener('click', function(event) {
        event.preventDefault(); // prevents page from refreshing when closing the form
        console.log('closing form')
        document.getElementById('formContainer').style.display = "none";
    })
    
    console.log('opening form')
    document.getElementById('formContainer').style.display = "block";
})

// let submitButton = document.getElementById('submitButton');
// submitButton.addEventListener('click', function(event) {
//     console.log('submit button was clicked');
//     event.preventDefault();
// })

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
})