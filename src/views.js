import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes } from './notes'

// DOM structure for a note
const generateNoteDOM = (note) => {
	const noteEl = document.createElement('a')
	const textEl = document.createElement('p')
	const statusEl = document.createElement('p')

	// setup the note title text
	if (note.title.length > 0) {
		textEl.textContent = note.title
	} else {
		textEl.textContent = 'Untitled Note'
	}
	textEl.classList.add('list-item__title')
	noteEl.appendChild(textEl)

	// setup last edited message
	statusEl.textContent = lastEditedMessage(note.updatedAt)
	statusEl.classList.add('list-item__subtitle')
	noteEl.appendChild(statusEl)

	noteEl.setAttribute('href', `./edit.html#${note.id}`)
	noteEl.classList.add('list-item')

	return noteEl
}

// generate last-edited message
const lastEditedText = (timestamp) =>
	`Last edited ${moment(timestamp).fromNow()}`

// Rendering application Notes
const renderNotes = () => {
	const notesEl = document.querySelector('#notes')
	const filters = getFilters()
	const notes = sortNotes(filters.sortBy)

	const filteredNotes = notes.filter((note) =>
		note.title.toLowerCase().includes(filters.searchText.toLowerCase())
	)

	notesEl.innerHTML = ''
	if (filteredNotes.length > 0) {
		filteredNotes.forEach((note) => {
			const noteEl = generateNoteDOM(note)
			notesEl.appendChild(noteEl)
		})
	} else {
		const emptyMessage = document.createElement('p')
		emptyMessage.textContent = 'No notes to show.'
		emptyMessage.classList.add('empty-message', 'list-item')
		notesEl.appendChild(emptyMessage)
	}
}

export { generateNoteDOM, lastEditedText, renderNotes }
