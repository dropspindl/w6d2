// Function.prototype.myBind = function(context, ...bindArgs) {
//   return (...callArgs) => {
//     return this.apply(context, bindArgs.concat(callArgs)); 
//   };
// };
el instanceof Array === true; 

[1, 2, 2, 3, 5, 3]
 {2 => [1, 2], 3 => [3, 5]}


Function.prototype.inherits = function(Parent) {
  function Surrogate () {}
  Surrogate.prototype = Parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

Function.prototype.myCurry = function(numArgs) {
  let that = this;
  let args = [];
  
  return function _myCurry(el) {
    args.push(el);
    if (args.length < numArgs) {
      return _myCurry;
    } else {
      return that(...args);
    }
  };
};

function myCurriedSum(numArgs) {
  let args = []; 
  return function _myCurriedsum(el) {
    args.push(el); 
    if (args.length === numArgs) {
      return args.reduce((acc, el) => acc + el);
    } else {
      return _myCurriedsum; 
    }
  };
}





class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

// Function.prototype.myBind = function() {
//   let that = this; 
//   let args = Array.from(arguments); 
//   let ctx = args[0]; 
// 
//   return function () {
//     let cargs = Array.from(arguments); 
//     that.apply(ctx, args.slice(1).concat(cargs)); 
//   };
// }; 
Function.prototype.myBind = function() {
  const context = Array.from(arguments)[0];
  const args = Array.from(arguments).slice(1); 
  let that = this; 

  return function() {
    let xargs = args.concat(Array.from(arguments));
    that.call(context, ...xargs); 
  };
};

Function.prototype.myApply = function(context, ...args) {
  return this.bind(context, ...args)();
};

// 
console.log(markov.says("meow", "Ned"));
console.log(markov.says.myBind(pavlov, "meow", "Kush")());
console.log(markov.says.myBind(pavlov)("meow", "a tree"));
console.log(markov.says.myBind(pavlov, "meow")("Markov"));


function bubbleSort(arr, func) {
  
  if (!func) {
    func = function(a, b) {
      if (a < b) {
        return - 1; 
      } else if (a === b) {
        return 0; 
      } else {
        return 1; 
      }
    };
  }
  
  
  let result = arr.slice(0); 
  let sorted = false; 
  while (!sorted) {
    sorted = true; 
    for (var i = 0; i < result.length; i++) {
      let j = i + 1; 
      if (result[i] > result[j]) {
        let holder = result[i];
        result[i] = result[j];
        result[j] = holder; 
        sorted = false; 
      }
    }
  }
  return result; 
}

function quickSort(arr, func) {
  if (arr.length <= 1) return arr;
  
  if (!func) {
    func = function(a, b){
      if (a <b) return -1;
      return 1;
    };
  }

  let pivot = arr[0];
  let left = [];
  let right = [];
  
  for (var i = 1; i < arr.length; i++) {
    let el = arr[i];
    if (func(el, pivot) === -1) {
      left.push(el);
    } else {
      right.push(el);
    }
  }
  
  left = quickSort(left, func);
  right = quickSort(right, func);
  
  return left.concat([pivot]).concat(right);
}
function merge(left, right) {
  let result = []; 
  
  while(left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift()); 
    }
  }
  
  return result.concat(left).concat(right); 
}

Array.prototype.mergeSort = function() {
  if (this.length <= 1) return this;
  
  let mid = Math.floor(this.length / 2); 
  let left = this.slice(0, mid).mergeSort(); 
  let right = this.slice(mid).mergeSort();
  
  // return left.mergeSort.concat(right.mergeSort); 
  let bob = merge(left, right); 
  return bob;  
};


Array.prototype.myBSearch = function(target, func) {
  if (this.length <= 1 ) return null;
  
  let mid = Math.floor(this.length / 2);
  if (this[mid] === target ) return mid;
  
  if (!func) {
    func = function(a, b) {
      if (a < b) return -1;
      return 1;
    };
  }
  
  if (func(this[mid], target) === 1) {
    return this.slice(0, mid).myBSearch(target, func);
  } else {
    let result = this.slice(mid+1).myBSearch(target, func);
    return result === null ? null : result + mid + 1;
  }
};


function jumbleSort(str, alpha) {
  alpha = alpha || "abcdefghijklmnopqrstuvwxyz";
  str = str.split('');
  
  let sorted = false;
  while(!sorted) {
    sorted = true;
    for (var i = 0; i < str.length; i++) {
      if (i === str.length - 1) continue;
      let curr = str[i];
      let next = str[i + 1];

      if (alpha.indexOf(curr) > alpha.indexOf(next)) {
        str[i] = next;
        str[i+ 1] = curr;
        sorted = false;
      }
    }
  }
  return str.join('');
}







