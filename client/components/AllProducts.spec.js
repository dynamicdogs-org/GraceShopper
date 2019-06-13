import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllProducts from './AllProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProducts Component', () => {
  let allProducts

  //Problem with hook below.
  // beforeEach(() => {
  //   allProducts = shallow(<AllProducts />).instance()
  // })

  // it('has products on its state', () => {
  //   expect(allProducts.props.product).to.exist;
  // })
})
