import config
import requests

API_KEY = config.API_KEY
BASE_URL = f"https://api.freecurrencyapi.com/v1/latest?apikey={API_KEY}"

CURRENCIES = ["USD", "CAD", "EUR", "AUD", "CNY"]


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


while True:
    base = input("Enter the base currency (q for quit): ").upper()
    # amount = float(input(f"Enter the amount of {base} (q for quit): "))

    # if base or amount == "Q":
    #     break
    if base == "Q":
        break

    # if base not in CURRENCIES:
    #     print(f"Cannot convert {base}")

    data = convert_currency(base)
    if not data:
        continue

    # print(f"{data[base] * amount} {base} is ...")
    print(f"{data[base]} {base} is ...")
    del data[base]
    for ticker, value in data.items():
        # print(f"{ticker} : {value * amount}")
        print(f"{ticker} : {value}")
