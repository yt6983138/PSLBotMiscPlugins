const Status = {
    Unread: 0,
    Processing: 1,
    Resolved: 2,

    SentByUs: 1 << 31,

    IsSentByUs(status) {
        return Status.HasFlag(status, Status.SentByUs);
    },
    HasFlag(status, flag) {
        return (status & flag) === flag;
    },
    AsIgnoreSender(status) {
        return status & ~Status.SentByUs;
    },
    ToString(status) {
        if (status === Status.SentByUs) return "SentByUs";
        const statusWithoutSender = Status.AsIgnoreSender(status);
        const keys = Object.keys(Status).slice(0, 4);
        for (const key of keys) {
            if (Status[key] === statusWithoutSender) {
                return key + (Status.IsSentByUs(status) ? " | SentByUs" : "")
            }
        }
        return status.toString();
    }
}

var superSecret = null;
async function GetAll() {
    return await (await fetch("/api/reports/reports", { headers: { "Authorization": superSecret } })).json();
}
async function GetDetailed(id) {
    return await (await fetch(`/api/reports/detailed?id=${id}`, { headers: { "Authorization": superSecret } })).json();
}
async function GetAttachement(hash) {
    return await (await fetch(`/api/reports/attachment?hash=${hash}`, { headers: { "Authorization": superSecret } })).blob();
}
async function UpdateStatus(id, status) { 
    await fetch(`/api/reports/updateStatus?id=${id}&newStatus=${status}`, { method: "PATCH", headers: { "Authorization": superSecret } });
}
async function Send(model) {
    await fetch(`/api/reports/send`, { method: "POST", body: JSON.stringify(model), headers: { "Authorization": superSecret } });
}

function ConstructSendAttachment(filename, data) {
    let base64 = null;
    if (data instanceof Uint8Array) {
        base64 = data.toBase64();
    } else if (data instanceof ArrayBuffer) {
        base64 = new Uint8Array(data).toBase64();
    } else if (data instanceof Blob) {
        base64 = new Uint8Array(data.arrayBuffer()).toBase64();
    } else {
        throw new Error("Bad type of data");
    }

    return {
        fileName: filename,
        base64Content: base64
    }
}
function ConstructSendModel(recipientId, content, attachments) {
    return {
        recipientId: recipientId,
        content: content,
        attachments: attachments
    }
}
