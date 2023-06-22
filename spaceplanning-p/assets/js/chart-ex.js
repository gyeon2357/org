var ctx = document.getElementById("chart-1");
var myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["모텔", "호텔", "펜션", "게스트하우스"],
    datasets: [
      {
        label: "# of Votes",
        data: [60, 24, 8.3, 6.7],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
      },
    ],
  },
});
