////// Book Library //////
const myLibrary = [
    {title: 'Lord of the Rings', author: 'JRR Tolkien', pages: 3000, beenRead: true},
    {title: 'A song of Ice and Fire', author: 'GRR Martin', pages: 2000, beenRead: false},
    {title: 'Lord of the Flies', author: 'William Goulding', pages: 300, beenRead: true},
    {title: 'Frankestein', author: 'Mary Shelly', pages: 400, beenRead: true},
    {title: '12 Rules for Life', author: 'Jordan Peterson', pages: 1000, beenRead: false},
    {title: 'I, Robot', author: 'Isaac Azimov', pages: 350, beenRead: true},
]

// Function creates and returns Book card elements.
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
    newToogleBeenReadBtn.textContent = 'Has been read?';
    let newDeleteBtn = document.createElement('button')
    newDeleteBtn.classList.add('delete-book');
    newDeleteBtn.textContent = 'Delete';
    newBtnsDiv.appendChild(newToogleBeenReadBtn);
    newBtnsDiv.appendChild(newDeleteBtn);

    newBookCard.appendChild(newBookTitle)
    newBookCard.appendChild(newBookAuthor)
    newBookCard.appendChild(newBookPages)
    newBookCard.appendChild(newBookBeenRead)
    newBookCard.appendChild(newBtnsDiv)

    return [newBookCard, newBookTitle, newBookAuthor, newBookPages, newBookBeenRead]
}

// Function sets content for newly created Book Card.
function setBookCardContent(bookInfo) {
    newBookCardElements = createBookCard()

    newBookCardElements[1].textContent = bookInfo.title
    newBookCardElements[2].textContent = bookInfo.author
    newBookCardElements[3].textContent = bookInfo.pages + ' pages'
    if (bookInfo.beenRead) {
        newBookCardElements[4].textContent = 'Book read: ✓'
    } else {
        newBookCardElements[4].textContent = 'Book read: ✕'
    }

    return newBookCardElements[0]
}

const bookShelf = document.getElementById('book-shelf')

// Function sets book from myLibrary to Book Shelf
function setBookShelf() {
    for (let i = 0; i < myLibrary.length; i++) {
        let bookCard = setBookCardContent(myLibrary[i])
        bookShelf.appendChild(bookCard)
    }
}

// Set initial books
setBookShelf()

function clearBookShelf() {
    bookShelf.innerHTML = ''
}

function refreshBookShelf(){
    clearBookShelf()
    setBookShelf()
}

//////// Add new book /////////
const newBookBtn = document.getElementById('add-book-btn')
const newBookForm = document.getElementById('newBookForm')
const newBookTitle = document.getElementById('newBookTitle')
const newBookAuthor = document.getElementById('newBookAuthor')
const newBookPages = document.getElementById('newBookPages')
const newBookBeenRead = document.getElementById('has-been-read-checkbox')
const submitNewBookBtn = document.getElementById('submit-new-book')
const cancelNewBookBtn = document.getElementById('cancel-new-book')

newBookBtn.addEventListener('click', () => {
    toggleNewBookForm()
})

function toggleNewBookForm() {
    if (newBookForm.classList.contains('hide-new-book-form')) {
        newBookForm.classList.remove('hide-new-book-form')
    } else {
        newBookForm.classList.add('hide-new-book-form')
    }
    refreshForm()
}

submitNewBookBtn.addEventListener('click', createNewBook)
cancelNewBookBtn.addEventListener('click', toggleNewBookForm)

// Function cretes new Book object and appends it to library
function createNewBook() {
    if (newBookTitle.value && newBookAuthor.value && newBookPages.value) {
        let createdBook = new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookBeenRead.checked)
        myLibrary.push(createdBook)
        refreshBookShelf()
        toggleNewBookForm()
    }
}

function refreshForm() {
    newBookTitle.value = ''
    newBookAuthor.value = ''
    newBookPages.value = ''
    newBookBeenRead.checked = false
}

function Book(title, author, pages, beenRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.beenRead = beenRead
    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages long. ${this.beenRead ? 'Has been read' : 'Not read yet'} `
    }
}