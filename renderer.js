

// handle selectFileBtn -> open file dialog
const selectFileBtn = document.getElementById('select-file');
const selectedFileName = document.getElementById('selected-file-name');
const selectedFileText = document.getElementById('selected-file-text');

const largeSection = document.getElementById('large-section');

selectFileBtn.addEventListener('click', () => {
  window.api.send('open-file-dialog');
});

window.api.receive('selected-file', (filename) => {
    selectedFileName.textContent = filename;
    selectedFileText.classList.remove('hidden');
    largeSection.classList.remove('hidden');

    //handle table with xlsx-data
    const data = window.api.readExcelFile(filename);
    displayExcelData(data);
});

//helper functions
function displayExcelData(data) {
    const table = document.getElementById('excel-table');
    table.innerHTML = '';

    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.classList.add('tr');
        if (index === 0) {
            tr.classList.add('bold')
            tr.classList.add('is-primary')
        } else if (index % 2 === 0) {
            tr.classList.add('is-light');
        }
        row.forEach((cell) => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
            td.classList.add('td');
        });
        table.appendChild(tr);
    });
}