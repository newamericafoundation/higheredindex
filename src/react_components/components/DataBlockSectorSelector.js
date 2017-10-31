import React from 'react';

import DataBlockInfo from "./DataBlockInfo";
import DataBlockViz from "./DataBlockViz";

const displayOptions = {
  "all": "All Sectors",
  "public2": "2-Year Public",
  "public4": "4-Year Public",
  "nonprofit": "Private Nonprofit",
  "forprofit": "Private For-Profit",
}

class DataBlockSectorSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {fullData, changeFunction} = this.props;

    let selectVals = Object.keys(fullData)
    console.log(selectVals)

    return (
      <div className="data-block__viz__sector-selector-container">
        <select className="data-block__viz__sector-selector" ref="selectRef" onChange={() => { return changeFunction(this.refs["selectRef"].value)}}>
          {selectVals.map((optionName, i) => {
            return (
              <option key={optionName} value={optionName}>{displayOptions[optionName]}</option>
            )
          })}
        </select>
      </div>
    )
  }
}

export default DataBlockSectorSelector

