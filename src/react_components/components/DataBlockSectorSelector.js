import React from 'react';

const sectorOptions = {
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

    return (
      <select className="data-block__sector-selector" ref="selectRef" onChange={() => { return changeFunction(this.refs["selectRef"].value)}}>
        {selectVals.map((optionName, i) => {
          return (
            <option key={optionName} value={optionName}>{sectorOptions[optionName]}</option>
          )
        })}
      </select>
    )
  }
}

export default DataBlockSectorSelector

