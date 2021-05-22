import { Component } from 'react'
import styled from 'styled-components'

import './App.css'

// Set the linear gradient based on the function 'setBackgroundCSS' below
const StyledMain = styled.main`
background: linear-gradient(${props => props.text});
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`

class App extends Component {
  // Get background colors and angle from local storage, or default to white and 0deg
  constructor(props) {
    super(props)
    this.backgroundColor = localStorage.getItem('backgroundColor') ? JSON.parse(localStorage.getItem('backgroundColor')) : ["#ffffff", "#ffffff"]
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
    // Turn newBackgroundColor into a JSON string and store in local storage
    localStorage.setItem('backgroundColor', JSON.stringify(newBackgroundColor))
  }
  
  handleAngleChange = (event) => {
    // set newAngle to be the input from the user, update the state and store in local storage
    const newAngle = `${event.target.value}deg`
    this.setState({ angle: newAngle })
    localStorage.setItem('angle', newAngle)
  }
  
  handleNumberChange = (event) => {
    // change the backGroundColor state array to have the length of the user's input
    // If it's already larger, it will remove the last items from the array
    // If it is currently smaller, it will default to white for new array items
    const currentColors = [...this.state.backGroundColor]
    let newColors = []
    for (let i = 0; i < event.target.value; i++) {
      currentColors[i] ? newColors.push(currentColors[i]) : newColors.push("#ffffff")
    }
    // Update the state and save in local storage
    this.setState({ backGroundColor: newColors })
    localStorage.setItem('backgroundColor', JSON.stringify(newColors))
  }
  
  setBackgroundCSS = (backGroundColor, angle) => {
    // Return a string with the text for the linear-gradient CSS
    let text = `${angle}`
    for (let i = 0; i < backGroundColor.length; i++) {
      text += `, ${backGroundColor[i]}`
    }
    return text
  }

  render() {
    const { backGroundColor, angle } = this.state
    const backgroundCSStext = this.setBackgroundCSS(backGroundColor, angle)
    
    return (
      // Pass the relevant CSS (from setBackgroundCSS) into the styled component
      <StyledMain text={backgroundCSStext} >
        <h1>CSS Gradient Generator</h1>
        <label>How many colours do you want to use?</label>
        <input type = "number" id="numberOfColors" value={this.state.backGroundColor.length} min="2" max="10" onChange={(event) => this.handleNumberChange(event)}/>
        <br></br>
        <label>Angle:</label>
        <input type = "number" id="angle" placeholder={this.state.angle.substring(0, this.state.angle.length - 3)} onChange={(event) => this.handleAngleChange(event)}/>
        <br></br>
        {/* Loop through items in the backGroundColor array to show color inputs */}
        {backGroundColor.map((color, i) => (
          <input type="color"
            value={color}
            key={i}
            onChange={(event) => this.handleColorChange(event, i)}
          />
        ))}
        <br></br>
        <p>CSS:</p>
        <p>background: linear-gradient({backgroundCSStext})</p>
      </StyledMain>
    )
  }
}

export default App;
