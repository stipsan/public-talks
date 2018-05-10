import { shallow } from 'enzyme'
import App from '../index'

describe('With Enzyme', () => {
  it('App renders correctly', () => {
    const app = shallow(<App />)
    expect(app.find('p').text()).toEqual('Hello World!')
  })
})
