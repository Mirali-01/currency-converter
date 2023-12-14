# Currency Converter Application

This is a simple currency converter application that utilizes the Free Currency API to convert between different currencies. This application allows users to input a base currency and obtain the current exchange rates for other selected currencies.

## Getting Started

To get started with this application, you will need an API key from [Free Currency API](https://www.freecurrencyapi.com/). Once you have the API key, update the `config.py` file with your API key.

### Prerequisites

- Python 3.x
- Requests library (install using `pip install requests`)

### Installation

1. Clone this repository.

2. Install the required dependencies using the following command:

    ```bash
    pip install -r requirements.txt
    ```

3. Update the `config.py` file with your API key from Free Currency API.

4. Run the application:

    ```bash
    python currency_converter.py
    ```

## Usage

1. Run the application using the steps mentioned in the Installation section.

2. Enter the base currency when prompted. (Enter 'Q' to quit)

3. View the conversion rates for other currencies based on the entered base currency.

## Features

- Convert from one currency to multiple other currencies.
- Retrieve the current exchange rates from the Free Currency API.
- Simple and easy-to-understand user interface.

## Acknowledgments

- Thanks to [Free Currency API](https://www.freecurrencyapi.com/) for providing the currency conversion data.
