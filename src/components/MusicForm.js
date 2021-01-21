import styled from 'styled-components'

  const Form = styled.form`

  --box-shadow-color: rgba(101, 161, 226, 1);
  --button-background-color: #73B1D4;

  
    display: flex;
    margin: 2rem 0 3rem 0;
    flex-flow: column;
    align-items: center;

    input {
      outline: none;
      border: none;
      display: flex;
      width: 40rem;
      height: 4rem;
      background: #F2F2F2;
      border-radius: 1.7rem;
      text-indent: 2rem;
      font-size: 2rem;
    }

    button {
      outline: none;
      border: none;
      width: 13rem;
      height: 4rem;
      margin-top: 2rem;
      color: #f2f2f2;
      background: #2D4066;
      border-radius: 1.2rem;
      font-size: 2rem;
      font-weight: 400;
      box-shadow: 0 8px 6px -6px var(--box-shadow-color);
    }

    button:hover {
        filter: brightness(110%);
    }

    button:active {
      transform: translateY(2px);
      transition: all 0.1s ease 0s;
      outline: none;

    }
  `

function MusicForm(props) {


  const {onChange, onSubmit, value} = props;

  return (
    <Form onSubmit={onSubmit}>
      <input type="text" placeholder="Enter song" value={value} onChange={onChange} />
      <button type="submit" value="Submit">Find songs</button>
    </Form>
  );
}

export default MusicForm;