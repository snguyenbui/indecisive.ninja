const pusher = new Pusher('431d49f7809eb69e6319', {
  cluster: 'us3'
});

const channel = pusher.subscribe('my-channel');

channel.bind('my-event', function(data) {
  const barChartData = [];
  const barChartLabels = [];
  console.log('This is inside our pusher, it is being called')
  let output = "";
  console.log(data.poll)
  for (item of data.poll) {
    barChartData.push(item.score);
    barChartLabels.push(item.option);
    output += `${item.option} ${item.score} <br>`;
  }
  document.getElementById("resultTable").innerHTML = output;

  const CHART = document.getElementById('barChart').getContext('2d');

  myBarChart.data.datasets[0].data = barChartData
  myBarChart.data.labels = barChartLabels;
  myBarChart.update();




});
