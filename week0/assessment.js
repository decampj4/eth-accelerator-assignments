// Task 1
var repeatNumbers = function(data) {
    let str = ''
    for(i in data) {
        // If the string that we intend to return already has a value in it, append
        // a separator (a comma and a space in this case)
        if(str) {
            str += ', '
        }
        let value, repetitions;
        [value, repetitions] = data[i];
        for(let j = 0; j < repetitions; j ++) {
            str += value;
        }
    }

    return str;
}

// Task 1 tests
console.log(repeatNumbers([[1, 10]]));
console.log(repeatNumbers([[1, 2], [2, 3]]));
console.log(repeatNumbers([[10, 4], [34, 6], [92, 2]]));

// Task 2
var conditionalSum = function(values, condition) {
    const even = condition === "even";
    let sum = 0;
    for(i in values) {
        const value = values[i];
        const valueEven = !(value % 2);
        if (valueEven && even) {
            sum += value;
        }
        if (!valueEven && !even) {
            sum += value;
        }
    }
    return sum;
};

// Task 2 tests
console.log(conditionalSum([1, 2, 3, 4, 5], "even"));
console.log(conditionalSum([1, 2, 3, 4, 5], "odd"));
console.log(conditionalSum([13, 88, 12, 44, 99], "even"));
console.log(conditionalSum([], "odd"));

// Task 3
const MONTHS = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
]
var talkingCalendar = function(date) {
    let year, month, day;
    [year, month, day] = date.split('/');
    // Convert the month and day to ints to make processing easier
    month = parseInt(month);
    day = parseInt(day);
    let ordinalIndicator = 'th';
    const dayInTeens = day >= 10 && day < 20;
    if (day % 10 === 1 && !dayInTeens) {
        ordinalIndicator = 'st';
    } else if (day % 10 === 2 && !dayInTeens) {
        ordinalIndicator = 'nd';
    } else if (day % 10 === 3 && !dayInTeens) {
        ordinalIndicator = 'rd';
    }
    return `${MONTHS[month - 1]} ${day}${ordinalIndicator}, ${year}`
};

// Task 3 tests
console.log(talkingCalendar("2017/12/02"));
console.log(talkingCalendar("2007/11/11"));
console.log(talkingCalendar("1987/08/24"));

// Task 4
const VALID_DENOMINATIONS = [
    [2000, 'twenty'],
    [1000, 'ten'],
    [500, 'five'],
    [200, 'twoDollar'],
    [100, 'dollar'],
    [25, 'quarter'],
    [10, 'dime'],
    [5, 'nickel'],
    [1, 'penny']
]
var calculateChange = function(total, cash) {
    const changeAmounts = {};
    let change = cash - total;
    // The VALID_DENOMINATIONS constant is expected to be a 2D array of 
    // monetary units, sorted by greatest value to least value
    // with the first value in the inner array being the value of the unit
    // and the second value in the inner array being the name of the unit
    for(i in VALID_DENOMINATIONS) {
        let unitAmount, unitName;
        [unitAmount, unitName] = VALID_DENOMINATIONS[i];
        const units = Math.floor(change / unitAmount);
        if (units) {
            changeAmounts[unitName] = units;
            change = change % unitAmount;
            if (!change) {
                // We have no more change that we need to account for, so we
                // can stop iterating
                break;
            }
        }
    }

    return changeAmounts;
};

// Task 4 tests
console.log(calculateChange(1787, 2000));
console.log(calculateChange(2623, 4000));
console.log(calculateChange(501, 1000));