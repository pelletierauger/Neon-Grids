


let Grid = function(seed) {
  this.seed = seed;
};


// x = 0, y = 1
let seed = [
  [0, 3],
  [2, 3, 2], 
  [3, 3, 3]
];

// x => 0, 1.6
// y => 0, 1

for (let i = 0; i < seed[0][1]; i++) {
  let y = (1 / seed[0][1]) * i;
  for (let j = 0; j < seed[1][i]; j++) {
    let x = (1.6 / seed[1][i]) * j;
      // for (let k = 0; k < seed[2][j]; k++) {

      // }
      
  }
}