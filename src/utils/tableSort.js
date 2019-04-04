/**
 *  对表格排序
 *
 * @export
 * @param {any} a 
 * @param {any} b
 * @returns < 1 => a < b;  = 0 => a = b; > 1 => a > b
 */
export default function tableSort(a , b ) {
  if ( typeof a === "string" && typeof b === "string" ) return a.localeCompare(b);
  if( typeof a === "number" && typeof b === "number" ) return a - b; 
  return a.toString().localeCompare(b.toString());
}