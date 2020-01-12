import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

const generateNoteDOM = (note) => {
    const noteElement = document.createElement('a')
    const textElement = document.createElement('p')
    const statusElement = document.createElement('p')

    if (note.title.length > 0) {
        textElement.textContent = note.title
    } else {
        textElement.textContent = 'Unnamed note'
    }

    textElement.classList.add('list-item__title')
    noteElement.appendChild(textElement)
    noteElement.setAttribute('href', `/edit.html#${note.id}`)
    noteElement.classList.add('list-item')

    statusElement.textContent = getLastEditedTime(note.updatedAt)
    noteElement.appendChild(statusElement)
    statusElement.classList.add('list-item__subtitle')

    return noteElement
}

const renderNotes = () => {
    const notesElement = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesElement.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteElement = generateNoteDOM(note)
            notesElement.appendChild(noteElement)
        })
    } else {
        const paragraphElement = document.createElement('p')
        paragraphElement.textContent = 'No notes, add one to get started'
        paragraphElement.classList.add('empty-message')
        notesElement.appendChild(paragraphElement)
    }
}

const initializeEditPage = (noteId) => {

    const noteTitleElement = document.querySelector('#note-title')
    const noteBodyElement = document.querySelector('#note-body')
    const noteEditedElement = document.querySelector('#note-edited')

    const notes = getNotes() 
    const note = notes.find((note) => note.id === noteId)
    
    if (!note) {
        location.assign('/index.html')
    }
    
    noteTitleElement.value = note.title
    noteBodyElement.value = note.body
    noteEditedElement.textContent = getLastEditedTime(note.updatedAt)
}

const getLastEditedTime = (updatedAt) => `Last Edited ${moment(updatedAt).fromNow()}`

export { generateNoteDOM, renderNotes, getLastEditedTime, initializeEditPage }