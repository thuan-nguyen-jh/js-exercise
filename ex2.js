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

const array = [1, 2, 2, 2, 3, 4, 4, 4, 5, 6];
console.log(findMostRepetition(array));
