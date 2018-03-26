import { Injectable } from '@angular/core';
import { BUILD_ENVIRONMENT} from '../../../config'

interface IEnvironmentSettings {
    apiUrl: string
    apiGrantType: string
    apiClientId: string
    apiClientSecret: string
}

class ProdEnvironmentSettings implements IEnvironmentSettings {
    apiUrl = 'http://4249-25361.el-alt.com/'
    apiGrantType = "password"
    apiClientId = "jI2oZ1zBvXQWD3XqdoUykO53"
    apiClientSecret = "qMCdFDQuF23RV1Y-1Gq9L3cF3VmuFwVbam4fMTdAfpo"
}

class StageEnvironmentSettings extends ProdEnvironmentSettings {
    apiUrl = 'http://4249-25361.el-alt.com/'
    apiGrantType = "password"
    apiClientId = 'jI2oZ1zBvXQWD3XqdoUykO53'
    apiClientSecret = 'qMCdFDQuF23RV1Y-1Gq9L3cF3VmuFwVbam4fMTdAfpo'
}

class QaEnvironmentSettings extends ProdEnvironmentSettings {
    apiUrl = 'http://4249-25361.el-alt.com/'
    apiGrantType = "password"
    apiClientId = 'jI2oZ1zBvXQWD3XqdoUykO53'
    apiClientSecret = 'qMCdFDQuF23RV1Y-1Gq9L3cF3VmuFwVbam4fMTdAfpo'
}

class LocalEnvironmentSettings extends StageEnvironmentSettings {
  apiUrl = 'http://4249-25361.el-alt.com/'
  apiGrantType = "password"
  apiClientId = 'jI2oZ1zBvXQWD3XqdoUykO53'
  apiClientSecret = 'qMCdFDQuF23RV1Y-1Gq9L3cF3VmuFwVbam4fMTdAfpo'
}

@Injectable()
export class Environment {
    constructor() {
        switch (BUILD_ENVIRONMENT.trim().toLowerCase()) {
            case 'l':
            case 'local':
            case 'dev':
            case 'development':
            case 'debug':
                this.settings = new LocalEnvironmentSettings()
                break;
            case 's':
            case 'stage':
            case 'staging':
                this.settings = new StageEnvironmentSettings()
                break;
            case 'QA':
            case 'qa':
            case 'q':
                this.settings = new QaEnvironmentSettings()
                break;
            default:
                this.settings = new ProdEnvironmentSettings()
                break;
        }
    }

    public settings: IEnvironmentSettings;
}