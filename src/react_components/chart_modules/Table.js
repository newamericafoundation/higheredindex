import React from 'react';
const d3 = require("d3")
import { formatValue } from "../../helper_functions/format_value.js";

const Table = ({settings, data}) => {
  const {tableSettingsList} = settings.chart1Settings;
  return (
    <div className="table-container">
      { tableSettingsList.map((tableSettings, i) => {
          return (
            <div key={i} className="table">
              <div className="table__row heading">
                <div className="table__row__heading-label">{tableSettings.headingLabels[0]}</div>
                <div className="table__row__heading-label">{tableSettings.headingLabels[1]}</div>
              </div>
              {tableSettings.variables.map((d) => {
                let dataVal = data[d.variable];

                if (dataVal) {
                  if (typeof dataVal === "object") {
                    let maxYear = d3.max(Object.keys(dataVal));
                    dataVal = dataVal[maxYear]
                  }

                  dataVal = formatValue(dataVal, d.format)

                  if (d.isCongDist) {
                    dataVal = dataVal.slice(2,4) === "00" ? data.state + "-At-Large" : data.state + "-" + dataVal.slice(2,4)
                  }

                  let label;
                  if (d.linkTo) {
                    label = <div className="table__row__label"><a href={d.linkTo}>{d.displayName}</a></div>;
                  } else {
                    label = <div className="table__row__label">{d.displayName}</div>;
                  }

                  let rowClass = "table__row";
                  rowClass += d.bold ? " bold" : "";
                  return (
                      <div key={d.variable} className={rowClass}>
                        {label}
                        <div className="table__row__value">{dataVal}</div>
                      </div>
                  )
                } else {
                  return null;
                }
              })}
            </div>
          )
      })}
    </div>
  )
}

export default Table;