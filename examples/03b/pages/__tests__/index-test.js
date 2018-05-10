import renderer from 'react-test-renderer'
import App from '../index'

// Mocking the entire component
/*
jest.mock('shared/Footer', () => {
  return {Footer: 'Footer'}
})
//*/

describe('With Snapshot Testing', () => {
  it('App renders correctly', () => {
    const component = renderer.create(<App />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
