export function sortAlpha(a, b) {
  let A = a.name.toLowerCase(),
    B = b.name.toLowerCase();

  if (A < B){
    return -1;
  } else if (A > B){
    return  1;
  } else {
    return 0;
  }
}