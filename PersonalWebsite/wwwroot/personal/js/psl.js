/// <reference path="PhigrosApi.d.ts" />

const ScoreStatus = {
    Bugged: -1,
    NotFc: 0,
    Fc: 1,
    Phi: 2,
    Vu: 3,
    S: 4,
    A: 5,
    B: 6,
    C: 7,
    False: 8
};
const ScoreStatusString = SwapKeyValue(ScoreStatus);

const ChallengeRank = {
    White: 0,
    Green: 1,
    Blue: 2,
    Red: 3,
    Gold: 4,
    Rainbow: 5
};
const ChallengeRankString = SwapKeyValue(ChallengeRank);

const Difficulty = {
    EZ: 0,
    HD: 1,
    IN: 2,
    AT: 3,
    Legacy: 4,
    SP: 5
}
const DifficultyString = SwapKeyValue(Difficulty);

var qrCodeApi = new PSL.LoginQrCodeApi();
var cloudSaveApi = new PSL.CloudSaveApi();
var localSaveApi = new PSL.LocalSaveApi();

var globalToken = null;
var globalIsInternational = false;
var globalSaveIndex = 0;
/** @type {PSL.SaveTimeIndex[]} */
var globalSaveIndexData = null;

function SwapKeyValue(json) {
    var ret = {};
    for (var key in json) {
        ret[json[key]] = key;
    }
    return ret;
}
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
function CreateDefaultRequestParams(includeIndex = true) {
    let obj = { body: globalToken, isInterational: globalIsInternational };
    if (includeIndex) obj.index = globalSaveIndex;

    return obj;
}
async function FetchSaveIndexes(token = null, isInternational = false) {
    if (!token) {
        token = globalToken;
        isInternational = globalIsInternational;
    }

    SetProgressBar(1, "Loading save indexes...")
    let data = await cloudSaveApi.phiApiCloudSaveGetSaveIndexesPost({ body: token, isInternational: isInternational });
    CompleteProgressBar("Loaded save indexes.");
    globalSaveIndexData = data.data;
    return data.data;
}

async function Initialize() {
    MakeDraggable("main");
    MakeDraggable("ManualLogin");
    MakeDraggable("TapTapLogin");
    MakeDraggable("SeeMyToken");
    MakeDraggable("ScoreView");

    if (LoadToken()) {
        document.getElementById("SaveToken").checked = true;
        DisableLoginRelatedThings();
        SetMiscDisabled(false);
        await UpdateScores();
    }
    else {
        EnableLoginRelatedThings();
        SetMiscDisabled(true);
    }
}
window.onload = () => {
    Initialize();
};

let progressBarProgress = NaN;
let progressBarDivisions = 100;
let progressBarMaxBeforeComplete = 0.95;
function SetProgressBar(secondsToComplete, label = null, progress = 0) {
    if (isNaN(progressBarProgress)) {
        document.getElementById("Progress").style.display = "unset";

        setInterval(() => {
            document.getElementById("ProgressBar").value = progressBarProgress;

            if (progressBarProgress > progressBarMaxBeforeComplete)
                return;

            progressBarProgress += 1 / progressBarDivisions;
        }, 10);
    }

    progressBarDivisions = secondsToComplete * 100;
    progressBarProgress = progress;

    if (label !== null)
        document.getElementById("ProgressLabel").innerHTML = label;
}
function CompleteProgressBar(label = null) {
    progressBarProgress = 1;

    if (label !== null)
        document.getElementById("ProgressLabel").innerHTML = label;
}

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
        globalIsInternational = isInternational === "true";
        return true;
    }

    return false;
}

