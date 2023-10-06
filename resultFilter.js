export function studentsData(data, type, value) {
  var res = data;
  var filterData = ""
  if (type == "id")
    filterData = res.filter(student => student.id == value);
  else if (type == "name")
    filterData = res.filter(student => ((student.name).toLowerCase()).includes(value.toLowerCase()));
  else if (type == "marks")
    filterData = res.filter(student => student.marks == value);
  else if (type == "result")
    filterData = res.filter(student => (student.result).toLowerCase() == value.toLowerCase());
  return filterData;
}