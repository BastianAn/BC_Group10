const Web3 = require('web3');
const contractABI = [NFT-ABI.json] // Die ABI Ihres Smart Contract hier einfügen
const contractAddress = '0x...'; // Die Adresse Ihres Smart Contract hier einfügen

// Verbinden Sie sich mit Metamask
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // Setzen Sie den Provider, den Sie von Ihrem lokalen Truffle Suite wollen
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Holen Sie sich den ersten Account von Metamask
web3.eth.getAccounts((error, accounts) => {
    if (error) {
        console.log(error);
    }

    const account = accounts[0];
    const digitalIDContract = new web3.eth.Contract(contractABI, contractAddress);

    // UI-Elemente
    const form = document.getElementById('idForm');
    const input = document.getElementById('idInput');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const tokenURI = input.value;
        digitalIDContract.methods.createDigitalID(tokenURI).send({ from: account })
            .on('transactionHash', (hash) => {
                console.log('Transaction hash: ', hash);
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                console.log('Confirmation number: ', confirmationNumber);
            })
            .on('receipt', (receipt) => {
                console.log('Receipt: ', receipt);
            })
            .on('error', console.error);
    });
});
