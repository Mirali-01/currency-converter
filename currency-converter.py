import config
import requests

API_KEY = config.API_KEY
BASE_URL = f"https://api.freecurrencyapi.com/v1/latest?apikey={API_KEY}"

# Get a list of all currencies
CURRENCIES = [
    "AUD",
    "BGN",
    "BRL",
    "CAD",
    "CHF",
    "CNY",
    "CZK",
    "DKK",
    "EUR",
    "GBP",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PHP",
    "PLN",
    "RON",
    "RUB",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "USD",
    "ZAR",
]


def convert_currency(base):
    currencies = ",".join(CURRENCIES)
    url = f"{BASE_URL}&base_currency={base}&currencies={currencies}"
    try:
        response = requests.get(url)
        data = response.json()
        return data["data"]
    except:
        print("Invalid currency")
        return None


def amount_to_convert():
    while True:
        amount = input(f"Enter the amount of {base} (q for quit): ").strip()
        if amount.lower() == "q":
            return None

        try:
            amount = float(amount)
            return amount
        except ValueError:
            print("Invalid amount. Please enter a numeric value.")


while True:
    base = input("Enter the base currency (q for quit): ").strip().upper()

    if base == "Q":
        break

    data = convert_currency(base)
    if not data:
        continue

    amount = amount_to_convert()
    if amount is None:
        break

    print(f"{data[base] * amount} {base} is ...")
    del data[base]
    for ticker, value in data.items():
        print(f"{ticker} : {value * amount}")
