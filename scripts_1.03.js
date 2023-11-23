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
 \`#scroll-box > div > div > form > div:nth-child(6) > div > div > div > div > div:nth-child(\${i}) > div.okui-form-item-control > div > div > div > div > input.okui-input-input\`
);
}

for (let i = 5; i <= 100; i += 5) {
nameSelectors.push(
 \`#scroll-box > div > div > form > div:nth-child(6) > div > div > div > div > div:nth-child(\${i}) > div.okui-form-item-control > div > div > div > div > input.okui-input-input\`
);
}

const addButtonSelector =
"#scroll-box > div > div > form > div:nth-child(6) > div > div > div > div > div.add-address-form-btn";


function fillInput(input, value) {
input.setAttribute('value', value);
input.dispatchEvent(new Event('input', { bubbles: true }));
}

async function addWallets() {
const scrollBox = document.getElementById('scroll-box');

document.querySelector("#scroll-box > div > div > form > div:nth-child(1) > div.okui-form-item-control > div > div > div > div.okui-select-value-box > div > div").click();
await new Promise((resolve) => setTimeout(resolve, 50));
document.querySelector("#scroll-box > div > div > form > div:nth-child(1) > div.okui-form-item-control > div > div > div > div.okui-popup.select-popup-reference > div > div > div > div > div > div > div:nth-child(3) > div").click();
document.querySelector("#scroll-box > div > div > form > div:nth-child(7) > div > div > div > label > span.okui-checkbox > input").click();

for (let i = 0; i < wallets.length; i++) {
  console.log(\`Добавление кошелька \${i + 1} из \${wallets.length}\`);

  const addressInput = document.querySelector(walletSelectors[i]);
  const nameInput = document.querySelector(nameSelectors[i]);

  fillInput(addressInput, wallets[i]);
  await new Promise((resolve) => setTimeout(resolve, 50));

  if (names.length > 0) {
    fillInput(nameInput, names[i]);
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  if (i < wallets.length - 1) {
    const button = document.querySelector(addButtonSelector);
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 50));
    scrollBox.scroll(0,scrollBox.scrollHeight)
  }
}

document.querySelector("#body > div.okui-transition-fade.okui-dialog.okui-dialog-float.okui-transition-fade-entered > div > div.okui-dialog-footer-box.okui-dialog-footer-line > div > button").click();

for (let i = 0; i < 16; i++) {
  try {
    const send_email_code = document.querySelector("#scroll-box > div > div > form > div:nth-child(7) > div > div > div > div > form > div:nth-child(1) > div.okui-form-item-md.okui-form-item.okui-form-item-no-label > div > div > div > div > div > div > div > div");
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


function copyTextToClipboard() {
    const textToCopy = document.getElementById('code').value;
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)

        const toast = document.getElementsByClassName('toast_default')[0]
        const code = document.getElementById('code')
        toast.classList.add("toast_show")
        code.classList.add('colored_textarea')
        setTimeout(() => {
            {
                toast.classList.remove("toast_show");
                code.classList.remove('colored_textarea')
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
