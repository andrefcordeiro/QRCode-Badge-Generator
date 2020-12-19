
function clearAllInputs() {
    /* pegando todos os elementos input */
    let elements = document.getElementsByClassName('input')

    /* pegando todos os valores do elementos input */
    for (let i = 0; i < elements.length; i++) {
        elements[i].value = ""
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function generateQR() {
    var typeNumber = 10;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);

    /* pegando todos os elementos input */
    let elements = document.getElementsByClassName('input')
    let texts = []

    /* pegando todos os valores do elementos input */
    for (let i = 0; i < elements.length; i++) {
        texts.push(elements[i].value)
    }

    /* adicionando no qrCode cada um dos campos com seus respectivos valores*/

    /* verificando se os campos requeridos estão vazios [trim() remove os espaços vazios]*/
    if (!texts[0].trim() || !texts[1].trim())
        alert("Required fields are empty")

    else if (texts[0].split(" ").length < 2)
        alert("Inform the first and the last name")

    else if (!validateEmail(texts[1]))
        alert("Email address is not properly formatted")

    else {
        qr.addData("Nome: " + texts[0] + "\n");
        qr.addData("Email: " + texts[1] + "\n");

        if (texts[2].trim() != null) {
            if (texts[2][0] != "@") {
                alert("Twitter username should start with '@'")
                return
            }
            else
                qr.addData("Twitter: " + texts[2] + "\n");
        }
        qr.addData("Github: " + texts[3]);
        qr.make();
        document.getElementById('qr-code').innerHTML = qr.createImgTag(5);
    }

}

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}