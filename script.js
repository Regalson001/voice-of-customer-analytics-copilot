
/* ==========================================
   INSIGHTIQ — VOICE OF CUSTOMER ANALYTICS
   Interactive Frontend Demonstration
========================================== */

/* 1. SAMPLE CUSTOMER FEEDBACK DATA */

const feedbackData = [
  {
    id: 1,
    customer: "Olivia Martin",
    initials: "OM",
    feedback: "The delivery was incredibly fast. Very impressed!",
    topic: "Delivery",
    sentiment: "Positive",
    date: "2026-11-17"
  },
  {
    id: 2,
    customer: "James Wilson",
    initials: "JW",
    feedback: "The product quality was excellent and exceeded expectations.",
    topic: "Product Quality",
    sentiment: "Positive",
    date: "2026-11-16"
  },
  {
    id: 3,
    customer: "Sophia Chen",
    initials: "SC",
    feedback: "My order arrived three days late with no notification.",
    topic: "Delivery",
    sentiment: "Negative",
    date: "2026-11-15"
  },
  {
    id: 4,
    customer: "Daniel Smith",
    initials: "DS",
    feedback: "Customer support resolved my issue quickly.",
    topic: "Customer Support",
    sentiment: "Positive",
    date: "2026-11-14"
  },
  {
    id: 5,
    customer: "Emma Johnson",
    initials: "EJ",
    feedback: "The subscription price is too expensive for the features.",
    topic: "Pricing",
    sentiment: "Negative",
    date: "2026-11-13"
  },
  {
    id: 6,
    customer: "Noah Brown",
    initials: "NB",
    feedback: "The service is okay, but there is room for improvement.",
    topic: "Customer Support",
    sentiment: "Neutral",
    date: "2026-11-12"
  },
  {
    id: 7,
    customer: "Ava Thompson",
    initials: "AT",
    feedback: "Excellent customer service and a very smooth experience.",
    topic: "Customer Support",
    sentiment: "Positive",
    date: "2026-11-11"
  },
  {
    id: 8,
    customer: "Liam Davis",
    initials: "LD",
    feedback: "The packaging was damaged when my order arrived.",
    topic: "Product Quality",
    sentiment: "Negative",
    date: "2026-11-10"
  },
  {
    id: 9,
    customer: "Mia Anderson",
    initials: "MA",
    feedback: "Great value for money. I would definitely recommend it.",
    topic: "Pricing",
    sentiment: "Positive",
    date: "2026-11-09"
  },
  {
    id: 10,
    customer: "Ethan Thomas",
    initials: "ET",
    feedback: "The delivery tracking information was confusing.",
    topic: "Delivery",
    sentiment: "Negative",
    date: "2026-11-08"
  },
  {
    id: 11,
    customer: "Isabella Garcia",
    initials: "IG",
    feedback: "Everything worked as expected. Nothing special.",
    topic: "Product Quality",
    sentiment: "Neutral",
    date: "2026-11-07"
  },
  {
    id: 12,
    customer: "Lucas Martinez",
    initials: "LM",
    feedback: "The team was helpful and solved my problem.",
    topic: "Customer Support",
    sentiment: "Positive",
    date: "2026-11-06"
  }
];

/* 2. APPLICATION STATE */

let currentFeedback = [...feedbackData];
let sentimentChart;
let trendChart;

/* 3. DOM ELEMENTS */

const feedbackTable = document.getElementById("feedbackTable");
const feedbackSearch = document.getElementById("feedbackSearch");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const dateFilter = document.getElementById("dateFilter");
const trendFilter = document.getElementById("trendFilter");

/* 4. HELPER FUNCTIONS */

function getSentimentCounts(data) {
  return {
    Positive: data.filter(item => item.sentiment === "Positive").length,
    Neutral: data.filter(item => item.sentiment === "Neutral").length,
    Negative: data.filter(item => item.sentiment === "Negative").length
  };
}

function getPercentage(value, total) {
  return total ? ((value / total) * 100).toFixed(1) : "0.0";
}

function formatDate(date) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

/* 5. RENDER FEEDBACK TABLE */

