const month_names = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']


isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}


getFebDays = (year) =>{
    return isLeapYear(year) ? 29 : 28
}


let calendar = document.querySelector('.calendar')