class Book {
    constructor(title, firstName, lastName, year, genre, language, format, status, rating) {
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.year = year;
        this.genre = genre;
        this.language = language;
        this.format = format;
        this.status = status;
        this.rating = rating;
        // cover image is provided based on the genre of the book entered
        // this.cover = cover;
        // ID and Date are not provided by the user
        this.id = Date.now();
        this.date = new Date().toISOString();
    }

    getInformation() {
        console.log(this.title);
        console.log(this.status);
    }
}

var bookArray = [];

// var novel = new Book('jane eyre', 'Charlotte', 'Bronte', '1800', 'Classics', 'English', 'Paperback', 'Planning to read', '2');
bookArray.push(new Book('jane eyre', 'Charlotte', 'Bronte', '1800', 'Classics', 'English', 'Paperback', 'Planning to read', '2'));

var btn = document.getElementById('button');
btn.addEventListener("click", function() {
    console.log('button has been clicked');
});

var bookDisplay = document.getElementById('bookList');
bookDisplay.textContent = `${bookArray[0]}`;
console.log(bookArray[0]);
console.log(bookArray[0].title);

//updates the # items header based on the length of the books array
document.getElementById('numItems').textContent = `There are ${bookArray.length} items being tracked`;