function renderFeedback(data) {
  feedbackTable.innerHTML = "";

  document.getElementById("tableCount").textContent =
    `Showing ${data.length} feedback records`;

  if (!data.length) {
    feedbackTable.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center;padding:30px">
          No matching feedback found.
        </td>
      </tr>
    `;
    return;
  }

  data.forEach(item => {
    const badgeClass = {
      Positive: "badge-positive",
      Neutral: "badge-neutral",
      Negative: "badge-negative"
    }[item.sentiment];

    const row = document.createElement("tr");

    [
      item.customer,
      item.feedback,
      item.topic,
      item.sentiment,
      formatDate(item.date)
    ].forEach((value, index) => {
      const cell = document.createElement("td");

      if (index === 3) {
        const badge = document.createElement("span");
        badge.className = `sentiment-badge ${badgeClass}`;
        badge.textContent = value;
        cell.appendChild(badge);
      } else {
        cell.textContent = value;
      }

      row.appendChild(cell);
    });

    feedbackTable.appendChild(row);
  });
}

/* 6. SENTIMENT DOUGHNUT CHART */

function createSentimentChart(data) {
  const counts = getSentimentCounts(data);

  const total = data.length || 1;

  document.getElementById("positiveRate").textContent =
    getPercentage(counts.Positive, total) + "%";

  document.getElementById("negativeRate").textContent =
    getPercentage(counts.Negative, total) + "%";

  document.querySelector(".doughnut-center strong").textContent =
    getPercentage(counts.Positive, total) + "%";

  document.querySelector(".legend").innerHTML = `
    <div>
      <span class="legend-dot positive-dot"></span>
      Positive <strong>${getPercentage(counts.Positive, total)}%</strong>
    </div>
    <div>
      <span class="legend-dot neutral-dot"></span>
      Neutral <strong>${getPercentage(counts.Neutral, total)}%</strong>
    </div>
    <div>
      <span class="legend-dot negative-dot"></span>
      Negative <strong>${getPercentage(counts.Negative, total)}%</strong>
    </div>
  `;

  if (sentimentChart) {
    sentimentChart.destroy();
  }

  sentimentChart = new Chart(
    document.getElementById("sentimentChart"),
    {
      type: "doughnut",
      data: {
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [{
          data: [counts.Positive, counts.Neutral, counts.Negative],
          backgroundColor: ["#25b78f", "#8e85eb", "#e67886"],
          borderWidth: 0,
          hoverOffset: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "76%",
        plugins: {
          legend: { display: false }
        }
      }
    }
  );
}

/* 7. CUSTOMER FEEDBACK TREND CHART */

function createTrendChart(data) {
  const dates = [...new Set(data.map(item => item.date))].sort();

  const selectedType = trendFilter.value;

  const datasets = [
    {
      label: "Positive",
      sentiment: "Positive",
      color: "#25b78f"
    },
    {
      label: "Negative",
      sentiment: "Negative",
      color: "#e67886"
    },
    {
      label: "Neutral",
      sentiment: "Neutral",
      color: "#8e85eb"
    }
  ];

  const visibleDatasets = selectedType === "all"
    ? datasets
    : datasets.filter(item => item.sentiment.toLowerCase() === selectedType);

  if (trendChart) {
    trendChart.destroy();
  }

  trendChart = new Chart(
    document.getElementById("trendChart"),
    {
      type: "line",
      data: {
        labels: dates.map(date => formatDate(date)),
        datasets: visibleDatasets.map(item => ({
          label: item.label,
          data: dates.map(date =>
            data.filter(feedback =>
              feedback.date === date &&
              feedback.sentiment === item.sentiment
            ).length
          ),
          borderColor: item.color,
          backgroundColor: item.color,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          fill: false
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: "index"
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              boxWidth: 7,
              padding: 15,
              font: { size: 9 }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 8 }, maxRotation: 45 }
          },
          y: {
            beginAtZero: true,
            ticks: { precision: 0, font: { size: 9 } },
            grid: { color: "#f0f2f7" }
          }
        }
      }
    }
  );
}

/* 8. UPDATE DASHBOARD */

function updateDashboard(data) {
  currentFeedback = [...data];

  const counts = getSentimentCounts(data);

  document.getElementById("totalFeedback").textContent =
    data.length.toLocaleString();

  const positive = counts.Positive;
  const total = data.length || 1;

  document.getElementById("satisfaction").textContent =
    getPercentage(positive, total) + "%";

  createSentimentChart(data);
  createTrendChart(data);
  renderFeedback(data);
}

/* 9. DATE FILTER */

function applyDateFilter() {
  const days = Number(dateFilter.value);

  const newestDate = new Date(
    Math.max(...feedbackData.map(item => new Date(item.date).getTime()))
  );

  const startDate = new Date(newestDate);
  startDate.setDate(startDate.getDate() - days + 1);

  const filtered = feedbackData.filter(item => {
    const date = new Date(item.date + "T00:00:00");
    return date >= startDate && date <= newestDate;
  });

  updateDashboard(filtered);
}

dateFilter.addEventListener("change", applyDateFilter);

trendFilter.addEventListener("change", () => {
  createTrendChart(currentFeedback);
});

/* 10. FEEDBACK SEARCH */

feedbackSearch.addEventListener("input", () => {
  const query = feedbackSearch.value.toLowerCase().trim();

  const filtered = currentFeedback.filter(item =>
    [
      item.customer,
      item.feedback,
      item.topic,
      item.sentiment
    ].some(value => value.toLowerCase().includes(query))
  );

  renderFeedback(filtered);
});

/* 11. CHAT MESSAGE RENDERING */

function addMessage(text, sender = "assistant") {
  const message = document.createElement("div");

  message.className = sender === "user"
    ? "message user-message"
    : "message assistant-message";

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = sender === "user" ? "SO" : "✦";

  const body = document.createElement("div");
  body.className = "message-body";

  const heading = document.createElement("strong");
  heading.textContent = sender === "user" ? "You" : "InsightIQ";

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  body.append(heading, paragraph);
  message.append(avatar, body);

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return body;
}

/* 12. GENERATIVE UI — DYNAMIC CHARTS */

function addGeneratedChart(title, labels, values, color = "#7965e8") {
  const message = document.createElement("div");
  message.className = "message assistant-message";

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = "✦";

  const body = document.createElement("div");
  body.className = "message-body";

  const heading = document.createElement("strong");
  heading.textContent = title;

  const canvas = document.createElement("canvas");
  canvas.height = 180;
  canvas.style.marginTop = "12px";
  canvas.style.maxWidth = "100%";

  body.append(heading, canvas);
  message.append(avatar, body);
  chatMessages.appendChild(message);

  new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Feedback records",
        data: values,
        backgroundColor: color,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 }
        }
      }
    }
  });

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* 13. GENERATIVE UI — DYNAMIC TABLES */

function addGeneratedTable(title, rows) {
  const message = document.createElement("div");
  message.className = "message assistant-message";

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = "✦";

  const body = document.createElement("div");
  body.className = "message-body";
  body.style.width = "100%";
  body.style.overflowX = "auto";

  const heading = document.createElement("strong");
  heading.textContent = title;

  const table = document.createElement("table");
  table.style.minWidth = "260px";
  table.style.marginTop = "12px";

  const header = document.createElement("tr");

  ["Customer", "Topic", "Sentiment"].forEach(label => {
    const th = document.createElement("th");
    th.textContent = label;
    header.appendChild(th);
  });

  table.appendChild(header);

  rows.forEach(item => {
    const row = document.createElement("tr");

    [item.customer, item.topic, item.sentiment].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    table.appendChild(row);
  });

  body.append(heading, table);
  message.append(avatar, body);
  chatMessages.appendChild(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* 14. ANALYTICS ENGINE — DEMO RULES */

function processQuestion(question) {
  const q = question.toLowerCase();

  const counts = getSentimentCounts(currentFeedback);
  const total = currentFeedback.length || 1;

  if (
    q.includes("sentiment") ||
    q.includes("positive") ||
    q.includes("negative") ||
    q.includes("neutral")
  ) {
    addMessage(
      `Based on the ${currentFeedback.length} feedback records currently loaded, ` +
      `${getPercentage(counts.Positive, total)}% are positive, ` +
      `${getPercentage(counts.Neutral, total)}% are neutral, and ` +
      `${getPercentage(counts.Negative, total)}% are negative.`
    );

    addGeneratedChart(
      "Customer Sentiment Breakdown",
      ["Positive", "Neutral", "Negative"],
      [counts.Positive, counts.Neutral, counts.Negative],
      ["#25b78f", "#8e85eb", "#e67886"]
    );

    return;
  }

  if (
    q.includes("complaint") ||
    q.includes("problem") ||
    q.includes("issue") ||
    q.includes("negative")
  ) {
    const negative = currentFeedback.filter(
      item => item.sentiment === "Negative"
    );

    const topicCounts = {};

    negative.forEach(item => {
      topicCounts[item.topic] = (topicCounts[item.topic] || 0) + 1;
    });

    const sortedTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1]);

    addMessage(
      `I found ${negative.length} negative feedback records. ` +
      `The most frequently appearing complaint category is ` +
      `${sortedTopics[0]?.[0] || "not available"}.`
    );

    addGeneratedChart(
      "Negative Feedback by Topic",
      sortedTopics.map(item => item[0]),
      sortedTopics.map(item => item[1]),
      "#e67886"
    );

    return;
  }

  if (
    q.includes("topic") ||
    q.includes("trend") ||
    q.includes("popular")
  ) {
    const topicCounts = {};

    currentFeedback.forEach(item => {
      topicCounts[item.topic] = (topicCounts[item.topic] || 0) + 1;
    });

    const sortedTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1]);

    addMessage("Here are the most frequently mentioned customer topics in the loaded feedback dataset.");

    addGeneratedChart(
      "Customer Topic Analysis",
      sortedTopics.map(item => item[0]),
      sortedTopics.map(item => item[1])
    );

    return;
  }

  if (
    q.includes("report") ||
    q.includes("table") ||
    q.includes("show feedback") ||
    q.includes("records")
  ) {
    addMessage(
      `Here is a summary of ${currentFeedback.length} customer feedback records.`
    );

    addGeneratedTable(
      "Customer Feedback Report",
      currentFeedback.slice(0, 8)
    );

    return;
  }

  if (q.includes("delivery") || q.includes("shipping")) {
    const delivery = currentFeedback.filter(item =>
      item.topic.toLowerCase() === "delivery"
    );

    addMessage(
      `I found ${delivery.length} delivery-related feedback records. ` +
      `${delivery.filter(item => item.sentiment === "Negative").length} are negative.`
    );

    addGeneratedTable("Delivery Feedback Analysis", delivery);

    return;
  }

  if (q.includes("support")) {
    const support = currentFeedback.filter(item =>
      item.topic.toLowerCase() === "customer support"
    );

    addMessage(
      `There are ${support.length} customer support records in the current dataset.`
    );

    addGeneratedTable("Customer Support Feedback", support);

    return;
  }

  addMessage(
    "I can currently analyze sentiment, customer complaints, topic trends, " +
    "delivery feedback, customer support, and feedback reports. " +
    "Try asking one of those questions."
  );
}

/* 15. CHAT SUBMISSION */

function sendQuestion(question) {
  const cleanQuestion = question.trim();

  if (!cleanQuestion) return;

  addMessage(cleanQuestion, "user");

  chatInput.value = "";

  const loading = addMessage("Analyzing the loaded customer feedback...");

  setTimeout(() => {
    loading.parentElement.remove();
    processQuestion(cleanQuestion);
  }, 450);
}

chatForm.addEventListener("submit", event => {
  event.preventDefault();
  sendQuestion(chatInput.value);
});

/* 16. SUGGESTED QUESTIONS */

document.querySelectorAll(".suggestion").forEach(button => {
  button.addEventListener("click", () => {
    sendQuestion(button.dataset.question);
  });
});

/* 17. CSV REPORT EXPORT */

document.getElementById("exportButton").addEventListener("click", () => {
  const headers = [
    "Customer",
    "Feedback",
    "Topic",
    "Sentiment",
    "Date"
  ];

  const rows = currentFeedback.map(item => [
    item.customer,
    item.feedback,
    item.topic,
    item.sentiment,
    item.date
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(value =>
      `"${String(value).replace(/"/g, '""')}"`
    ).join(","))
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "insightiq-customer-feedback.csv";

  link.click();
  URL.revokeObjectURL(url);
});

/* 18. NAVIGATION ACTIVE STATES */

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(item =>
      item.classList.remove("active")
    );

    link.classList.add("active");
  });
});

/* 19. INITIALIZE APPLICATION */

updateDashboard(feedbackData);

console.log("InsightIQ initialized successfully.");
console.log("Loaded customer feedback:", feedbackData.length);
console.log("Environment: Frontend demonstration");
