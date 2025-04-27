let balloons = [];

function generateArray() {
  balloons = [];
  for (let i = 0; i < 10; i++) {
    balloons.push(Math.floor(Math.random() * 90) + 10);
  }
  displayArray();
  document.getElementById("max-coins").textContent = "--"; // Reset max coins
}

function bubbleSort() {
  let arr = [...balloons];
  let n = arr.length;

  let i = 0;
  let j = 0;

  const interval = setInterval(() => {
    if (i < n) {
      if (j < n - i - 1) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap the balloons
          balloons = [...arr]; // Update the balloon array
          displayArray(); // Update the displayed array with animation
        }
        j++;
      } else {
        j = 0;
        i++;
      }
    } else {
      clearInterval(interval);
    }
  }, 150); // Interval for sorting visualization
}

function displayArray() {
  const container = document.getElementById("array-container");
  container.innerHTML = ''; // Clear previous display
  balloons.forEach((val, index) => {
    const div = document.createElement("div");
    div.textContent = val; // Display each balloon value
    div.classList.add('visible'); // Add visibility class to trigger fade-in
    container.appendChild(div);
  });
}

function calculateMaxCoins() {
  const popSound = document.getElementById('pop-sound');
  popSound.play(); // Play sound when calculating max coins

  const nums = [1, ...balloons, 1]; // Add virtual balloons at both ends
  const n = balloons.length;
  const dp = Array.from({ length: n + 2 }, () => Array(n + 2).fill(0)); // Initialize DP table

  for (let len = 1; len <= n; len++) {
    for (let left = 1; left <= n - len + 1; left++) {
      let right = left + len - 1;
      for (let i = left; i <= right; i++) {
        const coins = nums[left - 1] * nums[i] * nums[right + 1] +
                      dp[left][i - 1] + dp[i + 1][right];
        dp[left][right] = Math.max(dp[left][right], coins); // Update max coins
      }
    }
  }

  // Bounce animation on result
  const maxCoinsElem = document.getElementById("max-coins");
  maxCoinsElem.textContent = dp[1][n]; // Display max coins
  maxCoinsElem.classList.add('bounce'); // Trigger bounce animation
}
