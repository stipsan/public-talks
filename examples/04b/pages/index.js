import { Button, DarkButton } from 'shared'

// eslint-disable-next-line react/prop-types
export default ({ isDark }) => {
  const StyledButton = isDark ? DarkButton : Button
  return (
    <div>
      Theme is {isDark ? 'Dark' : 'Light'}
      <StyledButton primary />
      <StyledButton />
    </div>
  )
}
