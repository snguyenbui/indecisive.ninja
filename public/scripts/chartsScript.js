
let pollData = document.getElementById('pollData').innerText;
pollData = JSON.parse(pollData);
console.log(pollData)

const labels = [];
const data = [];
for (let poll of pollData) {
  labels.push(poll.option);
  data.push(poll.score);
}

const CHART = document.getElementById('barChart').getContext('2d');

const barData = {
  labels: labels,
  datasets: [{
    label: pollData[0].description,
    data: data,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)'

    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)'

    ],
    borderWidth: 1
  }]
}

let myBarChart = new Chart(CHART, {
  type: 'bar',
  data: barData,
  options: {
    responsive: false
  }
});

