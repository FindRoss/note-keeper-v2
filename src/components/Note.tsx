import { INote } from "../Interfaces";

interface Props {
  note: INote;
}

const TodoTask = ({ note }: Props) => {
  const {title, content} = note; 

  return (
    <div className="note">
      {(title === "") ? null : <div className="title">{title}</div>}
      {(content === "") ? null : <div className="content">{content}</div>}
    </div>
  )
}

export default TodoTask;