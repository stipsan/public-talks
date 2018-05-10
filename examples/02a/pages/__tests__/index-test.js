import { shallow } from 'enzyme'
import { Hello } from 'shared'
import App from '../index'

describe('With Enzyme', () => {
  it('App renders correctly', () => {
    const app = shallow(<App />)
    expect(app.find(Hello)).toHaveLength(1)
  })
})
