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


    var el = document.createElement("div");
    el.setAttribute("style","position:absolute;top:10%;left:80%;background-color:white;");
    el.innerHTML = `${data.name} just voted`;
    setTimeout(function(){
      el.parentNode.removeChild(el);
    },3000);
    document.body.appendChild(el);
});

