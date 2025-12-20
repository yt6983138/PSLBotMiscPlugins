//import * as PSL from "../../../../PhigrosApi.Client.Javascript/src";
// uncomment/comment above lines to trick ide for intellisense
// this is really annoying but i cant find a better way

var qrCodeApi = new PSL.LoginQrCodeApi();
var cloudSaveApi = new PSL.CloudSaveApi();
var localSaveApi = new PSL.LocalSaveApi();

var globalToken = null;
var globalIsInternational = false;

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
    MakeDraggable("main");
    MakeDraggable("ManualLogin");
    MakeDraggable("TapTapLogin");
}
window.onload = () => {
    Initialize();
}

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

async function Logout(e) {
    ClearToken();
    window.location.reload();
}
async function LoginManual(e) {
    DisableLoginRelatedThings();
    document.getElementById("ManualLogin").style.display = "inherit";
}
async function LoginManualCancel(e) {
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

    cloudSaveApi.phiApiCloudSaveGetSaveIndexesPost({ body: token, isInternational: isInternational }, (error, data, response) => {
        e.target.disabled = false;
        tokenElement.disabled = false;
        isInternationalElement.disabled = false;
        cancelElement.disabled = false;

        if (error) {
            errorElement.textContent = JSON.parse(error.message).data.message;
            return;
        }
        SaveToken(token, isInternational);
        document.getElementById("ManualLogin").style.display = "none";
    });
}

async function LoginTapTap(e) {
    DisableLoginRelatedThings();
    document.getElementById("TapTapLogin").style.display = "inherit";
}
async function LoginTapTapCancel(e) {
    EnableLoginRelatedThings();
    document.getElementById("TapTapLogin").style.display = "none";
}
async function LoginTapTapGenerate(e) {
    let isInternationalElement = document.getElementById("TapTapLoginIsInternational");
    let generateElement = document.getElementById("TapTapLoginGenerate");

    let SetDisabled = (disabled) => {
        isInternationalElement.disabled = true;
        generateElement.disabled = true;
    }

    /** @type {PSL.CompleteQRCodeData} */
    let currentProceedingQrCode = null;

    let isInternational = isInternationalElement.checked;

    SetDisabled(true); // why wont the intellisense work well bruh
    qrCodeApi.phiApiLoginQrCodeGetNewQRCodeGet({ useChinaEndpoint: !isInternational }, (error, data, response) => {
        currentProceedingQrCode = data.data;
        if (error) {
            SetDisabled(false);
            alert(error);
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
        let intervalId = setInterval(() => {
            // wish they are c# task like apis
            qrCodeApi.phiApiLoginQrCodeCheckQRCodePost({ body: currentProceedingQrCode, useChinaEndpoint: !isInternational }, (checkError, checkResult, checkResponse) => {
                if (checkError) {
                    console.error(checkError);
                    return;
                }
                if (!checkResult.success) {
                    console.error(checkResult);
                    return;
                }
                /** @type {PSL.TapTapTokenData} */
                let checkedResult = checkResult.data;
                qrCodeApi.phiApiLoginQrCodeGetPhigrosTokenPost({
                    body: keysToSnakeCase(checkedResult), // had to use some hacks, serialization doesnt use name used in deserialization
                    useChinaEndpoint: !isInternational
                }, (tokenError, tokenResult, tokenResponse) => {
                    if (tokenError) {
                        console.error(tokenError);
                        return;
                    }
                    SaveToken(tokenResult, isInternational);
                    clearInterval(intervalId);
                    clearInterval(infoIntervalId);
                    clearTimeout(expireTimeoutId);
                    document.getElementById("TapTapLogin").style.display = "none";
                });
            });

        }, currentProceedingQrCode.interval * 1000);
        expireTimeoutId = setTimeout(() => {
            clearInterval(intervalId);
            clearInterval(infoIntervalId);
            SetDisabled(false);
            group.style.display = "none";
        }, currentProceedingQrCode.expiresInSeconds * 1000 - LESS_TIMEOUT);
    });
}