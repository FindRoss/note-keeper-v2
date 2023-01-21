import { INote } from "../Interfaces";
import deleteIcon from "../assets/delete-icon.svg"

interface Props {
  note: INote;
  handleDelete: (id: string | undefined) => void;
}

const TodoTask = ({ note, handleDelete }: Props) => {
  const {title, content} = note; 

  return (
    <div className="note">
      {title && <div className="title">{title}</div>}
      {content && <div className="content">{content}</div>}
      <div className="delete">
        <span role="button">
          <img src={deleteIcon} className="delete-icon" alt="delete icon" onClick={() => handleDelete(title)} />
        </span>
      </div>
    </div>
  )
}

export default TodoTask;