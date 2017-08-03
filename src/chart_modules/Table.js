import React from 'react';

const Table = ({settings, data}) => {
  const {tableSettingsList} = settings.chart1Settings;
  console.log(settings)
  console.log(data)

  let missingVars = [],
    usingVars = [];

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
                console.log(dataVal)
                if (dataVal) {
                  usingVars.push(d.variable)
                  let rowClass = "table__row";
                  rowClass += d.bold ? " bold" : "";
                  return (
                      <div className={rowClass}>
                        <div className="table__row__label">{d.displayName}</div>
                        <div className="table__row__value">{dataVal}</div>
                      </div>
                  )
                } else {
                  missingVars.push(d.variable)
                  return null;
                }
              })}
            </div>
          )
      })}
      <h5 className="data-block__viz__debugging-list">Missing Variables: {missingVars.toString()}</h5>
      <h5 className="data-block__viz__debugging-list">Using Variables: {usingVars.toString()}</h5>
      <h5 className="data-block__viz__debugging-list">Full Var List for this Entry: {Object.keys(data).toString()}</h5>
    </div>
  )
}

export default Table;