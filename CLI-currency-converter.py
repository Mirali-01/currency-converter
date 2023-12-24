import config
import requests

API_KEY = config.API_KEY
BASE_URL = f"https://api.freecurrencyapi.com/v1/latest"

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
    params = {
        "apikey": API_KEY,
        "base_currency": base,
        "currencies": ",".join(CURRENCIES),
    }
    try:
        response = requests.get(BASE_URL, params=params)
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
    print("Welcome to World Currency Converter (33 Countries)")
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
    print("{:<8} {:<15}".format("Ticker", "Converted Amount"))
    for ticker, value in data.items():
        print("{:<8} {:<15}".format(ticker, value * amount))
