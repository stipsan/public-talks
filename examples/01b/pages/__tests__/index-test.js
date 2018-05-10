import renderer from 'react-test-renderer'
import App from '../index'

describe('With Snapshot Testing', () => {
  it('App renders correctly', () => {
    const component = renderer.create(<App />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
