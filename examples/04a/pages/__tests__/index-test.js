import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from '../index'

describe('With Enzyme', () => {
  it('App renders correctly', () => {
    const app = mount(<App />)
    expect(toJson(app, { mode: 'deep' })).toMatchSnapshot()

    app.setProps({ isDark: true })
    expect(toJson(app, { mode: 'deep' })).toMatchSnapshot()
  })
})
