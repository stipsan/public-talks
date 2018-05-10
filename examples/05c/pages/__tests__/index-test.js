import { Simulate, render } from 'react-testing-library'
import snapshotDiff from 'snapshot-diff'
import App from '../index'

it('should open and close', () => {
  const { container, getByTestId } = render(<App />)
  expect(container).toMatchSnapshot()
  const firstVersion = container.cloneNode(true)

  Simulate.click(getByTestId('toggle-modal'))
  expect(container).toMatchSnapshot()
  const secondVersion = container.cloneNode(true)

  expect(snapshotDiff(firstVersion, secondVersion)).toMatchSnapshot()
})
