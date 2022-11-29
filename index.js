// Your code here
const createEmployeeRecord = function(array) {
   return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(arrays) {
    return arrays.map(array => createEmployeeRecord(array))
}

const createTimeInEvent = function(obj, date) {
    let [dateStamp, hour] = date.split(' ')
    obj.timeInEvents.push({
        type: "TimeIn",
        date: dateStamp,
        hour: parseInt(hour)
    })
    return obj
}

const createTimeOutEvent = function(obj, date)  {
    let [dateStamp, hour] = date.split(' ')
    obj.timeOutEvents.push({
        type: "TimeOut",
        date: dateStamp,
        hour: parseInt(hour)
    })
    return obj
}

const hoursWorkedOnDate = function(obj, date) {
    const timeIn = obj.timeInEvents.find(e => e.date == date).hour
    const timeOut = obj.timeOutEvents.find(e => e.date == date).hour
    return (timeOut - timeIn) / 100 
}

const wagesEarnedOnDate = function(obj, date) {
    const payRate = obj.payPerHour
    return payRate * hoursWorkedOnDate(obj, date)
}

const allWagesFor = function(obj) {
  const sum = obj.timeInEvents.map(event => event.date)
 const second = sum.reduce((old, date) => wagesEarnedOnDate(obj, date) + old, 0)
 return second
} 

const obj = {
    firstName: 'Thor',
    familyName: 'Odinsson',
    title: 'Electrical Engineer',
    payPerHour: 45,
    timeInEvents: [
      { type: 'TimeIn', date: '2018-01-01', hour: 800 },
      { type: 'TimeIn', date: '2018-01-02', hour: 800 },
      { type: 'TimeIn', date: '2018-01-03', hour: 800 }
    ],
    timeOutEvents: [
      { type: 'TimeOut', date: '2018-01-01', hour: 1600 },
      { type: 'TimeOut', date: '2018-01-02', hour: 1800 },
      { type: 'TimeOut', date: '2018-01-03', hour: 1800 }
    ]
  }



// console.log(allWagesFor(obj))
const calculatePayroll = function(array) {
    const allWages = array.map(allWagesFor)
    const total = allWages.reduce((accumulator, currentValue) => accumulator + currentValue)
    return total
}