import React from 'react'
import PropTypes from 'prop-types'

class BannerMessage extends React.Component{
  render(){
    return(
      <div>
       <button className="ui primary button"> {this.props.message}</button>
      </div>
    )
  }
}

BannerMessage.propTypes = {
  message: PropTypes.string
}

export default BannerMessage