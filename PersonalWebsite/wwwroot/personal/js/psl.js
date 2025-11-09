/// <reference path="../../swagger/PhigrosApi/index.js" />
/// <reference path="../../swagger/PhigrosApi/ApiClient.js" />

import CloudSaveApi from "../../swagger/PhigrosApi/api/CloudSaveApi";
import LocalSaveApi from "../../swagger/PhigrosApi/api/LocalSaveApi";
import LoginQrCodeApi from "../../swagger/PhigrosApi/api/LoginQrCodeApi";

var qrCodeApi = new LoginQrCodeApi();
var cloudSaveApi = new CloudSaveApi();
var localSaveApi = new LocalSaveApi();
