// Replace <USERNAME> and <REPO> with your own GitHub info

const csvUrl = "https://raw.githubusercontent.com/roaasoloh/webscraping-automation/main/bitcoin_hourly_data.csv";

async function fetchCsvData() {
  try {
    // Fetch the CSV from GitHub's raw URL
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const csvText = await response.text();

    // Parse the CSV text into rows
    const rows = csvText.trim().split("\n").map((row) => row.split(","));

    // rows[0] will be the header
    // rows.slice(1) will be the data
    createTable(rows);
  } catch (error) {
    console.error("Error fetching CSV data:", error);
    document.getElementById("data-container").innerHTML =
      `<p style="color: red;">Failed to load data. Check console for details.</p>`;
  }
}

function createTable(dataRows) {
  // dataRows[0] is the header, e.g. ["timestamp","price","market_cap",...]
  const headers = dataRows[0];

  // Prepare HTML for table
  let html = "<table><thead><tr>";
  headers.forEach((header) => {
    html += `<th>${header}</th>`;
  });
  html += "</tr></thead><tbody>";

  // Fill table rows
  for (let i = 1; i < dataRows.length; i++) {
    html += "<tr>";
    dataRows[i].forEach((cell) => {
      html += `<td>${cell}</td>`;
    });
    html += "</tr>";
  }

  html += "</tbody></table>";

  // Insert the table into the page
  document.getElementById("data-container").innerHTML = html;
}

// Call the fetch function on page load
window.addEventListener("DOMContentLoaded", fetchCsvData);
