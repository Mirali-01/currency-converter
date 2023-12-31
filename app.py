from flask import Flask, jsonify, request
from flask_cors import CORS

import config
import requests

app = Flask(__name__)
CORS(app)

API_KEY = config.API_KEY
BASE_URL = "https://api.freecurrencyapi.com/v1/latest"

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


def convert_currency(base, currencies, amount):
    params = {
        "apikey": API_KEY,
        "base_currency": base,
        "currencies": currencies,
    }
    try:
        response = requests.get(BASE_URL, params=params)
        if response.status_code != 200:
            raise Exception(f"Failed to fetch data: {response.status_code}")

        data = response.json().get("data")
        if not data:
            raise Exception("Data not available for conversion")

        converted_data = {ticker: value * amount for ticker, value in data.items()}
        return converted_data
    except Exception as e:
        return {"error": str(e)}


@app.route("/convert", methods=["POST"])
def handle_conversion():
    request_data = request.get_json()

    base_currency = request_data.get("base_currency")
    currencies = request_data.get("currencies")
    amount = request_data.get("amount")

    if currencies:
        currencies = f"{base_currency},{currencies}"

    if not amount:
        amount = 1

    amount = float(amount)
    converted_data = convert_currency(
        base_currency.upper().replace(" ", "").strip(),
        currencies.upper().replace(" ", "").strip(","),
        amount,
    )

    if "error" in converted_data:
        return jsonify({"error": converted_data["error"]}), 500
    else:
        return jsonify(converted_data)


if __name__ == "__main__":
    app.run(debug=True)
