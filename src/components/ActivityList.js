import React from 'react'
import PropTypes from 'prop-types'

class ActivityList extends React.Component {
  constructor() {
    super()
    this.generateActivityList = this.generateActivityList.bind(this)
  }

  generateHeaders() {
    const list = () => {if (this.props.activityList.length > 0){
     const keyValues = Object.keys(this.props.activityList[0]).map((values) => {
       return <th style={{'border': 'solid 1px'}}>{values}</th>
     })
     return <tr>{keyValues}</tr>
   }
    }

    return (
        list()
    )
  }

  generateActivityList() {
   const list = this.props.activityList.map((data) => {
     const keyValues = Object.keys(data).map((values) => {
       return <td>{data[values]}</td>})
     return <tr>{keyValues}</tr>
   })

    return (
        list
    )
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
        {this.generateHeaders()}
        {this.generateActivityList()}
          </tbody>
        </table>
      </div>
    )
  }
}

ActivityList.propTypes = {
  message: PropTypes.string,
}

export default ActivityList
