import '../styles/DialogBox.scss'

const DialogBox = ({ speaker, text }) => {
  return (
    <div className="dialog-box">
      <div className="speaker">{speaker}</div>
      <div className="text">{text}</div>
    </div>
  )
}

export default DialogBox
