document.getElementById('scan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const ip = document.getElementById('ip').value;
    const scanType = document.getElementById('scan_type').value;

    fetch('/scan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `ip=${ip}&scan_type=${scanType}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('result').innerHTML = `<p>Error: ${data.error}</p>`;
        } else {
            let resultHtml = `
                <p><strong>Nmap Version:</strong> ${data.nmap_version.join('.')}</p>
                <p><strong>Scan Info:</strong> ${JSON.stringify(data.scan_info)}</p>
                <p><strong>Scanner Status:</strong> ${data.scanner_status}</p>
                <p><strong>Protocols:</strong> ${data.protocols.join(', ')}</p>
                <p><strong>Open Ports:</strong> ${data.open_ports.join(', ')}</p>
            `;
            document.getElementById('result').innerHTML = resultHtml;
        }
    })
    .catch(error => {
        document.getElementById('result').innerHTML = `<p>Error: ${error}</p>`;
    });
});
