function splitTextOnPaste(event, element_id) {
    event.preventDefault();

    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('text');
    console.log(`pastedText: ${pastedText}`)

    // ELEMENT

    let lines;
    if (["addresses", "names"].includes(element_id)) {
        lines = pastedText.split('\n').slice(0, 20);
    } else if (element_id === "bybit_label") {
        lines = pastedText.split('\n').slice(0, 1);
    } else {
        lines = pastedText.split('\n');
    }
    console.log(`lines: ${lines}`)

    const formattedLines = lines.map((line) => {
        return line.trim();
    });
    console.log(`formattedLines: ${formattedLines}`)

    const textareaElement = document.getElementById(element_id);
    textareaElement.value = formattedLines.join('\n');

    // CODE
    if (["addresses", "names"].includes(element_id)) {
        codeOnChange();
    } else {
        bybitOnChange();
    }
}


function codeOnChange() {
    const addressesText = document.getElementById('addresses').value.split('\n');
    const formattedAddresses = addressesText
        .filter(function (address) {
            return address !== '';
        })
        .map(function (address) {
            return '"' + address + '"'
        })

    const namesText = document.getElementById('names').value.split('\n');
    if (namesText[namesText.length-1] === '') {namesText.pop();}
    const formattedNames = '"' + namesText.join('", "') + '"'

    console.log(`\nnamesText: ${namesText}`)
    console.log(`formattedNames: ${formattedNames}`)

    const AddressesArea = document.getElementById("addresses")
    const CodeArea = document.getElementById("code")
    const walletsType = document.getElementById("walletsType").value

    let step = 5;
    let start_address_index = 3;
    let start_name_index = 5;

    if (walletsType === "EVM Address") {
        AddressesArea.cols = 50;
        CodeArea.cols = 108;
        chain_strings = `document.querySelector("div.balance_okui.balance_okui-popup.select-popup-reference > div > div > div > div > div > div > div:nth-child(3)").click();`
    }
    else if (walletsType === "Starknet Address") {
        AddressesArea.cols = 70;
        CodeArea.cols = 128;
        chain_strings = `document.querySelector("div.balance_okui.balance_okui-popup.select-popup-reference > div > div > div > div > div > div > div:nth-child(2)").click(); // Universal address
document.querySelector("div:nth-child(4) > div.balance_okui-form-item-control > div > div > div > div").click();
await new Promise((resolve) => setTimeout(resolve, 50));
var networks = document.querySelectorAll("div.balance_okui.balance_okui-popup.select-popup-reference > div > div > div > div > div > div > div")
networks.forEach(function(network) {
  if (network.textContent === 'Starknet') {network.click()}
});`
    }
    else if (walletsType === "Aptos Address") {
        AddressesArea.cols = 70;
        CodeArea.cols = 128;
        chain_strings = `document.querySelector("div.balance_okui.balance_okui-popup.select-popup-reference > div > div > div > div > div > div > div:nth-child(2)").click(); // Universal address`
    }
    else if (walletsType === "Harmony Address") {
        AddressesArea.cols = 50;
        CodeArea.cols = 108;
        chain_strings = `document.querySelector("div.balance_okui.balance_okui-popup.select-popup-reference > div > div > div > div > div > div > div:nth-child(2)").click(); // Universal address`
    }
    else if (walletsType === "Atom Address") {
        step = 6;
        start_name_index = 6;

        AddressesArea.cols = 50;
        CodeArea.cols = 108;
        chain_strings = `document.querySelector("div.balance_okui.balance_okui-popup.select-popup-reference > div > div > div > div > div > div > div:nth-child(2)").click(); // Universal address`
    }

    const formattedText = `(function() {
  const wallets = [
${formattedAddresses}
  ];

  const names = [
${formattedNames}
  ];

const walletSelectors = [];
const nameSelectors = [];
const start_address_index = ${start_address_index};
const start_name_index = ${start_name_index};
const step = ${step};

const addButton = document.getElementsByClassName("balance_okui balance_okui-btn btn-md btn-outline-secondary")[0] // + Add button

function fillInput(input, value) {
input.setAttribute('value', value);
input.dispatchEvent(new Event('input', { bubbles: true }));
}

async function addWallets() {

document.querySelector("div.balance_okui-select-value-box").click();
await new Promise((resolve) => setTimeout(resolve, 50));
${chain_strings}
document.querySelector("span.balance_okui-checkbox").click();

for (let i = 0; i < wallets.length; i++) {
  console.log(\`Добавление кошелька \${i + 1} из \${wallets.length}\`);

  const addressInput = document.querySelector(\`.balance_okui-table-tbody > tr:nth-child(\${i + 2}) .balance_okui-table-cell:nth-child(2) .balance_okui-input-input\`);
  const nameInput = document.querySelector(\`.balance_okui-table-tbody > tr:nth-child(\${i + 2}) .balance_okui-table-cell:nth-child(3) .balance_okui-input-input\`);

  fillInput(addressInput, wallets[i]);
  await new Promise((resolve) => setTimeout(resolve, 50));

  if (names.length > 0 && names[i]) {
    fillInput(nameInput, names[i]);
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  if (i < wallets.length - 1) {
    addButton.click();
    await new Promise((resolve) => setTimeout(resolve, 450));
  }
}

document.getElementsByClassName("balance_okui balance_okui-btn btn-md btn-fill-highlight")[0].click(); // "Save addresses" button

for (let i = 0; i < 16; i++) {
  try {
    const send_email_code = document.getElementsByClassName("balance_okui-input-code-btn ")[0];
    send_email_code.click();
    break;
  } catch (error) {
    console.log('жду кнопку Send Code для Email');
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

console.log('Завершено');
}

addWallets();
})();
`;
    document.getElementById('code').value = formattedText;

}


