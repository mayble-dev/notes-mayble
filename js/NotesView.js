export default class NotesView {
    constructor(
        root,
        { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
    ) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="menu">
            <div class="container">
            <h1 class="menu__heading">All Notes</h1>
                <button class="menu__add-btn" type="button"><i class="fa-solid fa-plus" style="margin-right: .2em;"></i> Add Note</button>
                <div class="menu__remove-instruct">(double tap to remove)</div>
                <div class="menu__list">
                    <div class="menu__list-item menu__list-item-selected menu__list-animation">
                        <div class="menu__list-preview-text">I learnt nothing today.</div>
                        <div class="menu__list-preview-date">Thursday 3:30pm</div>
                    </div>
                </div>
                </div>
                </div>
            <div class='container'>
            <div class="note">
                <input class="note__title" type="text" placeholder="Enter title...">
                <textarea class="note__body" spellcheck='true' placeholder="Write here..." name='richTextField'>Hello world</textarea>
            </div>
            </div>
        `;

        const btnAddNote = this.root.querySelector('.menu__add-btn');
        const inpTitle = this.root.querySelector('.note__title');
        const inpBody = this.root.querySelector('.note__body');

        btnAddNote.addEventListener('click', () => {
            this.onNoteAdd();
        });
        [inpTitle, inpBody].forEach((inputField) => {
            inputField.addEventListener('blur', () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        this.updateNotePreviewVisibility(false);
    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 100;

        return `
        <div class="menu__list-item" data-note-id="${id}">
            <div class="menu__list-preview-name">${title}</div>
            <div class="menu__list-preview-text">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? '...' : ''}
                </div>
                <div class="menu__list-preview-date">
                    ${updated.toLocaleString(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'short',
                    })}
                </div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector('.menu__list');

        // Empty list
        notesListContainer.innerHTML = '';

        for (const note of notes) {
            const html = this._createListItemHTML(
                note.id,
                note.title,
                note.body,
                new Date(note.updated)
            );

            notesListContainer.insertAdjacentHTML('beforeend', html);
        }

        // Add select/delete events for each list item
        const menu = document.querySelector('.menu');
        const note = document.querySelector('.note__body');
        notesListContainer
            .querySelectorAll('.menu__list-item')
            .forEach((noteListItem) => {
                noteListItem.addEventListener('click', () => {
                    setTimeout(() => {
                        menu.classList.add('menu__close-anim');
                        note.classList.add('note__open-anim');
                    }, 500);
                    this.onNoteSelect(noteListItem.dataset.noteId);
                });

                noteListItem.addEventListener('dblclick', () => {
                    const doDelete = confirm(
                        'Are you sure you want to permanently delete this note?'
                    );

                    if (doDelete) {
                        this.onNoteDelete(noteListItem.dataset.noteId);
                        setTimeout(() => {
                            menu.style.display = 'initial';
                            menu.classList.remove('menu__close-anim');
                            note.classList.remove('note__open-anim');
                        }, 1);
                    }
                });
            });
    }

    updateActiveNote(note) {
        this.root.querySelector('.note__title').value = note.title;
        this.root.querySelector('.note__body').value = note.body;

        this.root
            .querySelectorAll('.menu__list-item')
            .forEach((noteListItem) => {
                noteListItem.classList.remove('menu__list-item-selected');
            });

        this.root
            .querySelector(`.menu__list-item[data-note-id="${note.id}"]`)
            .classList.add('menu__list-item-selected');
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector('.note').style.visibility = visible
            ? 'visible'
            : 'hidden';
    }
}
