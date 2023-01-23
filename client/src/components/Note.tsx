import { INote } from "../Interfaces";
import deleteIcon from "../assets/delete-icon.svg"

interface Props {
  note: INote;
  handleDelete: (id: string | undefined) => void;
  handleNoteClick: (event: React.MouseEvent<HTMLElement>, id: string | undefined) => void;
}

const TodoTask = ({ note, handleDelete, handleNoteClick }: Props) => {
  const {title, content, _id} = note; 

  return (
    <div>
      <div className="note" onClick={(e) => handleNoteClick(e, _id)}>
        {title && <div className="title">{title}</div>}
        {content && <div className="content">{content}</div>}
        <div className="delete">
          <span className="delete-button" role="button" onClick={() => handleDelete(_id)}>
            <img src={deleteIcon} className="delete-icon" alt="delete icon" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default TodoTask;