function bybitOnChange() {
    const addressesText = document.getElementById('addresses_two').value;
    const addressLabel = document.getElementById('bybit_label').value;
    const chainToWithdraw = document.getElementById('inputChain').value;

    const formattedText = `const delay = e => new Promise((t => setTimeout(t, e)));

function clickElement(e) {
    ["mousedown", "mouseup", "click"].forEach((t => {
        const n = new MouseEvent(t, {
            bubbles: !0,
            cancelable: !0,
            view: window
        });
        e.dispatchEvent(n)
    }))
}

first_checkbox = document.querySelector("#dynamic_form_nest_item > div:nth-child(4) > div > div > div > div > div:nth-child(1) > label > span.flex.justify-center.items-center.relative > span > input");
second_checkbox = document.querySelector("#dynamic_form_nest_item > div:nth-child(4) > div > div > div > div > div:nth-child(2) > label > span.flex.justify-center.items-center.relative > span > input");

if (!first_checkbox.checked) {clickElement(first_checkbox)}
if (!second_checkbox.checked) {clickElement(second_checkbox)}


function setValue(e, t) {
    const n = Object.getOwnPropertyDescriptor(e, "value").set,
        c = Object.getPrototypeOf(e),
        o = Object.getOwnPropertyDescriptor(c, "value").set;
    n && n !== o ? o.call(e, t) : n.call(e, t), e.dispatchEvent(new Event("input", {
        bubbles: !0
    }))
}
window.addAddresses = async function(e, t, n = 1) {
    for (let t = 0; t < e.length - 1; t++) {
        document.querySelector("#dynamic_form_nest_item .money__address-batch-form-action-btn").click(), await delay(100)
    }
    const c = Array.from(document.querySelectorAll("#dynamic_form_nest_item > .ant-space"));
    for (let o = 0; o < c.length; o++) {
        const l = c[o],
            a = e[o];
        clickElement(l.querySelector(".ant-space-item:nth-child(2) .ant-form-item-control > div > div > div > div")), await delay(100);
        const i = Array.from(document.querySelectorAll(".ant-select-dropdown"))[o];
        setValue(i.querySelector("input"), "${chainToWithdraw}"), await delay(50);
        clickElement(i.querySelector('div[title="${chainToWithdraw}"]')), await delay(50);
        setValue(l.querySelector(".ant-space-item:nth-child(3) input"), a);
        setValue(l.querySelector(".ant-space-item:nth-child(5) input"), \`\${t}\${Number(n) + Number(o)}\`)
    }
}, window.generateFunctions = function(e, t, n = 1) {
    const c = e.trim().split("\\n").map((e => e.trim()));
    let o = 1;
    for (let e = 0; e < c.length; e += 5) {
        const l = c.slice(e, e + 5);
        window[\`add\${o}\`] = (e => () => window.addAddresses(l, t, e))(n), n += l.length, console.log(\`Write "add\${o}()" to run \${e + 1}-\${e + 6} accounts\`), o++
    }
};

generateFunctions(\`${addressesText}\`, "${addressLabel}", 1)
`;
    document.getElementById('code_two').value = formattedText;

}


