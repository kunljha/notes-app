'use strict';

// Read existing notes from localStorage
const getSavedNotes = () => {
	const notesJSON = localStorage.getItem('notes');
	try {
		return notesJSON ? JSON.parse(notesJSON) : [];
	} catch (e) {
		return [];
	}
};

// Saving and Updating notes to localStorage
const saveNotes = (notes) => {
	localStorage.setItem('notes', JSON.stringify(notes));
};

// showing message after saving the note
const saveNoteText = () => {
	const saveNoteMessage = document.createElement('p');
	saveNoteMessage.textContent = 'Your note got saved.';
	saveNoteMessage.classList.add('list-item', 'list-item__title');
	document.querySelector('#message').appendChild(saveNoteMessage);
	setTimeout(() => {
		location.assign('./index.html');
	}, 1000);
};

// Removing a note from notes array
const removeNote = (id) => {
	const noteIndex = notes.findIndex((note) => note.id === id);

	if (noteIndex > -1) {
		notes.splice(noteIndex, 1);
	}
	const removeNoteMessage = document.createElement('p');
	removeNoteMessage.textContent = 'Your note is deleted.';
	removeNoteMessage.classList.add('list-item', 'list-item__title');
	document.querySelector('#message').appendChild(removeNoteMessage);
	setTimeout(() => {
		location.assign('./index.html');
	}, 500);
};

// DOM structure for a note
const generateNoteDOM = (note) => {
	const noteEl = document.createElement('a');
	const textEl = document.createElement('p');
	const statusEl = document.createElement('p');

	// setup the note title text
	if (note.title.length > 0) {
		textEl.textContent = note.title;
	} else {
		textEl.textContent = 'Untitled Note';
	}
	textEl.classList.add('list-item__title');
	noteEl.appendChild(textEl);

	// setup last edited message
	statusEl.textContent = lastEditedMessage(note.updatedAt);
	statusEl.classList.add('list-item__subtitle');
	noteEl.appendChild(statusEl);

	noteEl.setAttribute('href', `./edit.html#${note.id}`);
	noteEl.classList.add('list-item');

	return noteEl;
};

// Sorting Notes
const sortNotes = (notes, sortBy) => {
	if (sortBy === 'byEdited') {
		return notes.sort((a, b) => {
			if (a.updatedAt > b.updatedAt) {
				return -1;
			} else if (a.updatedAt < b.updatedAt) {
				return 1;
			} else {
				return 0;
			}
		});
	} else if (sortBy === 'byCreated') {
		return notes.sort((a, b) => {
			if (a.createdAt > b.createdAt) {
				return -1;
			} else if (a.createdAt < b.createdAt) {
				return 1;
			} else {
				return 0;
			}
		});
	} else if (sortBy === 'alphabetical') {
		return notes.sort((a, b) => {
			if (a.title.toLowerCase() < b.title.toLowerCase()) {
				return -1;
			} else if (a.title.toLowerCase() > b.title.toLowerCase()) {
				return 1;
			} else {
				return 0;
			}
		});
	} else {
		return notes;
	}
};

// generate last-edited message
const lastEditedMessage = (timestamp) =>
	`Last edited ${moment(timestamp).fromNow()}`;

// Rendering application Notes
const renderNotes = (notes, filters) => {
	const notesEl = document.querySelector('#notes');

	notes = sortNotes(notes, filters.sortBy);

	const filteredNotes = notes.filter((note) =>
		note.title.toLowerCase().includes(filters.searchText.toLowerCase())
	);

	notesEl.innerHTML = '';
	if (filteredNotes.length > 0) {
		filteredNotes.forEach((note) => {
			const noteEl = generateNoteDOM(note);
			notesEl.appendChild(noteEl);
		});
	} else {
		const emptyMessage = document.createElement('p');
		emptyMessage.textContent = 'No notes to show.';
		emptyMessage.classList.add('empty-message', 'list-item');
		notesEl.appendChild(emptyMessage);
	}
};
