var xValues = ["Applcation Filled","Resume Shorlisted", "OA Cleared", "Shortlisted for HR round"];
    var yValues = [123,55, 40, 28];
    var barColors = [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)'
    ];

    new Chart("myChart", {
      type: "doughnut",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        title: {
          display: true,
          text: "Insights of my application"
        }
      }
    });