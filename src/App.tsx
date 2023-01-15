import {FC, ChangeEvent, useState} from 'react';
import './App.css';
import Note from './components/Note';
import Header from './components/Header';
import { INote } from './Interfaces';

// inspiration
// https://keep-vue.netlify.app


const App: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [noteList, setNoteList] = useState<INote[]>([]);
  const [showTitle, setShowTitle] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else {
      setContent(event.target.value);
    }
  };

  function addNote(event: React.FormEvent<HTMLButtonElement>): void {
    event.preventDefault();
    const newNote = { title, content };
    // Validate note
    if (title === "" && content === "") return alert("Please fill in atleast one field.")
    setNoteList([...noteList, newNote]);
    setTitle("");
    setContent("");
  };

  function handleFormClick (event: React.MouseEvent<HTMLElement>): void {
    const formEl: HTMLElement | null = document.querySelector('.input-container');
    const targetEl = event.target as HTMLElement;
    if (!formEl?.contains(targetEl)) setShowTitle(false);
  }

  function handleDelete (id: string | undefined): void {
    setNoteList(noteList.filter(note => {
      return note.title !== id;
    }))
  }

  return (
    <div className="App" onClick={(event) => handleFormClick(event)}>
      <Header />
      <div className="input-container">
        <form>
          <input type="text" placeholder="Title..." name="title" value={title} onChange={handleInputChange} style={{ display: `${showTitle ? "block" : "none" } `}}/>
          <textarea placeholder="Note..." name="content" value={content} onClick={(): void => setShowTitle(true)} onChange={handleInputChange} />
          <div className="button-container">
           <button onClick={addNote}>+</button>
          </div>
        </form>
      </div>
      <div className="note-list">
        {noteList.map((note: INote, key: number) => {
          return <Note key={key} note={note} handleDelete={handleDelete}/>;
        })}
      </div>
    </div>
  );
}

export default App;
