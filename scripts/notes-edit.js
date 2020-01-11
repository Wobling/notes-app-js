'use strict'

const noteId = location.hash.substring(1)
const noteTitleElement = document.querySelector('#note-title')
const noteBodyElement = document.querySelector('#note-body')
const noteEditedElement = document.querySelector('#note-edited')

let notes = getSavedNotes()

let note = notes.find((note) => note.id === noteId)

if (!note) {
    location.assign('/index.html')
}

noteTitleElement.value = note.title
noteBodyElement.value = note.body
noteEditedElement.textContent = getLastEditedTime(note)

noteTitleElement.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    noteEditedElement.textContent = getLastEditedTime(note)
    saveNotes(notes)
})

noteBodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    noteEditedElement.textContent = getLastEditedTime(note)
    saveNotes(notes)
})

const removeButton = document.querySelector('#remove-note')
removeButton.addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)

        note = notes.find((note) => note.id === noteId)
        
        if (!note) {
            location.assign('/index.html')
        }
        
        noteTitleElement.value = note.title
        noteBodyElement.value = note.body
        noteEditedElement.textContent = getLastEditedTime(note.updatedAt)
    }
})