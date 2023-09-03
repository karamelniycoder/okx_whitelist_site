function splitTextOnPaste(event, element_id) {
    event.preventDefault();

    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('text');

    // ELEMENT

    const lines = pastedText.split('\n').slice(0, 20);

    const formattedLines = lines.map((line) => {
        return line.trim();
    });

    const textareaElement = document.getElementById(element_id);
    textareaElement.value = formattedLines.join('\n');

    // CODE
    codeOnChange()

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
    const formattedNames = namesText
        .filter(function (name) {
            return name !== '';
        })
        .map(function (name) {
            return '"' + name + '"'
        })

    const formattedText = `(function() {
  const wallets = [
${formattedAddresses}
  ];

  const names = [
${formattedNames}
  ];

const walletSelectors = [];
const nameSelectors = [];

for (let i = 3; i <= 98; i += 5) {
walletSelectors.push(
 \`#scroll-box > div > div > form > div:nth-child(5) > div > div > div > div > div:nth-child(\${i}) > div.okui-form-item-control > div > div > div > div > input\`
);
}

for (let i = 5; i <= 100; i += 5) {
nameSelectors.push(
 \`#scroll-box > div > div > form > div:nth-child(5) > div > div > div > div > div:nth-child(\${i}) > div.okui-form-item-control > div > div > div > div > input\`
);
}

const addButtonSelector =
"#scroll-box > div > div > form > div:nth-child(5) > div > div > div > div > div.add-address-form-btn";


function fillInput(input, value) {
input.setAttribute('value', value);
input.dispatchEvent(new Event('input', { bubbles: true }));
}

async function addWallets() {
const scrollBox = document.getElementById('scroll-box');
for (let i = 0; i < wallets.length; i++) {
  console.log(\`Добавление кошелька \${i + 1} из \${wallets.length}\`);

  const addressInput = document.querySelector(walletSelectors[i]);
  const nameInput = document.querySelector(nameSelectors[i]);

  fillInput(addressInput, wallets[i]);
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (names.length > 0) {
    fillInput(nameInput, names[i]);
    await new Promise((resolve) => setTimeout(resolve, 400));
  }

  if (i < wallets.length - 1) {
    const button = document.querySelector(addButtonSelector);
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 300));
    scrollBox.scroll(0,scrollBox.scrollHeight)
  }
}

console.log('Завершено');
}

addWallets();
})();
`;
    document.getElementById('code').value = formattedText;

}


function copyTextToClipboard() {
    const textToCopy = document.getElementById('code').value;
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)
            .then(function () {
                alert('Код скопирован в буфер обмена');
            });
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


window.addEventListener('load', calculateMarqueeContent);
window.addEventListener('resize', calculateMarqueeContent);

window.addEventListener('load', function () {
    const lineNumbers = document.querySelectorAll('.line-numbers');

    lineNumbers.forEach(function (lineNumber) {
        for (let i = 1; i <= 20; i++) {
            lineNumber.innerHTML += i + '<br>';
        }
    });
});