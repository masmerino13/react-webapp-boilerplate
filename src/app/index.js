import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {hot} from 'react-hot-loader'

const Hello = () => <div>Hello world!</div>

const Router = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={Hello} exact />
      </Switch>
    </div>
  </BrowserRouter>
)

export default hot(module)(Router)
