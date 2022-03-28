// Book Library
const myLibrary = [
    {title: 'Lord of the Rings', author: 'JRR Tolkien', pages: 3000, beenRead: true},
    {title: 'Game of Thrones', author: 'GRR Martin', pages: 2000, beenRead: false},
    {title: 'Lord of the Flies', author: 'William Goulding', pages: 300, beenRead: true},
    {title: 'Frankestein', author: 'Mary Shelly', pages: 400, beenRead: true},
    {title: '12 Rules for Life', author: 'Jordan Peterson', pages: 1000, beenRead: false},
    {title: 'I, Robot', author: 'Isaac Azimov', pages: 350, beenRead: true},
]

function Book(title, author, pages, beenRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.beenRead = beenRead
    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages long. ${this.beenRead ? 'Has been read' : 'Not read yet'} `
    }
}

// Function creates and returns Book card elements
function createBookCard() {
    let newBookCard = document.createElement('div');
    newBookCard.classList.add('book-card');

    let newBookTitle = document.createElement('h3');
    newBookTitle.classList.add('book-title');
    let newBookAuthor = document.createElement('p');
    newBookAuthor.classList.add('book-author');
    let newBookPages = document.createElement('p');
    newBookPages.classList.add('book-pages');
    let newBookBeenRead = document.createElement('p');
    newBookBeenRead.classList.add('been-read');

    // Card Buttons
    let newBtnsDiv = document.createElement('div')
    newBtnsDiv.classList.add('book-btns');
    let newToogleBeenReadBtn = document.createElement('button')
    newToogleBeenReadBtn.classList.add('toggle-read-status');
    let newDeleteBtn = document.createElement('button')
    newDeleteBtn.classList.add('delete-book');
    newBtnsDiv.appendChild(newToogleBeenReadBtn);
    newBtnsDiv.appendChild(newDeleteBtn);

    newBookCard.appendChild(newBookTitle)
    newBookCard.appendChild(newBookAuthor)
    newBookCard.appendChild(newBookPages)
    newBookCard.appendChild(newBookBeenRead)
    newBookCard.appendChild(newBtnsDiv)

    return newBookCard
}

// Set initial books