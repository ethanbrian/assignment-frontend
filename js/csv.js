document.getElementById('compare-btn').addEventListener('click', function () {
    // Get selected columns
    const selectedColumns = Array.from(document.querySelectorAll('input[name="columns"]:checked'))
        .map(checkbox => checkbox.value);

    // Send request to the server for comparison with selected columns
    fetch(`http://localhost:7070/api/reconciliation-report?columns=${selectedColumns.join(',')}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#reconciliation-table tbody');
            tableBody.innerHTML = ''; // Clear existing rows
            data.differences.forEach(difference => { // Access differences array from the JSON response
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${difference.type}</td>
                    <td>${difference.recordIdentifier}</td>
                    <td>${difference.field}</td>
                    <td>${difference.sourceValue}</td>
                    <td>${difference.targetValue}</td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching reconciliation report:', error));
});
