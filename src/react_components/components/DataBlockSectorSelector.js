import React from 'react';

class DataBlockSectorSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sector != this.props.sector) {
      this.refs["selectRef"].value = nextProps.sector
    }
    
  }

  render() {
    const {sector, sectorOptions, changeFunction} = this.props;

    return (
      <div className="data-block__sector-selector-container">
        <select className="data-block__sector-selector" ref="selectRef" onChange={() => { return changeFunction(this.refs["selectRef"].value)}}>
          {Object.keys(sectorOptions).map((sectorKey, i) => {
            return (
              <option key={sectorKey} value={sectorKey}>{sectorOptions[sectorKey]}</option>
            )
          })}
        </select>
      </div>
    )
  }
}

export default DataBlockSectorSelector

