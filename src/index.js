if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}

import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app'

const $app = document.getElementById('app')

ReactDOM.render(<App />, $app)
