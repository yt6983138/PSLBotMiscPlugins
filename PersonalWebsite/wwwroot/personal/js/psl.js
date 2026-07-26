//import * as PSL from "../../../../PhigrosApi.Client.Javascript/src";
// uncomment/comment above lines to trick ide for intellisense
// this is really annoying but i cant find a better way

var qrCodeApi = new PSL.LoginQrCodeApi();
var cloudSaveApi = new PSL.CloudSaveApi();
var localSaveApi = new PSL.LocalSaveApi();

var globalToken = null;
var globalIsInternational = false;
var globalSaveIndex = 0;

let draggableMaxIndex = 0;
function MakeDraggable(dialog) {
    if (typeof dialog === "string")
        dialog = document.getElementById(dialog);
    if (!(dialog instanceof HTMLElement)) throw new Error("bad element");

    dialog.classList.add("draggable");

    let draggable = dialog.getElementsByClassName("dialog-header")[0];
    draggable.addEventListener('mousedown', (e) => {
        dialog.isDragging = true;
        offsetX = e.clientX - dialog.offsetLeft;
        offsetY = e.clientY - dialog.offsetTop;
        dialog.style.zIndex = (++draggableMaxIndex).toString();
        draggable.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', (e) => {
        if (!dialog.isDragging) return;
        dialog.style.left = (e.clientX - offsetX) + 'px';
        dialog.style.top = (e.clientY - offsetY) + 'px';
    });
    document.addEventListener('mouseup', () => {
        dialog.isDragging = false;
        draggable.style.cursor = 'auto';

        let rect = dialog.getBoundingClientRect();
        let parentRect = dialog.parentElement.getBoundingClientRect();
        let topOffset = rect.top - parentRect.top;
        let leftOffset = rect.left - parentRect.left;
        let bottomOffset = parentRect.bottom - rect.bottom;
        let rightOffset = parentRect.right - rect.right;

        if (leftOffset < 0) dialog.style.left = `0px`;
        if (topOffset < 0) dialog.style.top = `0px`;
        if (rightOffset < 0) dialog.style.left = `${leftOffset + rightOffset}px`;
        if (bottomOffset < 0) dialog.style.top = `${topOffset + bottomOffset}px`;
    });
}

/**
 * 
 * @param {any} apiCall
 * @param {any} binder
 * @param {any} options
 * @param {any} noReject
 * @returns {Promise<{Error, Data, Response}>}
 */
function AsAsync(apiCall, binder, options, noReject = false) {
    return new Promise((resolve, reject) => {
        apiCall.bind(binder)(options, (error, data, response) => {
            if (noReject) {
                resolve({ Error: error, Data: data, Response: response });
            }

            if (error) {
                reject({ Error: error, Response: response });
            } else {
                resolve({ Data: data, Response: response });
            }
        });
    })
}
function CreateDefaultRequestParams(includeIndex = true) {
    let obj = { body: globalToken, isInterational: globalIsInternational };
    if (includeIndex) obj.index = globalSaveIndex;

    return obj;
}

/**
 * Convert a string from camelCase/PascalCase to snake_case
 */
function toSnakeCase(str) {
    return str
        .replace(/([A-Z])/g, "_$1")   // insert underscore before capital letters
        .replace(/^_/, "")            // remove leading underscore if any
        .toLowerCase();
}

/**
 * Recursively convert object keys to snake_case
 */
function keysToSnakeCase(obj) {
    if (Array.isArray(obj)) {
        return obj.map(keysToSnakeCase);
    } else if (obj !== null && typeof obj === "object") {
        return Object.keys(obj).reduce((acc, key) => {
            const snakeKey = toSnakeCase(key);
            acc[snakeKey] = keysToSnakeCase(obj[key]);
            return acc;
        }, {});
    }
    return obj; // primitive values unchanged
}

async function Initialize() {
    if (LoadToken()) {
        document.getElementById("SaveToken").checked = true;
        DisableLoginRelatedThings();
        SetMiscDisabled(false);
    }
    else {
        EnableLoginRelatedThings();
        SetMiscDisabled(true);
    }
    MakeDraggable("main");
    MakeDraggable("ManualLogin");
    MakeDraggable("TapTapLogin");
    MakeDraggable("SeeMyToken");
}
window.onload = () => {
    Initialize();
};

function HandleCommonError(error) {
    let errorString = error instanceof Error ? error.toString() : JSON.stringify(error);

    console.error(`Common error handler: ${errorString}`);
    alert(`Unhandled error occoured. You can continue using or report to author.\n${errorString}`);
}
window.addEventListener('unhandledrejection', (event) => {
    HandleCommonError(event.reason);
});

