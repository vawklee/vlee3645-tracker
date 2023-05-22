import images from './images/thumbnails/*.jpg';
import icons from './images/icons/*.png';

class Book {
    constructor(title, author, year, genre, language, format, status, rating) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
        this.language = language;
        this.format = format;
        this.status = status;
        this.rating = rating;
        // cover image is provided based on the genre of the book entered
        // ID and Date are not provided by the user
        this.date = new Date().toDateString();
        this.id = Date.now(); // way of making ID is not perfect
    }
}

// the form for adding books
const form = document.getElementById('bookForm');
// the paragraph for displaying books in the tracking list 
var bookDisplay = document.getElementById('bookList'); 

function displayBooks() {
    bookDisplay.innerHTML = "";

    let localBooks = JSON.parse(localStorage.getItem('books'));

    // displaying each book added to the tracker, as long as they exist
    if (localBooks !== null) {
        localBooks.forEach(function(book) {
            // images set based on format of the book from a thumbnails folder
            let thumbnail = null;
            switch (book.format) {
                case 'audiobook':
                    thumbnail = images['audiobook']
                    break;
                case 'ebook':
                    thumbnail = images['ebook']
                    break;
                case 'hardcover':
                    thumbnail = images['hardcover']
                    break;
                case 'kindle':
                    thumbnail = images['kindle']
                    break;
                case 'manuscript':
                    thumbnail = images['manuscript']
                    break;
                case 'paperback':
                    thumbnail = images['paperback']
                    break;
                case 'photobook':
                    thumbnail = images['photobook']
                    break;
                default: 
                    break;
            }
            
            // creation of each item in the list 
            let item = document.createElement('div');
            item.setAttribute('data-id', book.id);

            let cover = new Image(250);
            cover.src = thumbnail;

            // creation of quick view information
            let information = document.createElement('p');
            information.innerHTML = `<p><strong>${book.title}</strong><br><br>Written by ${book.author}<br><br>${book.status}<br><br>Date added: ${book.date}</p>`;

            item.appendChild(cover);
            item.appendChild(information);
            bookDisplay.appendChild(item);

            form.reset();

            // creating a delete button to be attached to each item
            let delButton = document.createElement('a');
            let delIcon = new Image(50, 50);
            delIcon.src = icons['trash'];
            delButton.appendChild(delIcon);
            item.appendChild(delButton); // delete button is attached to each book item

            // not used in the list display, only used in the in-depth view of book information
            let closeButton = document.createElement('a');
            let closeIcon = new Image(50, 50);
            closeIcon.src = icons['close'];
            closeButton.appendChild(closeIcon);

            delButton.addEventListener('click', function() {
                // pop up to confirm the user's action, ensures no accidental deletes
                // deletes book from storage and displayed list
                if (confirm("Are you sure you want to delete this item?")) {
                    localBooks.forEach(function(arrayElement, arrayIndex) {
                        if (arrayElement.id == item.getAttribute('data-id')) {
                            localBooks.splice(arrayIndex, 1);
                        }
                    })
                    localStorage.setItem('books', JSON.stringify(localBooks));
                    item.remove();
                    document.getElementById('moreInformation').style.display = "none"; // ensures closing of in-depth view if book is deleted from there
                }
                // updates the # items button text (sidebar) based on the amount of books in the localBooks storage array
                if (localBooks.length == 1) {
                    document.getElementById('numItems').textContent = `${localBooks.length} item`;
                } else {
                    document.getElementById('numItems').textContent = `${localBooks.length} items`;
                }
            })

            // opens up a new in-depth view of the book if the item is clicked
            item.addEventListener('click', function() {
                console.log(`showing more information about ${book.title}`);
                var bookInfo = document.getElementById('moreInformation');
            
                bookInfo.style.display = "block";

                bookInfo.appendChild(closeButton);
                // bookInfo.appendChild(delButton);

                closeButton.addEventListener('click', function() {
                    bookInfo.style.display = "none";
                    console.log('closing in-depth view');
                })
            })
        })
    }
    
    // updates the # items button text (sidebar) based on the amount of books in the localBooks storage array
    if (localBooks.length == 1) {
        document.getElementById('numItems').textContent = `${localBooks.length} item`;
    } else {
        document.getElementById('numItems').textContent = `${localBooks.length} items`;
    }
}

// adds book to the tracker & creates a date and ID for the item
function addBook(title, author, year, genre, language, format, status, rating) {
    let book = {
        title,
        author,
        year,
        genre,
        language,
        format,
        status,
        rating,
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
            console.log(book);
        }
    }

    localStorage.setItem('books', JSON.stringify(localBooks));
    displayBooks();
}

// displays the form after the 'add book' button is clicked
var openButton = document.getElementById('addBookButton');
openButton.addEventListener('click', function() {
    // displays the form after the 'cancel' button is clicked 
    // var closeButton = document.getElementsByClassName('closeForm');
    var closeButton = document.getElementById('closeBookButton');
    closeButton.addEventListener('click', function(event) {
        event.preventDefault(); // prevents page from refreshing when closing the form
        console.log('closing form')
        document.getElementById('formContainer').style.display = "none";
        form.reset();
    })
    console.log('opening form')
    document.getElementById('formContainer').style.display = "block";
})

// adds book to the tracking list when the form is submitted
form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevents page from refreshing
    console.log(form.elements.title.value);

    // checks which radio button was selected for the book reading status, and assigns that value to a temporary variable
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
        form.elements.rating.value
    )

    form.reset();
    document.getElementById('formContainer').style.display = "none"; // closes the form once the book is added
})

displayBooks();