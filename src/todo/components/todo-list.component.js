import NoteService from '../services/note.service.js';

import { getState, setState, markup } from '../../../node_modules/slingjs/sling.min';

class TodoListComponent {

    constructor() {
        this.completedNotesToAnimate = [];
    }

    slOnInit() {
        const stateObj = getState();

        this.completedNotesToAnimate = [];
        stateObj.getNotes().forEach((stateNote, index) => {
            if (stateNote.completed) {
                this.completedNotesToAnimate.push(index);
            }
        });

        this.applyCheckedProperty();
    }

    applyCheckedProperty() {
        const stateObj = getState();
        const notes = stateObj.getNotes();

        document.querySelectorAll('#divTodoList input').forEach((node, index) => {
            if (index % 2 === 0) {
                node.checked = notes[index].completed;
            }
        });
    }

    updateReadonlyAttribute(note, updatedNoteIndex) {
        if (note.completed === false) {
            document.querySelectorAll('#divTodoList input').forEach((node, index) => {
                if (index === ((updatedNoteIndex * 2) + 1)) {
                    node.removeAttribute('readonly');
                }
            });
        } else if (note.completed === true) {
            document.querySelectorAll('#divTodoList input').forEach((node, index) => {
                if (index === ((updatedNoteIndex * 2) + 1)) {
                    node.setAttribute('readonly', true);
                }
            });
        }
    }

    completeNote(note) {
        let stateObj = getState();
        let updatedNoteIndex = 0;
        let updatedNote = false;

        stateObj.getNotes().forEach((stateNote, index) => {
            if (stateNote === note) {
                stateNote.completed = !note.completed;
                updatedNote = true;
                updatedNoteIndex = index;
            }
        })

        setState(stateObj);
        new NoteService().setNoteCookie(stateObj);

        this.completedNotesToAnimate = [];
        stateObj.getNotes().forEach((stateNote, index) => {
            if (stateNote.completed) {
                this.completedNotesToAnimate.push(index);
            }
        });

        if (updatedNote === true) {
            this.updateReadonlyAttribute(note, updatedNoteIndex);
        }
    }

    updateNote(note, event) {
        let stateObj = getState();

        stateObj.getNotes().forEach(stateNote => {
            if (stateNote === note) {
                stateNote.text = event.target.value;
            }
        });

        setState(stateObj);
        new NoteService().setNoteCookie(stateObj);
    }

    slDetachedOnNodeDestroy(proposedNode) {
        const parent = proposedNode.parentNode;
        return parent.childNodes[this.completedNotesToAnimate.pop()];
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divTodoList'
            },
            children: [
                markup('div', {
                    attrs: {
                        style: "width: 50%; margin: auto; padding: 1rem;"
                    },
                    children: [
                        ...Array.from(getState().getNotes(), (note, index) =>
                            markup('div', {
                                attrs: {
                                    style: 'width: 100%;',
                                    slanimatedestroy: 'animExit',
                                    slanimatedestroytarget: this.slDetachedOnNodeDestroy.bind(this)
                                },
                                children: [
                                    markup('input', {
                                        attrs: {
                                            type: 'checkbox',
                                            ...note.completed && { checked: 'true' },
                                            onchange: this.completeNote.bind(this, note)
                                        }
                                    }),
                                    markup('input', {
                                        attrs: {
                                            value: note.text,
                                            ...note.completed && { readonly: 'true' },
                                            oninput: this.updateNote.bind(this, note),
                                            style: 'margin-left: 1px;'
                                        }
                                    })]
                            })
                        )
                    ]
                })
            ]
        });
    }
}

export default TodoListComponent;