function copyTextToClipboard(code_id) {
    const textToCopy = document.getElementById(code_id);
    if (textToCopy.value) {
        navigator.clipboard.writeText(textToCopy.value)

        let toast;
        if (code_id === 'code') {
            toast = document.getElementsByClassName('toast_default')[0]
        } else if (code_id === 'code_two') {
            toast = document.getElementsByClassName('toast_default')[1]
        }
        toast.classList.add("toast_show")
        textToCopy.classList.add('colored_textarea')
        setTimeout(() => {
            {
                toast.classList.remove("toast_show");
                textToCopy.classList.remove('colored_textarea')
            }
        }, 500)

    }
}


function calculateMarqueeContent() {
    const marquee = document.getElementById('dynamic-marquee');
    const marqueeContainer = document.getElementById('marquee-container');
    const screenWidth = window.innerWidth;
    const smileyWidth = 72;

    const smileysCount = Math.ceil(screenWidth / smileyWidth / 2 - 1);
    const smileys = Array(smileysCount).fill('💸🤑');
    marquee.textContent = smileys.join('');

    marquee.style.width = screenWidth + 'px';
    marqueeContainer.style.width = screenWidth + 'px';
}


function showFieldsOKX() {
    var fields_okx = document.getElementById("okx_fields");
    var fields_bybit = document.getElementById("bybit_fields");
    var okx_button = document.getElementsByClassName("okx_button")[0];
    var bybit_button = document.getElementsByClassName("bybit_button")[0];

    okx_button.style.opacity = 1;
    bybit_button.style.opacity = 0.5;

    fields_okx.style.display = "block";
    fields_bybit.style.display = "none";
}


function showFieldsBybit() {
    var fields_okx = document.getElementById("okx_fields");
    var fields_bybit = document.getElementById("bybit_fields");
    var okx_button = document.getElementsByClassName("okx_button")[0];
    var bybit_button = document.getElementsByClassName("bybit_button")[0];

    okx_button.style.opacity = 0.5;
    bybit_button.style.opacity = 1;

    fields_okx.style.display = "none";
    fields_bybit.style.display = "block";
}

window.addEventListener('load', calculateMarqueeContent);
window.addEventListener('load', showFieldsOKX);
window.addEventListener('resize', calculateMarqueeContent);

window.addEventListener('load', function () {
    const lineNumbers = document.querySelectorAll('.line-numbers');

    lineNumbers.forEach(function (lineNumber) {
        for (let i = 1; i <= 20; i++) {
            lineNumber.innerHTML += i + '<br>';
        }
    });

    const lineNumbers_5 = document.querySelectorAll('.line-numbers_5');
    lineNumbers_5.forEach(function (lineNumber_5) {
        for (let i = 1; i <= 5; i++) {
            lineNumber_5.innerHTML += i + '<br>';
        }
    });

    const datalist = document.getElementById('chainToWithdraw');
    const options = ['ERC20', 'TRC20', 'SOL', 'BSC (BEP20)', 'MATIC', 'AVAXC', 'KAVAEVM', 'Arbitrum One', 'zkSync Lite', 'Optimism', 'Mantle Network', 'BTC', 'LINEA', 'Arbitrum Nova', 'zkSync Era', 'Base Mainnet', 'OP Mainnet', 'Arbitrum One (Bridged)', 'Polygon(bridged)', 'XRP', 'NEAR', 'ACA', 'Chiliz Legacy Chain', 'ADA', 'ALGO', 'APTOS', 'AR', 'ATOM', 'AVAX', 'AXL', 'Bitcoin Cash', 'BTG', 'CELO', 'Caduceus', 'CORE', 'DCR', 'DGB', 'Klaytn', 'Dogecoin', 'DOT', 'EGLD', 'EOS', 'Ethereum Classic', 'ETHF', 'ETHW', 'Filecoin', 'STEP', 'FLOW', 'FLR', 'FTM', 'GLMR', 'HBAR', 'HNT', 'HVH', 'ICP', 'ICX', 'Kaspa', 'KAVA', 'KDA', 'KON', 'KSM', 'LTC', 'Terra', 'Terra Classic', 'MINA', 'MOVR', 'OAS', 'OMEGA', 'ONE', 'POKT', 'QTUM', 'ROSE', 'BNB (BEP2)', 'RVN', 'SC', 'SCRT', 'SEI', 'STX', 'SUI', 'TENET', 'THETA', 'Celestia', 'TON', 'Waves', 'WAX', 'WEMIX', 'XDC', 'XEC', 'NEM', 'Stellar Lumens', 'XTZ', 'XYM', 'ZEN', 'ZIL'];

    options.forEach((optionText) => {
        const optionElement = document.createElement('option');
        optionElement.value = optionText;
        datalist.appendChild(optionElement);
    });

});
