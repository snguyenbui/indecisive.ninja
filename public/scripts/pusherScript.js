const pusher = new Pusher('431d49f7809eb69e6319', {
  cluster: 'us3'
});

const channel = pusher.subscribe('my-channel');

channel.bind(`my-event-${window.location.href.split('/')[4]}`, function(data) {
    const barChartData = [];
    const barChartLabels = [];
    for (item of data.poll) {
      barChartData.push(item.score);
      barChartLabels.push(item.option);
    }
    myBarChart.data.datasets[0].data = barChartData
    myBarChart.data.labels = barChartLabels;
    myBarChart.update();
});
