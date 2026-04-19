const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const rateText = document.getElementById("rateText");

const currencies = ["USD", "INR", "EUR", "GBP", "AUD", "CAD", "JPY"];

currencies.forEach(currency => {
  fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
  toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = amount.value;

  const response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${from}`
  );
  const data = await response.json();

  const rate = data.rates[to];
  const converted = (amt * rate).toFixed(2);

  result.value = converted;
  rateText.innerText = `1 ${from} = ${rate} ${to}`;
}

amount.addEventListener("input", convertCurrency);
fromCurrency.addEventListener("change", convertCurrency);
toCurrency.addEventListener("change", convertCurrency);

convertCurrency();