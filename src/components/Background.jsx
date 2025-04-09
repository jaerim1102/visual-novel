import '../styles/Background.scss';

const Background = ({ src }) => {
  return <div className="background" style={{ backgroundImage: `url(${src})` }}></div>
}

export default Background