function SaveToken(token, isInternational) {
    globalIsInternational = isInternational;
    globalToken = token;
    if (document.getElementById("SaveToken").checked) {
        localStorage.setItem("Token", token);
        localStorage.setItem("IsInternational", isInternational);
    }
}
function ClearToken() {
    globalIsInternational = false;
    globalToken = null;
    localStorage.removeItem("Token");
    localStorage.removeItem("IsInternational");
}
function LoadToken() {
    let token = localStorage.getItem("Token");
    let isInternational = localStorage.getItem("IsInternational");

    if (token !== null && isInternational !== null) {
        globalToken = token;
        globalIsInternational = isInternational ? true : false;
        return true;
    }

    return false;
}

function SetMiscDisabled(isDisabled) {
    document.getElementById("SeeMyTokenButton").disabled = isDisabled;
    document.getElementById("SelectIndexButton").disabled = isDisabled;
}
function DisableLoginRelatedThings() {
    document.getElementById("LoginManual").disabled = true;
    document.getElementById("LoginTapTap").disabled = true;
    document.getElementById("SaveToken").disabled = true;
}
function EnableLoginRelatedThings() {
    document.getElementById("LoginManual").disabled = false;
    document.getElementById("LoginTapTap").disabled = false;
    document.getElementById("SaveToken").disabled = false;
}

async function UpdateScores() {
    // currently, the generated api client is broken so those api calls will throw an error
    // TODO: regenerate the api client
    let otherData = (await AsAsync(cloudSaveApi.phiApiCloudSaveGetSaveDataPost, cloudSaveApi, CreateDefaultRequestParams())).Data.data;
    let records = (await AsAsync(cloudSaveApi.phiApiCloudSaveGetRecordsPost, cloudSaveApi, CreateDefaultRequestParams())).Data.data;

    let aboutMeRow = document.getElementById("AboutMeData");
    let scoresTable = document.getElementById("ScoresTable");

    aboutMeRow.innerHTML = `
        
    `;
}

function Logout(e) {
    ClearToken();
    window.location.reload();
}
function LoginManual(e) {
    DisableLoginRelatedThings();
    SetMiscDisabled(true);
    document.getElementById("ManualLogin").style.display = "inherit";
}
function LoginManualCancel(e) {
    EnableLoginRelatedThings();
    document.getElementById("ManualLogin").style.display = "none";
} 
async function LoginManualNext(e) {
    let errorElement = document.getElementById("ManualLoginError");
    let tokenElement = document.getElementById("ManualLoginToken");
    let cancelElement = document.getElementById("ManualLoginCancel");
    let isInternationalElement = document.getElementById("ManualLoginIsInternational");

    /** @type {string} */
    let token = tokenElement.value;
    let isInternational = isInternationalElement.checked;
    if (token.length != 25) {
        errorElement.textContent = "Syntax Error: Token should have 25 characters."
        return;
    }
    if (!(/^[a-z0-9]+$/.test(token))) {
        errorElement.textContent = "Syntax Error: Token can only be alphanumeric and lower case only."
        return;
    }

    e.target.disabled = true;
    tokenElement.disabled = true;
    isInternationalElement.disabled = true;
    cancelElement.disabled = true;

    try {
        await AsAsync(cloudSaveApi.phiApiCloudSaveGetSaveIndexesPost, cloudSaveApi, CreateDefaultRequestParams(false));
    } catch (error) {
        HandleCommonError(error);

        SaveToken(token, isInternational);
        document.getElementById("ManualLogin").style.display = "none";
        SetMiscDisabled(false);
    } finally {
        e.target.disabled = false;
        tokenElement.disabled = false;
        isInternationalElement.disabled = false;
        cancelElement.disabled = false;
    }
}

