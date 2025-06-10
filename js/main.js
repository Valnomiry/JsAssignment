//declare
var siteList = [];



var qoutIndex;
var lastIndex;
var qout = document.getElementById('quote')
var author = document.getElementById('quoteAuthor')
var warnMessageContent = document.getElementById('warnMessageContent')
var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('url')
warnMessageContent.style.display = 'none';
const tbody = document.getElementById("tableBody");
const deleteButtons = document.querySelectorAll(".btn-delete");
function closeMessage() {


    warnMessageContent.style.display = 'none';
}
loadData();

document.addEventListener('click', function (event) {
    console.log('warnMessageContent:a' + warnMessageContent.style.display)
    if (warnMessageContent.style.display == 'block') {
        console.log('bloc')
        // Check if the click was outside the messageBox
        if (!warnMessageContent.contains(event.target) && event.target.id !== 'saveBtn') {
            // Hide the message box
            warnMessageContent.style.display = 'none';
        }
    }
});

function saveSite() {
    //check if site name is empty or contains space and have at least three character
    console.log(siteName.value)
    if (!isValidName(siteName.value)) {
        warnMessageContent.style.display = 'block';
        return;
    }


    if (siteUrl.value == '' || !isValidURL(siteUrl.value)) {

        warnMessageContent.style.display = 'block';
        return;
    }

    localStorage.setItem('siteName', siteName.value);
    localStorage.setItem('siteUrl', siteUrl.value);
    console.log('siteList:' + siteList)
    siteList.push({
        siteName: siteName.value,
        siteUrl: siteUrl.value
    });

    console.log(siteList)
    localStorage.setItem('siteList', JSON.stringify(siteList));
    loadData();
    //window.location.href = 'index.html';
}

function loadData() {
    if (!localStorage.getItem('siteList'))
        return;

    siteList = JSON.parse(localStorage.getItem('siteList'));
    if (siteList) {
        tbody.innerHTML = "";
        siteList.forEach((site, index) => {
            console.log('site:' + site);
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                             <tr>
                            <th scope="row">${index + 1}</th>
                            <td>${siteList[index].siteName}</td>
                            <td><button class="btn btn-visit" id="visitBtn"onclick="visitSite(${index})">
                            <i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
                            <td><button class="btn btn-delete" id = "deleteBtn" onclick="deleteSite(${index})">
                            <i class="fa-solid fa-trash-can"></i> Delete</button>
                            </td>
                        </tr>
  `;

            tbody.appendChild(newRow);
        });
    }

}


function isValidName(name) {
    try {
        console.log(name)
        if (name == '' || name.includes(' ') || name.length < 3) {
            console.log('1')

            console.log(warnMessageContent.style.display)
            siteName.classList.remove('is-valid');
            siteName.classList.add('is-invalid');
            return false;
        }
        const firstChar = name.charAt(0);
        if (!/^[a-zA-Z]$/.test(firstChar)) {
            siteName.classList.remove('is-valid');
            siteName.classList.add('is-invalid');
            return false;

        }
        console.log('valid')
        siteName.classList.remove('is-invalid');
        siteName.classList.add('is-valid');

        return true;
    } catch (_) {
        console.log('catch')
        return false;
    }

}


function isValidURL(string) {
    try {
        new URL(string);
        siteUrl.classList.remove('is-invalid');
        siteUrl.classList.add('is-valid');
        return true;
    } catch (_) {
        siteUrl.classList.remove('is-valid');
        siteUrl.classList.add('is-invalid');
        return false;
    }
}


function deleteSite(index) {
    siteList.splice(index, 1);
    localStorage.setItem('siteList', JSON.stringify(siteList));
    loadData();
}


function visitSite(index) {
    window.open(siteList[index].siteUrl, '_blank');

}