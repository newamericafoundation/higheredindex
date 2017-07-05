import React from 'react';

const Table = ({settings, data}) => {
  const {tableSettingsList} = settings.chart1Settings;
  console.log(settings)
  console.log(data)
  return (
    <div className="table-container">
      { tableSettingsList.map((tableSettings) => {
          return (
            <div className="table">
              <div className="table__row heading">
                <div className="table__row__heading-label">{tableSettings.headingLabels[0]}</div>
                <div className="table__row__heading-label">{tableSettings.headingLabels[1]}</div>
              </div>
              {tableSettings.variables.map((d) => {
                let dataVal = data[d.variable];
                let rowClass = "table__row";
                rowClass += d.bold ? " bold" : "";
                return (
                    <div className={rowClass}>
                      <div className="table__row__label">{d.displayName}</div>
                      <div className="table__row__value">{dataVal}</div>
                    </div>
                )
              })}
            </div>
          )
      })}
      
    </div>
  )
}

export default Table;