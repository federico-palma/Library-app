////// Handle Theme change //////
const root = document.documentElement;
root.className = localStorage.getItem('currentTheme') ? localStorage.getItem('currentTheme') : 'light-theme';

const changeThemeButton = document.getElementById('changeThemeBtn')
changeThemeButton.addEventListener('click', setTheme)

function setTheme() {
    const newTheme = root.className === 'light-theme' ? 'dark-theme' : 'light-theme';
    root.className = newTheme;
    saveThemetoLocalStorage()
}

// Handle local Storage
function saveLibraryToLocalStorage() {
    let stringifiedLibrary = JSON.stringify(myLibrary)
    localStorage.setItem('bookLibrary', stringifiedLibrary)
}

function retrieveSavedLibrary() {
    if (localStorage.getItem('bookLibrary')) {
        let stringifiedLibrary = localStorage.getItem('bookLibrary')
        let parsedLibrary = JSON.parse(stringifiedLibrary)
        myLibrary = parsedLibrary 
    }
}

function saveThemetoLocalStorage() {
    localStorage.setItem('currentTheme', root.className)
}

////// Book Library //////
let myLibrary = []

// Handle warning message
const warningMessage = document.getElementById('warning-message')

function showWarningMessage() {
    warningMessage.style.visibility = 'visible'
}

function hideWarningMessage() {
    warningMessage.style.visibility = 'hidden'
}

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

    newToogleBeenReadBtn.addEventListener('click', changeBeenReadStatus)
    newDeleteBtn.addEventListener('click', deleteBook)

    newBookCard.appendChild(newBookTitle)
    newBookCard.appendChild(newBookAuthor)
    newBookCard.appendChild(newBookPages)
    newBookCard.appendChild(newBookBeenRead)
    newBookCard.appendChild(newBtnsDiv)

    return [newBookCard, newBookTitle, newBookAuthor, newBookPages, newBookBeenRead]
}

// Function sets content for newly created Book Card.
function setBookCardContent(bookInfo, bookIndex) {
    newBookCardElements = createBookCard()

    newBookCardElements[0].setAttribute('bookindex', bookIndex)
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

// Functions for card buttons
function changeBeenReadStatus() {
    let bookIndex = this.parentNode.parentNode.getAttribute('bookindex')
    myLibrary[bookIndex].beenRead = !myLibrary[bookIndex].beenRead
    saveLibraryToLocalStorage()
    refreshBookShelf()
}

function deleteBook() {
    let bookIndex = this.parentNode.parentNode.getAttribute('bookindex')

    if (confirm(`Are you sure you want to delete the book: ${myLibrary[bookIndex].title}?`)) {
        myLibrary.splice(bookIndex, 1)
        saveLibraryToLocalStorage()
        refreshBookShelf()
    }
}

// Function sets book from myLibrary to Book Shelf
const bookShelf = document.getElementById('book-shelf')

function setBookShelf() {
    if (myLibrary.length > 0) {
        hideWarningMessage()
        for (let i = 0; i < myLibrary.length; i++) {
            let bookCard = setBookCardContent(myLibrary[i], i)
            bookShelf.appendChild(bookCard)
        }
    } else {
        showWarningMessage()
    }
}

function clearBookShelf() {
    bookShelf.innerHTML = ''
}

function refreshBookShelf(){
    clearBookShelf()
    setBookShelf()
}

// Set initial books
retrieveSavedLibrary()
setBookShelf()

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
        refreshForm()
        newBookForm.classList.remove('hide-new-book-form')
    } else {
        newBookForm.classList.add('hide-new-book-form')
    }
}

submitNewBookBtn.addEventListener('click', createNewBook)
cancelNewBookBtn.addEventListener('click', toggleNewBookForm)

// Function cretes new Book object and appends it to library
function createNewBook() {
    if (newBookTitle.value && newBookAuthor.value && newBookPages.value) {
        let createdBook = new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookBeenRead.checked)
        myLibrary.push(createdBook)
        toggleNewBookForm()
        saveLibraryToLocalStorage()
        refreshBookShelf()
    }
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

function refreshForm() {
    newBookTitle.value = ''
    newBookAuthor.value = ''
    newBookPages.value = ''
    newBookBeenRead.checked = false
}