function FormatUserString(num) {
    return num.toFixed(2); // TODO: implement setting
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
    if (globalSaveIndexData === null) {
        await FetchSaveIndexes();
    }

    SetProgressBar(3, "Loading scores...");

    let otherData = (await cloudSaveApi.phiApiCloudSaveGetSaveDataPost(CreateDefaultRequestParams())).data;
    let records = (await cloudSaveApi.phiApiCloudSaveGetRecordsPost(CreateDefaultRequestParams())).data;
    records.sort((a, b) => b.rks - a.rks);

    let scoreView = document.getElementById("ScoreView");
    let aboutMeRow = document.getElementById("AboutMeData");
    let scoresTable = document.getElementById("ScoresTable");

    scoreView.style.display = "unset";

    const padding = {
        "score": {
            "score": 0,
            "accuracy": 0,
            "id": "",
            "difficulty": Difficulty.EZ,
            "status": ScoreStatus.False
        },
        "nameOrDefault": "",
        "name": "",
        "chartConstant": 0,
        "rks": 0
    }

    let rks = 0;
    let phi3 = [];
    for (let i = 0; i < records.length; i++) {
        let record = records[i];

        if (phi3.length < 3 && record.score.status === ScoreStatus.Phi) {
            rks += record.rks / 30;
            phi3.push(record);
        }

        if (i < 27)
            rks += record.rks / 30;
    }
    while (phi3.length < 3)
        phi3.push(padding);

    records.splice(0, 0, ...phi3);

    aboutMeRow.innerHTML = `
        <td class="TableFirst">${otherData.gameUserInfo.avatarId}</td>
        <td class="TableSecond">${otherData.playerInfo.nickName}</td>
        <td class="TableThird">${globalSaveIndexData[globalSaveIndex].modificationTime.toLocaleString()}</td>
        <td class="TableForth">${ChallengeRankString[otherData.progress.challengeModeRank.rank]} ${otherData.progress.challengeModeRank.level}</td>
        <td class="TableFifth">${FormatUserString(rks)}</td>
    `;

    while (scoresTable.childElementCount > 1)
        scoresTable.children[1].remove();

    for (let i = 0; i < records.length; i++) {
        let record = records[i];
        scoresTable.insertAdjacentHTML("beforeend", `
            <tr>
                <td class="TableFirst">${i < 3 ? 'φ' : '#'}${i + 1}</td>
                <td class="TableSecond">${record.name}</td>
                <td class="TableThird">${DifficultyString[record.score.difficulty]} ${record.chartConstant.toFixed(1)}</td>
                <td class="TableForth">${record.score.score}</td>
                <td class="TableFifth">${FormatUserString(record.score.accuracy)}</td>
                <td class="TableSixth">${FormatUserString(record.rks) }</td>
                <td class="TableSeventh">${ScoreStatusString[record.score.status]}</td>
            <tr/>
        `)
    }

    CompleteProgressBar("Scores loaded.");
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
        await FetchSaveIndexes(token, isInternational);

        SaveToken(token, isInternational);
        document.getElementById("ManualLogin").style.display = "none";
        SetMiscDisabled(false);

        await UpdateScores();
    } catch (error) {
        HandleCommonError(error);
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
        SetProgressBar(1, "Generating login QRCode...");
        currentProceedingQrCode = (await qrCodeApi.phiApiLoginQrCodeGetNewQRCodeGet({ useChinaEndpoint: !isInternational })).data;
    } catch (error) {
        SetDisabled(false);
        HandleCommonError(error);
        return;
    }
    CompleteProgressBar("Login QRCode generated.");

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
            let checkResult = await qrCodeApi.phiApiLoginQrCodeCheckQRCodePost({
                noReadOfCompleteQRCodeData: currentProceedingQrCode,
                useChinaEndpoint: !isInternational
            });
            if (!checkResult.success) {
                console.log(checkResult);
                return;
            }
            checkedResult = checkResult.data;
        } catch (error) {
            HandleCommonError(error);
            return;
        }

        SetProgressBar(1, "Fetching Phigros token...");

        let tokenResult = null;
        try {
            tokenResult = await qrCodeApi.phiApiLoginQrCodeGetPhigrosTokenPost({
                noReadOfTapTapTokenData: checkedResult,
                useChinaEndpoint: !isInternational
            });
        } catch (error) {
            HandleCommonError(error);
            return;
        }

        CompleteProgressBar("Fetched Phigros token.");

        SaveToken(tokenResult.data, isInternational);
        clearInterval(loginTapTapIntervalId);
        clearInterval(infoIntervalId);
        clearTimeout(expireTimeoutId);
        document.getElementById("TapTapLogin").style.display = "none";
        SetMiscDisabled(false);

        await UpdateScores();
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
    let indexes = await FetchSaveIndexes();

    for (let index of indexes) {
        select.innerHTML += `<option value="${index.index}">${index.index} - ${new Date(index.modificationTime)}</option>`;
    }
    select.value = "0";
}
async function SelectSaveIndexClose(e) {
    let dialog = document.getElementById("SelectIndex");
    let select = document.getElementById("SelectIndexMenu");

    dialog.style.display = "none";
    globalSaveIndex = parseInt(select.value);
    if (globalSaveIndex < 0 || isNaN(globalSaveIndex))
        globalSaveIndex = 0;

    select.innerHTML = "";

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
