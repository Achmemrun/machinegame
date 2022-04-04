
//                   ---===≡≡≡ machinegame ≡≡≡===---

// Your goal is to capture the red player's flag with your army of robots.
// The flag will be defended by red's robots.

var chargesCoords = [];

for(y=0; y < 2000; y++){
   chargesCoords[y] = [];
}

var charges = [];

function play(state) {

  // `state` contains information about what your robots can see:
  // state = {
  //  robots: [         → an array of your robots
  //   { x, y,          → integers, the position of your robot on the grid
  //     charges }      → integer, the health of your robot
  //  ],
  //  charges: [        → an array of charges on the ground
  //   { x, y }
  //  ],
  //  red: {            → what you can see from the red player
  //   robots: [        → red's robots
  //    { x, y,         → the position of the robot
  //      charges }     → the health of the robot
  //    ],
  //    flag: { x, y }  → red's flag, if you already found it
  //  },
  // }

  // You can give one of 4 instructions to your robot:
  //
  // 1. robot.moveTo(destination)
  //  The robot attempts to move to that position on the grid, one step each
  //  turn, including diagonally (like a king in chess).
  // `destination` can be either an object: `robot.moveTo(flag)` or coordinates
  // `robot.moveTo({x:1, y:2})`.
  //  Robots cannot move to a position occupied by red's robot.
  //
  // 2. robot.collect()
  //  The robot will attempt to pickup a charge on the ground.
  //  If successful, it will increment the robot.charges.
  //
  // 3. robot.clone()
  //  If the robot has 3 or more charges, spend 2 to create a new robot.
  //  There is a maximum of 256 robots per player.
  //
  // 4. robot.attack(redRobot)
  //  If your robot is next to another robot (including diagonal), it can
  //  smite them and remove 1 charge from them. If a robot reaches 0 charges,
  //  it drops dead.
  //
  // You win when one of your robots is on red's flag.

  // Change the `play` function so it handles any state and gives instructions
  // to your robots to move, collect charges, clone, attack and defend, and
  // ultimately capture red's flag.

  // Additional docs can be found in the menu
  for (var s = 0; s < state.charges.length; s++) {
    var charge = state.charges[s];
    
    if (!chargesCoords[charge.y+1000][charge.x+1000]){
      chargesCoords[charge.y+1000][charge.x+1000] = charge;
      charges.push(charge);
    }
  }
  
  var targeted = new Set();
  
  for (var i = 0; i < state.robots.length; i++) {
    var robot = state.robots[i];
    
    var flag = state.red.flag;
    if (flag) {
      robot.moveTo(flag);
      continue;
    }
    
    if (robot.charges >= 3) {
      robot.clone();
      continue;
    }
    
    var closestRed;
    var closestRedDistance = Number.MAX_SAFE_INTEGER;
    
    for (var r = 0; r < state.red.robots.length; r++) {
      var red = state.red.robots[r];
      
      var dist = distance(robot, red);
      if (dist < closestRedDistance) {
        closestRed = red;
        closestRedDistance = dist;
      }
    }
    
    if (closestRed) {
      if (closestRedDistance === 1) {
        robot.attack(closestRed);
      } else {
        robot.moveTo(closestRed);
      }
      
      continue;
    }
    
    var closestCharge;
    var closestChargeDistance = Number.MAX_SAFE_INTEGER;
    
    for (var s = 0; s < charges.length; s++) {
      var charge = charges[s];
      if (targeted.has(charge))
        continue;
      
      var dist = distance(robot, charge);
      if (dist < closestChargeDistance) {
        closestCharge = charge;
        closestChargeDistance = dist;
      }
    }
    
    if (closestCharge) {
      if (closestChargeDistance === 0) {
        robot.collect(closestCharge);
        
        var c = chargesCoords[closestCharge.y+1000][closestCharge.x+1000];
        charges.splice(charges.indexOf(c), 1);
        
        chargesCoords[closestCharge.y+1000][closestCharge.x+1000] = null;
      }
      else {
        targeted.add(closestCharge);
        robot.moveTo(closestCharge);
      }
    }
    
    // var flag = state.red.flag;
    // if (flag) {
    //   robot.moveTo(flag);
    //   continue;
    // }
  
    // if(robot.charges < 3){        
    //   var charge = state.charges[i];
    //   if (charge) {
    //     if (charge.x === robot.x && charge.y === robot.y){
    //       robot.collect();
    //     } else {
    //       robot.moveTo(charge);
    //     }
    //   } else {            
    //     var x = Math.floor(Math.random()*3)-1;
    //     var y = Math.floor(Math.random()*3)-1;
    //     robot.moveTo({x:robot.x + x, y:robot.y + y});
    //   }
    // } else {        
    //   robot.clone();
    // }
  }
}


function distance(coord1, coord2) {
  var dx = Math.abs(coord1.x - coord2.x);
  var dy = Math.abs(coord1.y - coord2.y);
  
  return Math.max(dx, dy);
}




// ------------------ previous code

// 
// function play(state) {
// 
//   for (var i = 0; i < state.robots.length; i++) {
//     var robot = state.robots[i];
//     
//     var flag = state.red.flag;
//     if (flag) {
//       robot.moveTo(flag);
//       continue;
//     }
//     
//     if(robot.charges < 3){        var charge = state.charges[i];
//         if (charge){
//             if (charge.x === robot.x && charge.y === robot.y){
//                 robot.collect();
//             }
//             else{
//                 robot.moveTo(charge);
//             }
//         }
//         else{            var x = Math.floor(Math.random()*3)-1;
//             var y = Math.floor(Math.random()*3)-1;
//             robot.moveTo({x:robot.x + x, y:robot.y + y});
//         }
//     } else {        robot.clone();
//     }
//   }
// 
// }
// 
// 
// 
// 
// 
// 
// // ------------------ previous code
// 
// // 
// // function play(state) {
// //   var robot = state.robots[0];
// //   var flag = state.red.flag;
// // 
// //   // [your code here]
// //   robot.moveTo(flag);
// //   // Add some code so the robot will move to the flag.
// // 
// // }
// // 