// App.js
import React, { Component } from "react";
//import './App.css';
import Select from "react-select";
// import Modal from "./Modal.js";

//https://www.freakyjolly.com/react-select-single-or-multiple-select-box-using-react-select-tutorial-with-examples/

// will need a file to generate these options
const options = [
  { value: "memory1", label: "Memory1" },
  { value: "memory2", label: "Memory2" },
  { value: "memory3", label: "Memory3" },
  { value: "memory4", label: "Memory4" },
  { value: "memory5", label: "Memory5" },
  { value: "memory6", label: "Memory6" },
];

export let selectedOption;

class Prompt extends Component {
  state = {
    selectedOption: null,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    console.log(selectedOption);
    return (
      <div className="Prompt">
        <h3>Share a memory</h3>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
}

export default Prompt;
