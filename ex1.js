function removeDuplicate1(array) {
    const result = [];
    for (element of array) {
        if (result.indexOf(element) === -1) {
            result.push(element);
        }
    }
    return result;
}

function removeDuplicate2(array) {
    const result = [];
    array.forEach((element) => {
        if (result.indexOf(element) === -1) {
            result.push(element);
        }
    });
    return result;
}

function removeDuplicate3(array) {
    return array.reduce((acc, curr) => {
        if (acc.indexOf(curr) === -1) {
            acc.push(curr);
        }
        return acc;
    }, []);
}

function removeDuplicate4(array) {
    return array.filter((element, index) => array.indexOf(element) === index);
}

function removeDuplicate5(array) {
    return Array.from(new Set(array));
}

function removeDuplicate6(array) {
    result = [];
    checker = {};
    for (element of array) {
        if (checker[element] === undefined) {
            result.push(element);
            checker[element] = true;
        }
    }
    return result;
}

array = [1, 2, 2, 3, 4, 4, 4, 5, 6];

functions = [
    removeDuplicate1,
    removeDuplicate2,
    removeDuplicate3,
    removeDuplicate4,
    removeDuplicate5,
    removeDuplicate6,
];
for (f of functions) {
    console.log(f(array));
}
