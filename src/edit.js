let notes = []

const loadNotes = () => {
	const notesJSON = localStorage.getItem('notes')
	try {
		return notesJSON ? JSON.parse(notesJSON) : []
	} catch (e) {
		return []
	}
}

notes = loadNotes()

const getNotes = () => notes // to export notes array from this file

export { getNotes }
