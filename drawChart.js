function drawPieChart(
  chartId,
  labels,
  data,
  title,
  legendPosition = "top",
  colorArray = null
) {
  const ctx = document.getElementById(chartId).getContext("2d");

  // Destroy existing chart if it exists
  if (window.chartInstances && window.chartInstances[chartId]) {
    window.chartInstances[chartId].destroy();
  }

  // Check if data is an object with backgroundColor and data properties
  const isDataObject = typeof data === "object" && !Array.isArray(data);
  const chartData = isDataObject ? data.data : data;

  // Calculate total for percentages using the actual data
  const total = chartData.reduce((sum, value) => sum + value, 0);

  // Determine background colors based on parameters
  let backgroundColor;
  if (colorArray) {
    backgroundColor = colorArray;
  } else if (isDataObject && data.backgroundColor) {
    backgroundColor = data.backgroundColor;
  } else {
    backgroundColor = [
      "#9AB3F5",
      "#97FEED",
      "#7579E7",
      "#35A29F",
      "#D32D41",
      "#DBAE58",
      "#0091D5",
      "#AC3E31",
      "#A5D8DD",
      "#23282D",
      "#F1F1F1",
      "#20283E",
    ];
  }

  // Create a new pie chart
  const newChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          data: chartData,
          backgroundColor: backgroundColor,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: legendPosition,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = context.raw;
              const percentage = ((value / total) * 100).toFixed(2);
              return `${
                context.label
              }: ${percentage}% (${value.toLocaleString()})`;
            },
          },
        },
        title: {
          display: true,
          text: title,
        },
      },
    },
  });

  // Store the new chart instance
  if (!window.chartInstances) {
    window.chartInstances = {};
  }
  window.chartInstances[chartId] = newChart;
}

function drawDonutChart(
  chartId,
  labels,
  data,
  title,
  legendPosition = "top",
  colorArray = null
) {
  const ctx = document.getElementById(chartId).getContext("2d");

  // Destroy existing chart if it exists
  if (window.chartInstances && window.chartInstances[chartId]) {
    window.chartInstances[chartId].destroy();
  }

  // Check if data is an object with backgroundColor
  const chartData = data.data || data;

  // Determine background colors based on parameters
  const backgroundColor = colorArray ||
    data.backgroundColor || [
      "#7579E7", // Green
      "#9AB3F5", // Dark blue
      "#64DFDF", // Red
      "#80FFDB", // Orange
      "rgb(197, 158, 234)", // Yellow
      "rgb(237, 134, 227)", // Purple
      "rgb(106, 223, 154)", // Yellow
      "rgb(198, 102, 227)",
      "rgb(179, 154, 94)", // Yellow
      "rgb(166, 69, 157)", // Purple
      "rgb(148, 115, 232)", // Yellow
      "rgb(188, 238, 126)",
    ];

  // Calculate total for percentages
  const total = chartData.reduce((sum, value) => sum + value, 0);

  // Create a new donut chart
  const newChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: chartData,
          backgroundColor: backgroundColor,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: legendPosition,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = context.raw;
              const percentage = ((value / total) * 100).toFixed(2);
              return `${
                context.label
              }: ${percentage}% (${value.toLocaleString()})`;
            },
          },
        },
        title: {
          display: true,
          text: title,
        },
      },
      cutout: "50%",
    },
  });

  // Store the new chart instance
  if (!window.chartInstances) {
    window.chartInstances = {};
  }
  window.chartInstances[chartId] = newChart;
}

function drawBarChart(
  chartId,
  labels,
  data,
  title,
  legendPosition = "top",
  colorArray = null
) {
  const ctx = document.getElementById(chartId).getContext("2d");
  const maxDataValue = Math.max(...data);
  // Destroy existing chart if it exists
  if (window.chartInstances && window.chartInstances[chartId]) {
    window.chartInstances[chartId].destroy();
  }

  // Use default color if colorArray is not provided
  const backgroundColor = colorArray
    ? Array.isArray(colorArray)
      ? colorArray[0]
      : colorArray
    : "#6499E9";

  // Create a new chart
  const newChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: backgroundColor,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          suggestedMax: maxDataValue * 1.2,
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: legendPosition,
        },
        title: {
          display: true,
          text: title,
        },
      },
    },
  });

  // Store the new chart instance
  if (!window.chartInstances) {
    window.chartInstances = {};
  }
  window.chartInstances[chartId] = newChart;
}

