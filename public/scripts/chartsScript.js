


const CHART = document.getElementById('barChart').getContext('2d');
console.log(CHART)

const barData = {
  labels: ['one', 'two', 'three', 'cool'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81],
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
  data: barData
});

console.log(myBarChart)
