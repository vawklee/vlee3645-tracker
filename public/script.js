class Book {
    constructor(title, firstName, lastName, year, genre, language, format, status, completion, rating, cover) {
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.year = year;
        this.genre = genre;
        this.language = language;
        this.format = format;
        this.status = status;
        this.completion = completion;
        this.rating = rating;
        this.cover = cover;
        // ID and Date are not provided by the user
        this.id = Date.now();
        this.date = new Date().toISOString();
    }
}

var bookList = [];

btn = document.getElementById('button');
btn.addEventListener("click", function() {
    console.log('button has been clicked');
});