import React, {Component} from 'react'
import axios from 'axios'
import redux from 'react-redux'
import {Login, AllProducts} from '../components'

export class MainPage extends Component {
  //componentDidMount(){}

  render() {
    return (
      <div>
        <h1>This is our Main page!</h1>
        <Login />
        <AllProducts />
      </div>
    )
  }
}

//Container
