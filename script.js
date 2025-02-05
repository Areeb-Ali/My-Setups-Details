let trades = [];

document.getElementById('tradeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const coinName = document.getElementById('coinName').value;
  const tradeType = document.getElementById('tradeType').value;
  const leverage = document.getElementById('leverage').value;
  const setupTime = document.getElementById('setupTime').value;
  const risk = parseFloat(document.getElementById('risk').value);
  const reward = parseFloat(document.getElementById('reward').value);
  const capital = parseFloat(document.getElementById('capital').value);
  const explanation = document.getElementById('explanation').value;

  const trade = {
    coinName,
    tradeType,
    leverage,
    setupTime,
    risk,
    reward,
    capital,
    explanation,
    outcome: reward > risk ? 'Win' : 'Loss'
  };

  trades.push(trade);
  updateTradeTable();
  updateAnalysis();
  this.reset();
});

function updateTradeTable() {
  const tbody = document.getElementById('tradeTableBody');
  tbody.innerHTML = '';

  trades.forEach((trade, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${trade.coinName}</td>
      <td>${trade.tradeType}</td>
      <td>${trade.leverage}</td>
      <td>${trade.setupTime}</td>
      <td>$${trade.risk}</td>
      <td>$${trade.reward}</td>
      <td>$${trade.capital}</td>
      <td>${trade.explanation}</td>
      <td class="actions">
        <button class="edit" onclick="editTrade(${index})">Edit</button>
        <button onclick="deleteTrade(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function updateAnalysis() {
  const totalTrades = trades.length;
  const wins = trades.filter(trade => trade.outcome === 'Win').length;
  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(2) : 0;
  const totalRisk = trades.reduce((sum, trade) => sum + trade.risk, 0);
  const totalReward = trades.reduce((sum, trade) => sum + trade.reward, 0);
  const avgRiskReward = totalRisk > 0 ? (totalReward / totalRisk).toFixed(2) : 0;
  const totalProfit = totalReward - totalRisk;

  document.getElementById('winRate').textContent = `${winRate}%`;
  document.getElementById('avgRiskReward').textContent = avgRiskReward;
  document.getElementById('totalProfit').textContent = totalProfit.toFixed(2);
}

function deleteTrade(index) {
  trades.splice(index, 1);
  updateTradeTable();
  updateAnalysis();
}

function editTrade(index) {
  const trade = trades[index];
  document.getElementById('coinName').value = trade.coinName;
  document.getElementById('tradeType').value = trade.tradeType;
  document.getElementById('leverage').value = trade.leverage;
  document.getElementById('setupTime').value = trade.setupTime;
  document.getElementById('risk').value = trade.risk;
  document.getElementById('reward').value = trade.reward;
  document.getElementById('capital').value = trade.capital;
  document.getElementById('explanation').value = trade.explanation;

  trades.splice(index, 1);
  updateTradeTable();
  updateAnalysis();
}