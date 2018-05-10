import renderer from 'react-test-renderer'
import App from '../index'

jest.mock('shared/Footer', () => {
  // Instead of mocking we're just overriding the default value of a prop
  const { Footer } = require.requireActual('shared/Footer')

  return { Footer: props => <Footer {...props} year={2049} /> }
})

test('App renders correctly', () => {
  const component = renderer.create(<App />)
  expect(component.toJSON()).toMatchSnapshot()
})
