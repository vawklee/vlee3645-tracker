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
            let thumbnailSrc = null;
            let altText = "";
            switch (book.format) {
                case 'Audiobook':
                    thumbnailSrc = images['audiobook']
                    altText = "A white phone with earphones on a brown background";
                    break;
                case 'E-book':
                    thumbnailSrc = images['ebook']
                    altText = "A black iPhone on a black leatherbound book rests on a wooden table";
                    break;
                case 'Hardcover':
                    thumbnailSrc = images['hardcover']
                    altText = "A large grey book infront of a pink background";
                    break;
                case 'Kindle':
                    thumbnailSrc = images['kindle']
                    altText = "An Amazon Kindle on a white background";
                    break;
                case 'Manuscript':
                    thumbnailSrc = images['manuscript']
                    altText = "A tall stack of papers with yellow sticky notes";
                    break;
                case 'Paperback':
                    thumbnailSrc = images['paperback']
                    altText = "A novel spread open on a white tablecloth with a coffee cup above";
                    break;
                case 'Photobook':
                    thumbnailSrc = images['photobook']
                    altText = "A hand turning the page of a magazine with pictures";
                    break;
                default: 
                    break;
            }
            
            // creation of each item in the list 
            let item = document.createElement('div');
            item.setAttribute('data-id', book.id);

            let cover = new Image(250);
            cover.src = thumbnailSrc;
            cover.alt = altText;

            // creation of quick view information
            let information = document.createElement('p');
            information.innerHTML = `<p><strong>${book.title}</strong><br><br>Written by ${book.author}<br><br>${book.status}<br><br>Date added: ${book.date}</p>`;

            item.appendChild(cover);
            item.appendChild(information);
            bookDisplay.appendChild(item);

            form.reset();

            let viewButton = document.createElement('a');
            let viewIcon = new Image();
            viewIcon.src = icons['view'];
            viewIcon.height = 50;
            viewButton.appendChild(viewIcon);
            item.appendChild(viewButton);

            // creating a delete button to be attached to each item
            let delButton = document.createElement('a');
            let delIcon = new Image(50, 50);
            delIcon.src = icons['trash'];
            delButton.appendChild(delIcon);
            item.appendChild(delButton); // delete button is attached to each book item

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

            // opens up a new in-depth view of the book if the view item button is clicked
            viewButton.addEventListener('click', function() {
                console.log(`showing more information about ${book.title}`);
                var bookInfo = document.getElementById('moreInformation');
                bookInfo.style.display = "flex";
                document.getElementById('backgroundBlur').style.display = "block"; // ensures the background blur shows up
                document.getElementById('bookDescription').style.display = "block"; // ensures that information shows up, having issues with it staying visible when it shouldn't
                document.getElementById('closeViewButton').style.display = "block"; // ensures that the close button shows up, having issues with it staying visible when it shouldn't

                // assigning the same thumbnail cover from the item
                let largeThumbnail = document.getElementById('viewThumbnail');
                largeThumbnail.src = thumbnailSrc;
                largeThumbnail.height = 500;

                // &#11088; HTML code for the yellow star emoji
                // &#11089; HTML code for the small black star
                let ratingStars = "";

                switch (book.rating) {
                    case "0":
                        ratingStars = "⭑ ⭑ ⭑ ⭑ ⭑";
                        break;
                    case "1":
                        ratingStars = "⭐ ⭑ ⭑ ⭑ ⭑";
                        break;
                    case "2":
                        ratingStars = "⭐ ⭐ ⭑ ⭑ ⭑";
                        break;
                    case "3":
                        ratingStars = "⭐ ⭐ ⭐ ⭑ ⭑";
                        break;
                    case "4":
                        ratingStars = "⭐ ⭐ ⭐ ⭐ ⭑";
                        break;
                    case "5":
                        ratingStars = "⭐ ⭐ ⭐ ⭐ ⭐";
                        break;
                    default:
                        ratingStars = "Not Available";
                        break;
                }

                let deepInfo = document.getElementById('bookDescription');
                deepInfo.innerHTML = `<p>
                <strong>Title:</strong> ${book.title}<br><br>
                <strong>Author:</strong> ${book.author}<br><br>
                <strong>Publication year:</strong> ${book.year}<br><br>
                <strong>Genre:</strong> ${book.genre}<br><br>
                <strong>Language:</strong> ${book.language}<br><br>
                <strong>Format:</strong> ${book.format}<br><br>
                <strong>Status:</strong> ${book.status}<br><br>
                <strong>Rating:</strong> ${ratingStars}
                </p>`;

                let closeView = document.getElementById('closeViewButton');
                closeView.addEventListener('click', function(event) {
                    event.preventDefault();
                    bookInfo.style.display = "none";
                    document.getElementById('backgroundBlur').style.display = "none"; // ensures the background blur disappears
                    document.getElementById('bookDescription').style.display = "none"; // ensures that the in-depth information disappears
                    document.getElementById('closeViewButton').style.display = "none"; // ensures that the close button disappears, having issues with it staying visible
                })
            })
        })
    } else {
        console.log('book tracker is empty');

        // creation of welcome message to get users started
        let item = document.createElement('div');
        let information = document.createElement('p');
        information.innerHTML = `<p>Welcome to bookMarker!<br><br>To get started, click the red button in the bottom right corner of the page</p>`;

        item.appendChild(information);
        bookDisplay.appendChild(item);
        item.style.fontSize = "x-large";
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
    var closeButton = document.getElementById('closeBookButton');
    closeButton.addEventListener('click', function(event) {
        event.preventDefault(); // prevents page from refreshing when closing the form
        document.getElementById('formContainer').style.display = "none";
        document.getElementById('backgroundBlur').style.display = "none"; // makes the background blur disappear
        
        // switching colours of the tabs back to default
        document.getElementById('addTab').style.backgroundColor = "#BD4E4E";
        document.getElementById('numItems').style.backgroundColor = "#FCF8F4";
        form.reset();
    })
    document.getElementById('formContainer').style.display = "block";
    document.getElementById('backgroundBlur').style.display = "block"; // makes the background blur appear when the user is using the form

    // switching colours of the sidebar tabs to indicate what action is active
    document.getElementById('addTab').style.backgroundColor = "#FCF8F4";
    document.getElementById('numItems').style.backgroundColor = "#BD4E4E";
})

// adds book to the tracking list when the form is submitted
form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevents page from refreshing

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
    document.getElementById('backgroundBlur').style.display = "none"; // makes the background blur disappear
    // switching colours of the tabs back to default
    document.getElementById('addTab').style.backgroundColor = "#BD4E4E";
    document.getElementById('numItems').style.backgroundColor = "#FCF8F4";
})

displayBooks();