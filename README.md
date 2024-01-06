# Currency Converter 

This is a simple currency converter application built using Flask and React. The application utilizes the Free Currency API to convert between different currencies allowing users to input a base currency and obtain the current exchange rates for other selected currencies of any amount.

## Table of Contents

- [Currency Converter](#currency-converter)
  - [Table of Contents](#table-of-contents)
    - [Installation](#installation)
  - [Backend (Flask)](#backend-flask)
    - [Backend Structure](#backend-structure)
      - [Backend Dependencies](#backend-dependencies)
    - [Backend Setup](#backend-setup)
    - [Backend Endpoints](#backend-endpoints)
      - [`/convert` \[POST\]](#convert-post)
  - [Frontend (React)](#frontend-react)
    - [Frontend Structure](#frontend-structure)
      - [Frontend Dependencies](#frontend-dependencies)
    - [Frontend Setup](#frontend-setup)
    - [Frontend Features](#frontend-features)
  - [Getting Started](#getting-started)
  - [Additional Information](#additional-information)
  - [Acknowledgments](#acknowledgments)


### Installation

To get a local copy of this repository, follow these steps:

1. Open your terminal or command prompt.

2. Use the `git clone` command along with the repository's URL to clone the repository to your local machine:

    ```bash
    git clone https://github.com/Mirali-01/currency-converter.git
    ```

3. Once cloned, navigate to the project directory:

    ```bash
    cd currency-converter
    ```

## Backend (Flask)

### Backend Structure

The backend (`app.py`) consists of a Flask application that handles requests for currency conversion using the Free Currency API.

#### Backend Dependencies

- Flask
- Flask-CORS
- Requests

### Backend Setup

1. Ensure Python is installed.
2. Install required dependencies using pip:
   
    ```bash
    pip install -r requirements.txt
    ```

    For Mac:

    ```bash
    pip3 install -r requirements.txt
    ```

3. Update `config.py` with the API key from [Free Currency API](https://www.freecurrencyapi.com/).
4. Run the Flask backend:

    ```bash
    python app.py
    ```

### Backend Endpoints

#### `/convert` [POST]

- **Description:** Handles currency conversion based on provided parameters.
- **Request Body:**
    - `base_currency`: The base currency for conversion.
    - `currencies`: Comma-separated list of target currencies.
    - `amount`: Amount to convert.
- **Response:**
    - Returns converted data as JSON.

## Frontend (React)

### Frontend Structure

The frontend (`App.js`) is a React application that allows users to input base currency, target currencies, and amount for conversion.

#### Frontend Dependencies

- Axios
- React
- React-DOM
- React-Icons

### Frontend Setup

1. Install Node.js if not already installed.
2. Install required dependencies using npm:

    ```bash
    npm install axios react react-dom react-icons
    ```

3. Run the React frontend:

    ```bash
    npm start
    ```

### Frontend Features

- Input base currency, target currencies, and amount for conversion.
- Convert currencies by interacting with the Flask backend.
- Display converted amounts in a tablular format.
- Clear inputs and error handling functionalities.

## Getting Started

To start the application:
1. Run the Flask backend (`app.py`).
2. Run the React frontend (`App.js`).
3. Interact with the application by inputting currencies and amounts for conversion.

## Additional Information

- Supported Currencies: AUD, BGN, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HKD, HRK, HUF, IDR, ILS, INR, ISK, JPY, KRW, MXN, MYR, NOK, NZD, PHP, PLN, RON, RUB, SEK, SGD, THB, TRY, USD, ZAR.

## Acknowledgments

- Thanks to [Free Currency API](https://www.freecurrencyapi.com/) for providing the currency conversion data.
