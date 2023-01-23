import {FC, ChangeEvent, useState, useEffect} from 'react';
import './App.css';
import Note from './components/Note';
import Header from './components/Header';
import Footer from './components/Footer';
import { INote } from './Interfaces';

// inspiration
// https://keep-vue.netlify.app

// Guide to hosting the backend on Render.com
// https://dev.to/gregpetropoulos/render-deployment-free-tier-of-mern-app-52mk

// Another one
// https://javascript.plainenglish.io/deployment-of-mern-full-stack-app-on-render-com-f31820514b3a


const App: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [notes, setNotes] = useState<INote[]>([]);
  const [showTitle, setShowTitle] = useState<boolean>(false);


  async function fetchData() {
    const response = await fetch(`${process.env.REACT_APP_URL}/api/note`)
    if (!response.ok) {
      window.alert(`An error has occured: ${response.statusText}`);
      return; 
    }
    const data = await response.json();
    setNotes(data);
  }

  useEffect(() => {
   fetchData();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else {
      setContent(event.target.value);
    }
  };

  // ADD note
  async function addNote(event: React.FormEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    const newNote = { title, content };
    // Validate note
    if (title === "" && content === "") return alert("Please fill in atleast one field.")
    // Fetch request
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    }
    const response = await fetch(`${process.env.REACT_APP_URL}/api/note/add`, options)
    if (!response.ok) {
      window.alert(`An error has occured: ${response.statusText}`);
      return;
    }
    setTitle("");
    setContent("");
    fetchData();
  };

  // DELETE note
  async function handleDelete (id: string | undefined): Promise<void> {
    const response = await fetch(`${process.env.REACT_APP_URL}/api/note/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      window.alert(`An error has occured: ${response.statusText}`);
      return;
    }
    fetchData();
  }
  
  // Click anywhere on the page outside form to dismiss title field
  function handleFormClick (event: React.MouseEvent<HTMLElement>): void {
    const formEl: HTMLElement | null = document.querySelector('.input-container');
    const targetEl = event.target as HTMLElement;
    if (!formEl?.contains(targetEl)) setShowTitle(false);
  }

  function handleNoteClick (event: React.MouseEvent<HTMLElement>, id: string | undefined): void {
    const target = event.target as Element;
    if (!target.matches('.delete-button') || !target.matches('.delete-icon')) {
      // Handle display modal.
    }
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
      <div className="note-list-container">
        <div className="note-list">
          {notes.map((note: INote) => {
            return <Note key={note._id} note={note} handleDelete={handleDelete} handleNoteClick={handleNoteClick}/>;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