let loginTapTapIntervalId = null;
async function LoginTapTap(e) {
    DisableLoginRelatedThings();
    SetMiscDisabled(true);
    document.getElementById("TapTapLogin").style.display = "inherit";
}
async function LoginTapTapCancel(e) {
    EnableLoginRelatedThings();
    document.getElementById("TapTapLogin").style.display = "none";
    clearInterval(loginTapTapIntervalId);
}
async function LoginTapTapGenerate(e) {
    let isInternationalElement = document.getElementById("TapTapLoginIsInternational");
    let generateElement = document.getElementById("TapTapLoginGenerate");

    let SetDisabled = (disabled) => {
        isInternationalElement.disabled = true;
        generateElement.disabled = true;
    }

    let isInternational = isInternationalElement.checked;

    SetDisabled(true); // why wont the intellisense work well bruh

    /** @type {PSL.CompleteQRCodeData} */
    let currentProceedingQrCode = null;
    try {
        currentProceedingQrCode = (await AsAsync(qrCodeApi.phiApiLoginQrCodeGetNewQRCodeGet, qrCodeApi, { useChinaEndpoint: !isInternational })).Data.data;
    } catch (error) {
        SetDisabled(false);
        HandleCommonError(error);
        return;
    }

    let group = document.getElementById("TapTapLoginInfoGroup");
    let qrImage = document.getElementById("TapTapLoginInfoGroupQRCode");
    let urlElement = document.getElementById("TapTapLoginInfoGroupURL");
    let urlAltElement = document.getElementById("TapTapLoginInfoGroupURLAlternate");
    let infoElement = document.getElementById("TapTapLoginInfoGroupInfo");

    if (!isInternational) {
        urlAltElement.style.display = "inherit";
        urlAltElement.href = currentProceedingQrCode.url.replace("https://accounts.taptap.cn/device", "https://taptap.yt6983138.top/begin");
    }
    else urlAltElement.style.display = "none";

    group.style.display = "inherit";
    urlElement.href = currentProceedingQrCode.url;

    if (!qrImage.qrCode)
        qrImage.qrCode = new QRCode(qrImage, { width: 128, height: 128 });

    qrImage.qrCode.clear();
    qrImage.qrCode.makeCode(currentProceedingQrCode.url);

    infoElement.textContent = "";

    const LESS_TIMEOUT = 5000;

    let willExpireOn = Date.now() + currentProceedingQrCode.expiresInSeconds * 1000 - LESS_TIMEOUT;

    let expireTimeoutId = null;
    let infoIntervalId = setInterval(() => {
        infoElement.textContent = `Expires in ${Math.floor((willExpireOn - Date.now()) / 1000).toString()} seconds`;
    }, 1000)
    loginTapTapIntervalId = setInterval(async () => {
        /** @type {PSL.TapTapTokenData} */
        let checkedResult = null;
        try {
            let checkResult = (await AsAsync(qrCodeApi.phiApiLoginQrCodeCheckQRCodePost, qrCodeApi, {
                body: currentProceedingQrCode,
                useChinaEndpoint: !isInternational
            })).Data;
            if (!checkResult.success) {
                console.log(checkResult);
                return;
            }
            checkedResult = checkResult.data;
        } catch (error) {
            HandleCommonError(error);
            return;
        }

        let tokenResult = null;
        try {
            tokenResult = (await AsAsync(qrCodeApi.phiApiLoginQrCodeGetPhigrosTokenPost, qrCodeApi, {
                body: keysToSnakeCase(checkedResult), // had to use some hacks, serialization doesnt use name used in deserialization
                useChinaEndpoint: !isInternational
            })).Data;
        } catch (error) {
            HandleCommonError(error);
            return;
        }

        SaveToken(tokenResult, isInternational);
        clearInterval(loginTapTapIntervalId);
        clearInterval(infoIntervalId);
        clearTimeout(expireTimeoutId);
        document.getElementById("TapTapLogin").style.display = "none";
        SetMiscDisabled(false);

    }, currentProceedingQrCode.interval * 1000);
    expireTimeoutId = setTimeout(() => {
        clearInterval(loginTapTapIntervalId);
        clearInterval(infoIntervalId);
        SetDisabled(false);
        group.style.display = "none";
    }, currentProceedingQrCode.expiresInSeconds * 1000 - LESS_TIMEOUT);
}

function SeeMyToken(e) {
    let dialog = document.getElementById("SeeMyToken");
    let content = document.getElementById("SeeMyTokenContent");

    content.innerHTML = `Token: <input readonly value="${globalToken}"/><br/><br/>Is international: <input readonly value="${globalIsInternational}"/>`;
    dialog.style.display = "inherit";
}
function SeeMyTokenClose(e) {
    let dialog = document.getElementById("SeeMyToken");
    let content = document.getElementById("SeeMyTokenContent");

    content.innerHTML = "";
    dialog.style.display = "none";
}

async function SelectSaveIndex(e) {
    let dialog = document.getElementById("SelectIndex");
    let select = document.getElementById("SelectIndexMenu");

    dialog.style.display = "inherit";
    let indexes = (await AsAsync(cloudSaveApi.phiApiCloudSaveGetSaveIndexesPost, cloudSaveApi, CreateDefaultRequestParams(false))).Data.data;

    for (let index of indexes) {
        select.innerHTML += `<option value="${index.index}">${index.index} - ${new Date(index.modificationTime)}</option>`;
    }
    select.value = "0";
}
async function SelectSaveIndexClose(e) {
    let dialog = document.getElementById("SelectIndex");
    let select = document.getElementById("SelectIndexMenu");

    dialog.style.display = "none";
    select.innerHTML = "";
    globalSaveIndex = parseInt(select.value);
    if (globalSaveIndex < 0 || globalSaveIndex === NaN) globalSaveIndex = 0;

    let button = document.getElementById("SelectIndexButton");
    button.disabled = true;
    try {
        await UpdateScores();
    }
    catch (error) {
        alert(`Error updating scores: ${JSON.stringify(error)}`);
    }
    button.disabled = false;
}
