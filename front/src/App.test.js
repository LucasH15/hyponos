import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Route } from 'react-router-dom'

import Home from '@Pages/Home'
import App from './App'

describe('App test', () => {
    configure({ adapter: new Adapter() })
    it('render app.js', () => {
        const wrapper = shallow(<App />)
        const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props()
            pathMap[routeProps.path] = routeProps.component
            return pathMap
        }, {})

        expect(pathMap['/']).toBe(Home)
    })
})
