function getFrequency(array) {
    const frequency = new Map();
    for (element of array) {
        if (frequency.has(element)) {
            frequency.set(element, frequency.get(element) + 1);
        } else {
            frequency.set(element, 1);
        }
    }
    return frequency;
}

function findAllKeyInMap(map, searchValue) {
    let result = [];
    for (let [key, value] of map) {
        if (value === searchValue) {
            result.push(key);
        }
    }
    return result;
}

function findMostRepetition(array) {
    const frequency = getFrequency(array);
    const maxFrequency = Math.max(...frequency.values());
    return findAllKeyInMap(frequency, maxFrequency);
}

function findMostRepetition1(array) {
    const frequency = {};
    let maxFrequency = [];
    let maxValue = 0;

    for (element of array) {
        if (frequency[element] === undefined) {
            frequency[element] = 1;
        } else {
            frequency[element]++;
        }

        if (frequency[element] > maxValue) {
            maxValue = frequency[element];
            maxFrequency = [element];
        } else if (frequency[element] === maxValue) {
            maxFrequency.push(element);
        }
    }
    return maxFrequency;
}

const array = [1, 2, 2, 2, 3, 4, 4, 4, 5, 6];
console.log(findMostRepetition(array));
console.log(findMostRepetition1(array));
