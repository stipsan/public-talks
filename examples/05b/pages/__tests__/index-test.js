import renderer from 'react-test-renderer'
import snapshotDiff from 'snapshot-diff'
import App from '../index'

it('should open and close', () => {
  const component = renderer.create(<App />)
  expect(component.toJSON()).toMatchSnapshot()

  component.root.findByType('button').props.onClick()
  expect(component.toJSON()).toMatchSnapshot()

  expect(snapshotDiff(<App />, <App isOpen />)).toMatchSnapshot()
})
