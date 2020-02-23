import React from 'react'
import PropTypes from 'prop-types'
import BannerMessageComponent from './BannerMessage'

class Banner extends React.Component{
  constructor(){
    super()

    this.generateBanner = this.generateBanner.bind(this)
  }

  generateBanner(){
    return (
      <div>
        <BannerMessageComponent message={this.props.message}/>
      </div>
    )
  }

  render(){
    return(
      <div style={this.props.bannerStyle}>
        {this.generateBanner()}
      </div>
    )
  }
}

Banner.propTypes = {
  bannerStyle: PropTypes.object,
  message: PropTypes.string,
}

export default Banner
