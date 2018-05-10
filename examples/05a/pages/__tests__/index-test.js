import { shallow } from 'enzyme'
import App from '../index'

it('should open and close', () => {
  const app = shallow(<App />)
  expect(app).toMatchSnapshot()
  expect(app.state().isOpen).toBe(false)

  app.find('button').simulate('click')
  expect(app).toMatchSnapshot()
  expect(app.state().isOpen).toBe(true)
})
