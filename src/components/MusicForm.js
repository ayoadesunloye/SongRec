
function MusicForm(props) {

  const {onChange, onSubmit, value} = props;

  const formStyle = {
    display: "flex",
    marginTop: "8px",
    flexFlow: "column",
  }

  const textBoxStyle = {
    display: "flex",
    width: "300px",
  }

  const buttonStyle = {
    width: "85px",
    marginTop: "10px",
  }

  return (
    <form onSubmit={onSubmit} style={formStyle}>
      <input type="text" value={value} onChange={onChange} style={textBoxStyle} />
      <button type="submit" value="Submit" style={buttonStyle}>Find songs</button>
    </form>
  );
}

export default MusicForm;