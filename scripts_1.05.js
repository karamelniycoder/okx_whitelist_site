function splitTextOnPaste(event, element_id) {
    event.preventDefault();

    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('text');

    // ELEMENT

    let lines;
    if (["addresses", "names"].includes(element_id)) {
        lines = pastedText.split('\n').slice(0, 20);
    } else if (element_id === "bybit_label") {
        lines = pastedText.split('\n').slice(0, 1);
    } else {
        lines = pastedText.split('\n');
    }

    const formattedLines = lines.map((line) => {
        return line.trim();
    });

    const textareaElement = document.getElementById(element_id);
    textareaElement.value = formattedLines.join('\n');

    // CODE
    if (element_id === "addresses") {
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


function bybitOnChange() {
    const addressesText = document.getElementById('addresses_two').value;
    const addressLabel = document.getElementById('bybit_label').value;

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
    await delay(1e3);
    for (let t = 0; t < e.length - 1; t++) {
        document.querySelector("#dynamic_form_nest_item .money__address-batch-form-action-btn").click(), await delay(100)
    }
    const c = Array.from(document.querySelectorAll("#dynamic_form_nest_item > .ant-space"));
    for (let o = 0; o < c.length; o++) {
        const l = c[o],
            a = e[o];
        clickElement(l.querySelector(".ant-space-item:nth-child(2) .ant-form-item-control.css-29t93j > div > div > div > div")), await delay(100);
        const i = Array.from(document.querySelectorAll(".ant-select-dropdown"))[o];
        setValue(i.querySelector("input"), "Linea"), await delay(500);
        clickElement(i.querySelector('div[title="LINEA"]')), await delay(500);
        setValue(l.querySelector(".ant-space-item:nth-child(3) input"), a);
        setValue(l.querySelector(".ant-space-item:nth-child(5) input"), \`\${t}\${Number(n) + Number(o)}\`)
    }
}, window.generateFunctions = function(e, t, n = 1) {
    const c = e.trim().split("\\n").map((e => e.trim()));
    let o = 1;
    for (let e = 0; e < c.length; e += 5) {
        const l = c.slice(e, e + 5);
        window[\`add\${o}\`] = (e => () => window.addAddresses(l, t, e))(n), n += l.length, console.log(\`Generated add\${o}()\`), o++
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
});
