import React from 'react'
import PropTypes from 'prop-types'
import './Dropdown.css'

class Dropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      isHovered: false,
    }
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }

  mouseEnter(){
    this.setState(Object.assign(this.state, {isHovered: true, isOpen:true}))
  }

  mouseLeave(){
    this.setState(Object.assign(this.state, {isHovered: false, isOpen: false}))
  }

  render() {
    const Trigger = this.props.trigger
    const Menu = this.props.menu
    return (
      <div className="dropdown" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <div className="dropdown-trigger">
          <Trigger isHovered={this.state.isHovered}/>
        </div>
        <div className={`dropdown-menu ${this.state.isOpen ? 'isOpen':''}`}>
          <Menu />
        </div>
      </div>
    )
  }
}

Dropdown.propTypes = {

}

export default Dropdown