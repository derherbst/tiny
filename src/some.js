function sum(...numbers) {
    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }

    return sum;
}

function avg(...numbers) {
    console.log(...numbers);
    return sum(...numbers) / numbers.length;
}

console.log(avg(1, 2));

export default avg;