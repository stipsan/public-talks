import styled from 'styled-components'

export const Button = styled.button`
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

export const DarkButton = styled(Button)`
  background: ${props => (props.primary ? 'crimson' : 'black')};
  color: ${props => (props.primary ? 'black' : 'crimson')};
  border-color: crimson;
`
