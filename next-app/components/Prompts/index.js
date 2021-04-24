import React, { useState } from "react";

import Select from "react-select";

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

export default Prompt;
