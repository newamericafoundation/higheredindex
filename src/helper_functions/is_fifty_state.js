const statesList = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];

export function isFiftyState(abbrev) {
  if (!abbrev) { return false; }
  
  if (statesList.indexOf(abbrev) > -1) {
    return true;
  } else {
    return false;
  }
}