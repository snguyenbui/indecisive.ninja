let pollData = document.getElementById('pollData').innerText;
pollData = JSON.parse(pollData);

// checks length of option for grid ticks, if over 10 charaters, breaks to new line
const strToArray = (str, limit) => {
  const words = str.split(' ')
  let aux = []
  let concat = []
  for (let i = 0; i < words.length; i++) {
    concat.push(words[i])
    let join = concat.join(' ')
    if (join.length > limit) {
      aux.push(join)
      concat = []
    }
  }
  if (concat.length) {
    aux.push(concat.join(' ').trim())
  }
  return aux
}

let maxLength = 5;
const labels = [];
const data = [];
for (let poll of pollData) {
  labels.push(strToArray(poll.option, 10));
  data.push(poll.score);
}

const CHART = document.getElementById('barChart').getContext('2d');
if (maxLength < pollData.length) {
  // document.getElementById('barChart').style.width = '600px';
  $('.chart-container').width("700px")
}

const barData = {
  labels: labels,
  datasets: [{
    label: pollData[0].description,
    data: data,
    backgroundColor: [
      'rgba(255, 0, 40, 0.5)',
      'rgba(255, 159, 64, 0.5)',
      'rgba(255, 205, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(201, 203, 207, 0.5)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

let myBarChart = new Chart(CHART, {
  type: 'bar',
  data: barData,
  options: {
    plugins: {
      title: {
        display: true,
        text: pollData[0].description,
        color: 'rgba(255, 255, 255, 1)',
        font: {
          size: 15
        },
        padding: {
          bottom: 30
        }
      },
      legend: {
        display: false
      }

    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          color: 'rgba(255, 255, 255, 0.8)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      },
      y: {
        grid: {
          tickColor: 'rgba(255, 255, 255, 0.8)',
          color: 'rgba(255, 255, 255, 0.3)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      }
    }
  }
});