function drawGroupedBarChart(
  chartId,
  labels,
  data,
  title,
  legendPosition = "top",
  colorArray = null
) {
  const ctx = document.getElementById(chartId).getContext("2d");

  // Destroy existing chart if it exists
  if (window.chartInstances && window.chartInstances[chartId]) {
    window.chartInstances[chartId].destroy();
  }

  // Find the maximum value across all datasets for scaling
  let maxValue = 0;
  data.forEach((dataset) => {
    const datasetMax = Math.max(...dataset.data);
    maxValue = Math.max(maxValue, datasetMax);
  });

  // Determine background colors based on parameters
  const defaultColors = ["#1C4E80", "#EA6A47"];

  data.forEach((dataset, index) => {
    if (!dataset.backgroundColor) {
      dataset.backgroundColor = colorArray
        ? colorArray[index % colorArray.length]
        : defaultColors[index % defaultColors.length];
    }
  });

  // Create a new grouped bar chart
  const newChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: data,
    },
    options: {
      responsive: true,
      scales: {
        y: {
          suggestedMax: maxValue * 1.2,
          beginAtZero: true,
          title: {
            display: true,
            text: title,
          },
        },
        x: {
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 0,
          },
        },
      },
      plugins: {
        legend: {
          position: legendPosition,
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
    },
  });

  // Store the new chart instance
  if (!window.chartInstances) {
    window.chartInstances = {};
  }
  window.chartInstances[chartId] = newChart;
}

function drawStackedBarChart(
  chartId,
  labels,
  data,
  title,
  legendPosition = "top",
  colorArray = null
) {
  const ctx = document.getElementById(chartId).getContext("2d");

  // Destroy existing chart if it exists
  if (window.chartInstances && window.chartInstances[chartId]) {
    window.chartInstances[chartId].destroy();
  }

  // Calculate stackedMax correctly
  const stackedSums = new Array(labels.length).fill(0);
  data.forEach((dataset) => {
    dataset.data.forEach((value, index) => {
      stackedSums[index] += value;
    });
  });
  const stackedMax = Math.max(...stackedSums);

  // Determine background colors based on parameters
  const defaultColors = ["#1C4E80", "#EA6A47"];

  data.forEach((dataset, index) => {
    if (!dataset.backgroundColor) {
      dataset.backgroundColor = colorArray
        ? colorArray[index % colorArray.length]
        : defaultColors[index % defaultColors.length];
    }
  });

  const newChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: data,
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 0,
          },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          suggestedMax: stackedMax * 1.1, // 10% extra space above
          title: {
            display: true,
            text: title,
          },
        },
      },
      plugins: {
        legend: {
          position: legendPosition,
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
        title: {
          display: true,
          text: title,
        },
      },
    },
  });

  // Store the new chart instance
  if (!window.chartInstances) {
    window.chartInstances = {};
  }
  window.chartInstances[chartId] = newChart;
}

function drawHorizontalBarChart(
  chartId,
  labels,
  data,
  title,
  legendPosition = "top",
  colorArray = null
) {
  const ctx = document.getElementById(chartId).getContext("2d");
  const maxDataValue = Math.max(...data);

  // Destroy existing chart if it exists
  if (window.chartInstances && window.chartInstances[chartId]) {
    window.chartInstances[chartId].destroy();
  }

  // Determine background colors based on parameters
  const backgroundColor = colorArray ? colorArray[0] : "#32E0C4";

  // Create a new horizontal bar chart
  const newChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Number of Bookings',
          data: data,
          backgroundColor: backgroundColor,
        },
      ],
    },
    options: {
      indexAxis: "y", // This makes the bars horizontal
      maintainAspectRatio: true,
      aspectRatio: 2,
      responsive: true,
      scales: {
        x: {
          suggestedMax: maxDataValue * 1.4, // 10% extra space
          beginAtZero: true,
        },
        y: {
          ticks: {
            autoSkip: false,
            maxRotation: 0,
          },
        },
      },
      plugins: {
        legend: {
          position: legendPosition,
        },
        title: {
          display: true,
          text: title,
        },
      },
    },
  });

  // Store the new chart instance
  if (!window.chartInstances) {
    window.chartInstances = {};
  }
  window.chartInstances[chartId] = newChart;
}

