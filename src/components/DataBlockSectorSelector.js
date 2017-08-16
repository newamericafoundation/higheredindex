import React from 'react';

import DataBlockInfo from "./DataBlockInfo";
import DataBlockViz from "./DataBlockViz";

class DataBlockSectorSelector extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    const {fullData, changeFunction} = this.props;

    let selectVals = Object.keys(fullData)
    console.log(selectVals)

    return (
      <select className="data-block__viz__sector-selector" ref="selectRef" onChange={() => { return changeFunction(this.refs["selectRef"].value)}}>
        {selectVals.map((optionName, i) => {
          return (
            <option key={optionName} value={optionName}>{optionName}</option>
          )
        })}
      </select>
    )
  }
}

export default DataBlockSectorSelector

