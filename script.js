// JavaScript code
async function fetchData() {
    try {
        const response = await fetch('data:text/csv;base64,U2FsZXMKMTAwMAoxMjMuNDUKMTExLjExCg==');
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        const totalSales = calculateTotalSales(text);
        document.getElementById('total-sales').textContent = `Total Sales: $${totalSales.toFixed(2)}`;
        populateProductSales(text);
    } catch (error) {
        document.getElementById('total-sales').textContent = 'Error loading data';
        console.error('Fetch error:', error);
    }
}

function calculateTotalSales(csvData) {
    const rows = csvData.split('\n').slice(1); // Skip header
    let total = 0;
    for (const row of rows) {
        const columns = row.split(',');
        if (columns.length > 0) {
            total += parseFloat(columns[0]) || 0; // Assuming sales are in the first column
        }
    }
    return total;
}

function populateProductSales(csvData) {
    const rows = csvData.split('\n').slice(1); // Skip header
    const tbody = document.querySelector('#product-sales tbody');
    tbody.innerHTML = ''; // Clear existing rows
    for (const row of rows) {
        const columns = row.split(',');
        if (columns.length > 1) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>Product ${columns[0]}</td><td>$${parseFloat(columns[1]).toFixed(2)}</td>`;
            tbody.appendChild(tr);
        }
    }
}

fetchData();