'use strict';

const titleEl = document.querySelector('#note-title');
const bodyEl = document.querySelector('#note-body');
const saveEl = document.querySelector('#save-note');
const removeButton = document.querySelector('#remove-note');
const lastEditedEl = document.querySelector('#last-edited-text');

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => note.id === noteId);

if (!note) {
	location.assign('./index.html');
}

titleEl.value = note.title;
bodyEl.value = note.body;
lastEditedEl.textContent = lastEditedMessage(note.updatedAt);

// event-listener on note-title element
titleEl.addEventListener('input', (e) => {
	note.title = e.target.value;
	note.updatedAt = moment().valueOf();
	lastEditedEl.textContent = lastEditedMessage(note.updatedAt);
	saveNotes(notes);
});

// event-listener on note-body element
bodyEl.addEventListener('input', (e) => {
	note.body = e.target.value;
	note.updatedAt = moment().valueOf();
	lastEditedEl.textContent = lastEditedMessage(note.updatedAt);
	saveNotes(notes);
});

// event-listerner for save button
saveEl.addEventListener('click', () => {
	saveNoteText();
});

// event-listener on remove button
removeButton.addEventListener('click', () => {
	removeNote(noteId);
	saveNotes(notes);
});

document.querySelector('#home-page').addEventListener('click', () => {
	location.assign('./index.html');
});

window.addEventListener('storage', (e) => {
	if (e.key === 'notes') {
		notes = JSON.parse(e.newValue);
		note = notes.find((note) => note.id === noteId);

		if (!note) {
			location.assign('./index.html');
		}

		titleEl.value = note.title;
		bodyEl.value = note.body;
		lastEditedEl.textContent = lastEditedMessage(note.updatedAt);
	}
});
