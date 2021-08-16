import { removeNote, updateNote } from './notes'
import { lastEditedText, initializeEditPage } from './views'

const titleEl = document.querySelector('#note-title')
const bodyEl = document.querySelector('#note-body')
const removeButton = document.querySelector('#remove-note')
const lastEditedEl = document.querySelector('#last-edited-text')

const noteId = location.hash.substring(1)
initializeEditPage(noteId)

// event-listener on note-title element
titleEl.addEventListener('input', (e) => {
	const note = updateNote(noteId, {
		title: e.target.value,
	})
	lastEditedEl.textContent = lastEditedText(note.updatedAt)
})

// event-listener on note-body element
bodyEl.addEventListener('input', (e) => {
	const note = updateNote(noteId, {
		body: e.target.value,
	})
	lastEditedEl.textContent = lastEditedText(note.updatedAt)
})

// event-listener on remove button
removeButton.addEventListener('click', () => {
	removeNote(noteId)
	location.assign('./index.html')
})

document.querySelector('#home-page').addEventListener('click', () => {
	location.assign('./index.html')
})

window.addEventListener('storage', (e) => {
	if (e.key === 'notes') {
		// notes = JSON.parse(e.newValue)
		initializeEditPage(noteId)
	}
})
