# Pay_Buy_Crypto

**Pay_Buy_Crypto** is a simple and efficient React-based application that allows users to connect their cryptocurrency wallet and make purchases (such as "xyz") directly using supported cryptocurrencies. The project leverages the WalletConnect library for seamless wallet integration and payment processing.

## Features

- **Wallet Integration**: Users can easily connect their cryptocurrency wallet using WalletConnect, making the platform highly accessible.
- **Supported Tokens**: Payments can be made using USDT (Tether), BMF (Blockchain Mutual Fund), or Matic (Polygon).
- **QR Code for Wallet Address**: Users can scan a QR code to obtain the admin's wallet address for sending payments.
- **Admin Payment Details**: A dedicated section displays the admin's wallet balances and the supported cryptocurrency tokens for payment.

## Admin Wallet Details

- **USDT Balance**: Displays the admin’s current balance in USDT (Tether).
- **BMF Balance**: Displays the admin’s current balance in BMF tokens.
- **Matic Balance**: Displays the admin’s current balance in Matic (Polygon) tokens.
- **Wallet Address QR Code**: Admin’s wallet address is displayed in both text and QR code format for easy access.

## Admin Wallet Address
`0xB55b1E1267aa0ACe562E566D26e6904cf71d25fc`

## Prerequisites

- **Node.js** and **npm** installed.
- A compatible cryptocurrency wallet (e.g., MetaMask) that supports WalletConnect.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MohsinAliSolangi/Pay_Buy_Crypto.git

2. Navigate to the project directory:

   ```bash
   cd Pay_Buy_Crypto
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the project:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

1. Connect your cryptocurrency wallet using the **"Connect Wallet"** button.
2. Select the cryptocurrency you wish to use for payment (USDT, BMF, or Matic).
3. Complete the purchase process, and the payment will be sent directly to the admin's wallet.
4. You can also scan the admin's wallet QR code to manually send payments if necessary.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **WalletConnect**: Library for integrating cryptocurrency wallets.
- **Node.js**: Backend environment for running the application.

## License

This project is licensed under the MIT License.
