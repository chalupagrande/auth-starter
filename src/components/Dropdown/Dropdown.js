import React from 'react'
import PropTypes from 'prop-types'
import './Dropdown.css'

class Dropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: true,
      isHovered: false,
      menuStyle: {}
    }
    

    this.triggerPos = {}
    this.menuPos = {}

    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
    this.onClick = this.onClick.bind(this)
    this.determineDropdownPosition = this.determineDropdownPosition.bind(this)
    //this.trigger
  }

  componentDidMount(){
    this.determineDropdownPosition()
  }
  onClick(){
    this.setState(Object.assign(this.state, {isOpen: !this.state.isOpen,}))
  }

  mouseEnter(){
    this.setState(Object.assign(this.state, {isHovered: true}))
  }

  mouseLeave(){
    if(!this.state.isOpen){
      this.setState(Object.assign(this.state, {isHovered: false}))
    }
  }

  determineDropdownPosition(){
    this.triggerPos = this.trigger.getBoundingClientRect()
    this.menuPos = this.menu.getBoundingClientRect()
    const side = this.triggerPos.x <= (window.innerWidth/2) ? 'left' : 'right';
    const style = {
      top: this.triggerPos.y + this.triggerPos.height + (this.props.bufferTop || 0),
    }
    style[side] = 0 + (side === 'left' ? (this.props.bufferLeft || 0) : -this.props.bufferLeft || 0)
    this.setState(Object.assign(this.state, {isOpen: false, menuStyle: style}))
  }

  render() {
    const Trigger = this.props.trigger
    const Menu = this.props.menu
    return (
      <div className="dropdown"
          onMouseEnter={this.mouseEnter} 
          onMouseLeave={this.mouseLeave} 
          onClick={this.onClick}>
        <div className={`dropdown-trigger ${this.props.triggerClass ||''} ${this.state.isHovered ? 'isHovered':''}`} 
            ref={n=>this.trigger = n}>
          <Trigger isHovered={this.state.isHovered}/>
        </div>
        <div className={`dropdown-menu ${this.state.isOpen ? 'isOpen':''} ${this.props.menuClass ||''}`} 
            style={this.state.menuStyle}
            ref={n=> this.menu = n}>
          <Menu />
        </div>
      </div>
    )
  }
}

Dropdown.propTypes = {
  trigger: PropTypes.func.isRequired,
  menu: PropTypes.func.isRequired,
  bufferTop: PropTypes.number,
  bufferLeft: PropTypes.number,
  triggerClass: PropTypes.string,
  menuClass: PropTypes.string
}

export default Dropdown