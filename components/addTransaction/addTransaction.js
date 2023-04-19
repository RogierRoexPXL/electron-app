const addTransactionForm = document.getElementById('add-transaction-form');
addTransactionForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(addTransactionForm);

  const newTransaction = {
    business_name: formData.get('business_name'),
    value: parseFloat(formData.get('value')),
    category: formData.get('category')
  };

  await addTransaction(newTransaction);

  window.location.href = '../../pages/icountant.html';
});

//BACK BUTTON
const backBtn = document.getElementById('back-btn');
backBtn.addEventListener('click', () => {
  window.location.href = '../../pages/icountant.html';
});



//move to ./data/api.js
async function fetchConfig() {
    const response = await fetch('../../data/config.json');
    const config = await response.json();
    return config;
}

async function addTransaction(newTransaction) {
    console.log(JSON.stringify(newTransaction));
    try {
      const config = await fetchConfig();
      const response = await fetch(`${config.apiUrl}/transactions`, {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTransaction)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding transaction:', error);
  }
}