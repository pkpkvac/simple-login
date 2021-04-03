// App.js
import React, { Component, useState } from "react";

//import './App.css';
import Select from "react-select";
// import Modal from "./Modal.js";

//https://www.freakyjolly.com/react-select-single-or-multiple-select-box-using-react-select-tutorial-with-examples/

// will need a file to generate these options
const options = [
  {
    value: "memory4",
    label: "I shouldn't tell this story at a wedding, but ...",
  },
  {
    value: "memory2",
    label: "Most embarassing story of the groom/bride I know",
  },
  {
    value: "memory1",
    label: "The naughtiest thing I've seen the groom/bride do",
  },
  { value: "memory3", label: "Funniest travel story" },
  { value: "memory6", label: "That time we got drunk ..." },
];

const Prompt = ({ setPrompt }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setPrompt(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <div className="Prompt">
      <center>
        <h3>Share a memory</h3>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
        />
      </center>
    </div>
  );
};
// class Prompt extends Component {
//   state = {
//     selectedOption: null,
//   };
//   handleChange = (selectedOption) => {
//     this.setState({ selectedOption });
//     console.log(`Option selected:`, selectedOption);
//   };

//   render() {
//     const { selectedOption } = this.state;
//     console.log(selectedOption);
//     return (
//       <div className="Prompt">
//         <h3>Share a memory</h3>
//         <Select
//           value={selectedOption}
//           onChange={this.handleChange}
//           options={options}
//         />
//       </div>
//     );
//   }
// }

export default Prompt;