function drawComboChart(
  chartId,
  labels,
  data1,
  data2,
  title,
  legendPosition = "top",
  colorArray = null
) {
  const ctx = document.getElementById(chartId).getContext("2d");

  // Destroy existing chart if it exists
  if (window.chartInstances && window.chartInstances[chartId]) {
    window.chartInstances[chartId].destroy();
  }

  // Calculate max values for both datasets
  const maxBarValue = Math.max(...data1);
  const maxLineValue = Math.max(...data2);

  // Determine background colors based on parameters
  const defaultColors = ["#64DFDF", "#6930C3"];
  const barColor =
    colorArray && colorArray[0] ? colorArray[0] : defaultColors[0];
  const lineColor =
    colorArray && colorArray[1] ? colorArray[1] : defaultColors[1];

  const newChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: " Occupancy Rate % (Bar)",
          data: data1,
          backgroundColor: barColor,
          borderColor: barColor,
          borderWidth: 1,
          order: 2,
          yAxisID: "y",
        },
        {
          label:" Average Daily Rate $ (Line)",
          data: data2,
          type: "line",
          borderColor: lineColor,
          borderWidth: 2,
          fill: false,
          order: 1,
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
          title: {
            display: true,
            text:" Occupancy Rate (%)",
          },
          beginAtZero: true,
          suggestedMax: maxBarValue * 1.2, // Add 20% space above max value
          grid: {
            drawOnChartArea: true,
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "ADR ($)",
          },
          beginAtZero: true,
          suggestedMax: maxLineValue * 1.2, // Add 20% space above max value
          grid: {
            drawOnChartArea: false,
          },
        },
      },
      plugins: {
        legend: {
          position: legendPosition,
        },
        title: {
          display: true,
          text: title,
        },
      },
    },
  });

  // Store the new chart instance
  if (!window.chartInstances) {
    window.chartInstances = {};
  }
  window.chartInstances[chartId] = newChart;
}

function drawLineChart(
  chartId,
  labels,
  data,
  title,
  legendPosition = "top",
  colorArray = null
) {
  const ctx = document.getElementById(chartId).getContext("2d");
  const maxDataValue = Math.max(...data);

  // Destroy existing chart if it exists
  if (window.chartInstances && window.chartInstances[chartId]) {
    window.chartInstances[chartId].destroy();
  }

  // Determine border color based on parameters
  const borderColor = colorArray ? colorArray[0] : "#32E0C4";

  // Create a new line chart
  const newChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          borderColor: borderColor,
          backgroundColor: "transparent",
          tension: 0.4,
          fill: true,
          pointStyle: "circle",
          pointRadius: 3.5,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          suggestedMax: maxDataValue * 1.1,
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: legendPosition,
        },
        title: {
          display: true,
          text: title,
        },
      },
    },
  });

  // Store the new chart instance
  if (!window.chartInstances) {
    window.chartInstances = {};
  }
  window.chartInstances[chartId] = newChart;
}

function drawMultiLineChart(
  chartId,
  labels,
  dataset1,
  dataset2,
  dataset3,
  title
) {
  const ctx = document.getElementById(chartId).getContext("2d");

  // Destroy existing chart if it exists
  if (window.chartInstances && window.chartInstances[chartId]) {
    window.chartInstances[chartId].destroy();
  }

  // Filter out undefined datasets
  const datasets = [];
  if (dataset1 && dataset1.data) {
    datasets.push({
      label: dataset1.label,
      data: dataset1.data,
      borderColor: dataset1.borderColor || "#1C4E80",
      backgroundColor: "transparent",
      fill: false,
      yAxisID: "y",
    });
  }
  if (dataset2 && dataset2.data) {
    datasets.push({
      label: dataset2.label,
      data: dataset2.data,
      borderColor: dataset2.borderColor || "#EA6A47",
      backgroundColor: "transparent",
      fill: false,
      yAxisID: "y",
    });
  }
  if (dataset3 && dataset3.data) {
    datasets.push({
      label: dataset3.label,
      data: dataset3.data,
      borderColor: dataset3.borderColor || "#009105",
      backgroundColor: "transparent",
      fill: false,
      yAxisID: "y",
    });
  }

  // Find max value across all datasets
  const maxDataValue = Math.max(...datasets.flatMap((dataset) => dataset.data));

  // Create new chart instance
  const newChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: title,
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          suggestedMax: maxDataValue * 1.1,
          beginAtZero: true,
          position: "left",
          title: {
            display: true,
            text: "Profit ($)",
          },
        },
      },
    },
  });

  // Store the new chart instance
  if (!window.chartInstances) {
    window.chartInstances = {};
  }
  window.chartInstances[chartId] = newChart;
}

export {
  drawBarChart,
  drawPieChart,
  drawGroupedBarChart,
  drawComboChart,
  drawDonutChart,
  drawMultiLineChart,
  drawStackedBarChart,
  drawHorizontalBarChart,
  drawLineChart,
};
