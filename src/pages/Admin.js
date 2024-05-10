import React from 'react'
import { connect } from 'react-redux'

export const Admin = (props) => {
  return (
    <div>Admin</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)