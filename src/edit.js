import { initializeEditPage, getLastEditedTime } from './views'
import { updateNote, removeNote } from './notes'

const noteTitleElement = document.querySelector('#note-title')
const noteBodyElement = document.querySelector('#note-body')
const removeButton = document.querySelector('#remove-note')
const noteEditedElement = document.querySelector('#note-edited')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

noteTitleElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })

    noteEditedElement.textContent = getLastEditedTime(note.updatedAt)
})

noteBodyElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })

    noteEditedElement.textContent = getLastEditedTime(note.updatedAt)
})

removeButton.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})