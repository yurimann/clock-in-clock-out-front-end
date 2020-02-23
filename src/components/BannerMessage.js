import React from 'react'
import PropTypes from 'prop-types'

class BannerMessage extends React.Component{
  render(){
    return(
      <div>
        <p>{this.props.message}</p>
      </div>
    )
  }
}

BannerMessage.propTypes = {
  message: PropTypes.string
}

export default BannerMessage