import React from 'react';

function AdminStatusBar({status}) {
	console.log(status)
	if (status == 200) {
      return <div className="admin__status-bar success">Successfully Updated</div>
    } else if (status == 500) {
      return <div className="admin__status-bar failure">Update Failed</div>
    } else if (status == "in progress") {
      return <div className="admin__status-bar in-progress">In Progress</div>
    } else if (status == "incorrect password") {
      return <div className="admin__status-bar failure">Incorrect Password</div>
    } else if (status == "inactive") {
      return null
    } else {
      return <div className="admin__status-bar in-progress">{status}</div>
    }
}

export default AdminStatusBar;