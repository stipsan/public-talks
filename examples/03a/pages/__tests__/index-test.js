import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from '../index'

describe('With Enzyme', () => {
  describe('enzyme-to-json in shallow mode', () => {
    it('App renders correctly', () => {
      const app = shallow(<App />)

      expect(app).toMatchSnapshot()
    })
  })
  describe('enzyme-to-json in deep mode', () => {
    it('App renders correctly', () => {
      const app = mount(<App />)

      expect(toJson(app, { mode: 'deep' })).toMatchSnapshot()
    })
  })
})
