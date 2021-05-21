import { Component } from 'react'
import styled from 'styled-components'

import './App.css'

const StyledMain = styled.main`
  background: linear-gradient(${props => props.angle}, ${props => props.backGroundColor[0]}, ${props => props.backGroundColor[1]}, ${props => props.backGroundColor[2]});
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.backgroundColor = localStorage.getItem('backgroundColor') ? JSON.parse(localStorage.getItem('backgroundColor')) : ["#ffffff", "#ffffff", "#ffffff"]
    this.angle = localStorage.getItem('angle') ? localStorage.getItem('angle') : 0
    this.state = {
      backGroundColor: this.backgroundColor,
      angle: this.angle
    }
  }

    
  handleColorChange = (event, i) => {
    const newColor = event.target.value
    // create a copy of the backGroundColor array
    const newBackgroundColor = [...this.state.backGroundColor]
    // change the value of the array to the new color
    newBackgroundColor[i] = newColor
    // set the new array as the new state
    this.setState({ backGroundColor: newBackgroundColor })
    console.log("newBackgroundColor: " + newBackgroundColor)
    console.log("type: " + typeof newBackgroundColor)
    localStorage.setItem('backgroundColor', JSON.stringify(newBackgroundColor))
  }
  
  handleAngleChange = (event) => {
    const newAngle = `${event.target.value}deg`
    this.setState({ angle: newAngle })
    localStorage.setItem('angle', newAngle)
  }

  render() {
    const { backGroundColor, angle } = this.state
    
    console.log(typeof backGroundColor)
    
    return (
      // Pass the chosen color into main to set the background
      <StyledMain backGroundColor={backGroundColor} angle={angle} >
        <h1>CSS Gradient Generator</h1>
        <label for="angle">Angle:</label>
        <input type = "number" id="angle" onChange={(event) => this.handleAngleChange(event)}/>
        {backGroundColor.map((color, i) => (
          <input type="color"
            value={color}
            onChange={(event) => this.handleColorChange(event, i)}
          />
        ))}
      </StyledMain>
    )
  }
}

export default App;
