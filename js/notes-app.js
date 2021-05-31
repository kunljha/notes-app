'use strict';

let notes = getSavedNotes(); // initial notes array from localStorage

// filters
const filters = {
	searchText: '',
	sortBy: 'byEdited',
};

renderNotes(notes, filters);

// event-listener for searching notes
document.querySelector('#search-note').addEventListener('input', (e) => {
	filters.searchText = e.target.value;
	renderNotes(notes, filters);
});

// event-listener for sorting notes
document.querySelector('#filter-by').addEventListener('change', (e) => {
	filters.sortBy = e.target.value;
	renderNotes(notes, filters);
});

// event-listener for creating notes
document.querySelector('#create-note').addEventListener('click', () => {
	const id = uuidv4();
	const timestamp = moment().valueOf();

	notes.push({
		id: id,
		createdAt: timestamp,
		updatedAt: timestamp,
		title: '',
		body: '',
	});
	saveNotes(notes);
	location.assign(`./edit.html#${id}`);
});

window.addEventListener('storage', (e) => {
	if (e.key === 'notes') {
		notes = JSON.parse(e.newValue);
		renderNotes(notes, filters);
	}
});
