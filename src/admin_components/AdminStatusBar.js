import React from 'react';

function AdminStatusBar({status}) {
	console.log(status)
	if (status == 200) {
      return <div className="admin__status-bar">Successfully Updated</div>
    } else if (status == 500) {
      return <div className="admin__status-bar">Update Failed</div>
    } else {
      return null;
    }
}

export default AdminStatusBar;