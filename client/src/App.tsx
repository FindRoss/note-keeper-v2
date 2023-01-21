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

  useEffect(() => {
    async function fetchData() {
    const response = await fetch(`https://note-keeper-v2-root.onrender.com/api/note`)

    if (!response.ok) {
      window.alert(`An error has occured: ${response.statusText}`);
      return; 
    }
    const data = await response.json();
    setNotes(data);
   }

   fetchData();
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else {
      setContent(event.target.value);
    }
  };

  // Temporary function which will replaced by the addNotes POST below
  function addNote(event: React.FormEvent<HTMLButtonElement>): void {
    event.preventDefault();
    const newNote = { title, content };
    // Validate note
    if (title === "" && content === "") return alert("Please fill in atleast one field.")
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  // async function addNote(event: React.FormEvent<HTMLButtonElement>) {
  //   event.preventDefault();

  //   if (title === "" && content === "") return alert("Please fill in atleast one field.")
  
  //   // When a post request is sent to the create url, we'll add a new record to the database.
  //   const newNote = { title, content };
  
  //   await fetch("http://localhost:5000/note/add", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newNote),
  //   })
  //   .catch(error => {
  //     window.alert(error);
  //     return;
  //   });
    
  //   setTitle("");
  //   setContent("");
  // }

  function handleFormClick (event: React.MouseEvent<HTMLElement>): void {
    const formEl: HTMLElement | null = document.querySelector('.input-container');
    const targetEl = event.target as HTMLElement;
    if (!formEl?.contains(targetEl)) setShowTitle(false);
  }

  function handleDelete (id: string | undefined): void {
    setNotes(notes.filter(note => {
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
      <div className="note-list-container">
        <div className="note-list">
          {notes.map((note: INote, key: number) => {
            return <Note key={key} note={note} handleDelete={handleDelete}/>;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
