//每月名稱
const month_names = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']


//設定閏月規則
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}


//抓閏月
getFebDays = (year) =>{
    return isLeapYear(year) ? 29 : 28
}


//抓calendar css
let calendar = document.querySelector('.calendar')


//產生年月
generateCalendar = (month , year) => {
    let calendar_day = calendar.querySelector('.calendar_days')
    let calendar_header_year = calendar.querySelector('#year')
    
    let days_of_month = [31 , getFebDays(year) , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31]

    calendar_day.innerHTML = ''

    //抓現在日期
    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    let first_day = new Date(year , month , 1)

    for (let i = 0 ; i <= days_of_month[month] + first_day.getDate() - 1 ; i++){
        
    }
}