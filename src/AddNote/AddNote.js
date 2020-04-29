import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types'

export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderId: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
    .then( res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then(note => {
      this.context.addNote(note)
      this.props.history.push(`/folder/${note.folderId}`)
    })
    .catch(error => {
      console.error({ error })
    })
  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className="add-note">
        <h2>Create a Note</h2>
        <NotefulForm onSubmit = {this.handleSubmit}>
          <label htmlFor="note-name">Name</label>
          <input type="text" id="note-name" required/>
          <label htmlFor="content">Content</label>
          <textarea id="note-content" required/>
          <div className='field'>
            <label htmlFor='note-folder-select'>Folder</label>
            <select id='note-folder-select' name='note-folder-id' required>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
            <button type='submit' >
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

AddNote.ropTypes = {
  history: PropTypes.object
}