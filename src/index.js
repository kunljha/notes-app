import { createNote } from './notes'
import { setFilters } from './filters'
import { renderNotes } from './views'

renderNotes()

// event-listener for creating notes
document.querySelector('#create-note').addEventListener('click', () => {
	const id = createNote()
	location.assign(`./edit.html#${id}`)
})

// event-listener for searching notes
document.querySelector('#search-note').addEventListener('input', (e) => {
	setFilters({
		searchText: e.target.value,
	})
	renderNotes()
})

// event-listener for sorting notes
document.querySelector('#filter-by').addEventListener('change', (e) => {
	setFilters({
		sortBy: e.target.value,
	})
	renderNotes()
})

window.addEventListener('storage', (e) => {
	if (e.key === 'notes') {
		// notes = JSON.parse(e.newValue)
		renderNotes()
	}
})
