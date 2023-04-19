async function fetchConfig() {
    const response = await fetch('../data/config.json');
    const config = await response.json();
    return config;
}

function displayTransactions(transactions) {
    const transactionsTableBody = document.querySelector("#transactions-table tbody");

    transactions.forEach(t => {
        const tableRow = document.createElement('tr');

        //data
        const amountCell = document.createElement('td');
        const companyCell = document.createElement('td');
        const categoryCell = document.createElement('td');

        setCell(amountCell, parseToCurrency(t.value), true);
        setCell(companyCell, t.business_name, true);
        setCell(categoryCell, t.category, true);

        amountCell.addEventListener('blur', handleCellBlur);
        companyCell.addEventListener('blur', handleCellBlur);
        categoryCell.addEventListener('blur', handleCellBlur);

        tableRow.appendChild(amountCell);
        tableRow.appendChild(companyCell);
        tableRow.appendChild(categoryCell);

        //buttons
        addDeleteButton(tableRow, t.id);

        transactionsTableBody.appendChild(tableRow);
        
        //EVENT LISTENERS
        async function handleCellBlur() {
            const amt = parseFromCurrency(amountCell.textContent);
            console.log(amt);
            await updateTransaction(t.id, {
                value: amt,
                // value: parseFromCurrency(amountCell.textContent),
                business_name: companyCell.textContent,
                category: categoryCell.textContent,
            });
        }
    });
}

// BUTTONS
const addTransactionBtn = document.getElementById('add-transaction-btn');
addTransactionBtn.addEventListener('click', () => {
  window.location.href = '../components/addTransaction/addTransaction.html';
});

function addDeleteButton(tableRow, id) {
    const deleteCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.addEventListener('click', async() => {
        await deleteTransaction(id);
        tableRow.remove();
    });
    deleteCell.appendChild(deleteBtn);
    tableRow.appendChild(deleteCell);
}

// HELPER FUNCTIONS
function setCell(cell, textContent, isEditable){
    cell.textContent = textContent;
    cell.contentEditable = isEditable;
}

function parseToCurrency(amount) {
  const formattedAmount = parseFloat(amount).toFixed(2);
  return `€ ${formattedAmount}`;
}

function parseFromCurrency(currencyString) {
  // remove euro sign, spaces etc
  const numericString = currencyString.replace(/[^\d.,\s]/g, '').trim();
  // replace commas with dots
  const validFloatString = numericString.replace(/,/g, '.');
  return parseFloat(validFloatString);
}

//API CALLS

async function fetchTransactions() {
    try {
        const config = await fetchConfig();
        const response = await fetch(`${config.apiUrl}/transactions`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayTransactions(data);
    } catch(error) {
        console.error('Error fetching transactions', error);
    }
}

async function deleteTransaction(transactionId) {
    try {
      const config = await fetchConfig();
      const response = await fetch(`${config.apiUrl}/transactions/${transactionId}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  }

async function updateTransaction(transactionId, updatedData) {
    try {
        const config = await fetchConfig();
        console.log(JSON.stringify(updatedData));
        const response = await fetch(`${config.apiUrl}/transactions/${transactionId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedData)
        });

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating transaction: ', error);
    }
}

//Fetch + display on page load
fetchTransactions();