
import {decryptData,encryptData} from "../services/aes/aes.services";
import { environment } from "./api-url.config";

const decryptedBaseUrl =decryptData(environment.api_base_url);
const _dmsAuthUrl =decryptData(environment.dms_services_token_gen);
const _dmsUrl =decryptData(environment.dms_services);

export const api_end_point = {
    commonUrl:decryptedBaseUrl,
    login:decryptedBaseUrl + 'login',

    // User-Role Management
    roleList:decryptedBaseUrl + 'GetAllRole',
    GetAllUsers:decryptedBaseUrl + 'GetAllUsers',
    roleSubmit:decryptedBaseUrl + 'InsertRole',
    roleListFilter:decryptedBaseUrl + 'FilterRole',
    roleGetById:decryptedBaseUrl + 'GetByIdRole',
    roleUpdate:decryptedBaseUrl + 'UpdateRole',

    // rad

    radRatioAnalysisScoreBrowse:decryptedBaseUrl + 'GetAllRatioAnalysisScore',
    radScoreFilter:decryptedBaseUrl + 'FilterRatioAnalysis',
    radScoreSubmit:decryptedBaseUrl + 'InsertRatioAnalysisScore',
    radScoreGetById:decryptedBaseUrl + 'GetByIdRatioAnalysisScore',
    radScoreUpdate:decryptedBaseUrl + 'UpdateRatioAnalysisScore',
    radRatioAnalysisWeightageBrowse:decryptedBaseUrl + 'GetAllWeightageConfig',
    radWeightageFilter:decryptedBaseUrl + 'FilterRatioWeightage',
    radWeightageGetById:decryptedBaseUrl + 'GetByIdWeightage',
    radWeightageUpdate:decryptedBaseUrl + 'UpdateWeightageConfig',
    radWeightageStatusUpdate:decryptedBaseUrl + 'StatusUpdateRatioAnalysisWeightage',

    // Credit-Committee

    getAllCreditCommitteData:decryptedBaseUrl + 'GetAllCreditCommittee',
    filterCreditCommittee:decryptedBaseUrl + 'FilterCreditCommittee',
    insertCreditCommittee:decryptedBaseUrl + 'InsertCreditCommittee',
    updateCreditCommittee:decryptedBaseUrl + 'UpdateCreditCommittee',
    getByIdCreditCommittee:decryptedBaseUrl + 'GetByIdCreditCommittee',
    statusUpdateCreditCommittee:decryptedBaseUrl + 'StatusUpdateCreditCommittee',

      //dms services]
  tokenGen: _dmsAuthUrl + 'Index',
  uploadFile: _dmsUrl + 'UploadFile',
    
}