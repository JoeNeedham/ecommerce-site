const func = () => {
    console.log(func === func);
}
func()

Number('1') - 1 == 0

function closestToZero(numbers) {
    if(!numbers.length){
        return 0;
    }
    
    let closest = 0;
    
    for (let i = 0; i < numbers.length ; i++) {
        if (closest === 0) {
            closest = numbers[i];
        } else if (numbers[i] > 0 && numbers[i] <= Math.abs(closest)) {
            closest = numbers[i];
        } else if (numbers[i] < 0 && - numbers[i] < Math.abs(closest)) {
            closest = numbers[i];
        }
    }
    console.log(closest)
    return closest;
    
}
closestToZero([5,6,4,2,87,1])


// Verify a prime number. a prime number is only divisible by itself and 1.
// The whole loop will stop when n and the divisor match. To break out of the loop you can't be divisible from 2 - (#variable-1) 

function isPrime(n){

    var divisor = 2;
    
        while (n > divisor){
        if(n % divisor == 0){
        return false; 
        }
        else
            divisor++;
        }
        console.log('true')
        return true;
}

isPrime(13);
isPrime(137);
isPrime(237);


// Find prime factors of number
function primeFactors(n){
    var factors = [], 
        divisor = 2;
    
    while(n>2){
        if(n % divisor == 0){
            factors.push(divisor); 
            n = n / divisor;
        }
        else{
                divisor++;
        }     
    }
    console.log(factors)
    return factors;
}
primeFactors(30)

// Give a number 'n', find the first 'n' elements of the fibonacci sequence

// [0, 1]

function fibnumber(n){
    array = [0,1]
    for (let i = 0; i < n ; i++) {
        x = array[i] + array[i+1]
        array.push(x);
    }
    return console.log(array.slice(0, n))
}

fibnumber(2)

// given an array of strings with a "$" in them. The character before the dollar sign is deleted.

array = ['f$st', 'st']

function dollaSignDeletion(n){
    for (let i = 0; i < n.length; i++){

    }
}

// Sum All Number in a Range ex. [1,4] = 10

function sumAllNumbers(array){

    const sortedArr = array.sort(compareFunction)

    sum = 0 

    for(let i = sortedArr[0]; i <= sortedArr[1]; i++){
        sum += i;
    }
    return sum
}

function compareFunction(a,b){
    return a-b;
}

console.log(sumAllNumbers([1,4]));