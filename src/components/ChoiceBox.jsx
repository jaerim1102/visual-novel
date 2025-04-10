import '../styles/ChoiceBox.scss'

const ChoiceBox = ({ choices = [], onSelect }) => {
  return (
    <div className="choice-box">
      {choices.map((choice, idx) => (
        <button key={idx} onClick={() => onSelect(choice)}>
          {choice.label}
        </button>
      ))}
    </div>
  )
}

export default ChoiceBox
