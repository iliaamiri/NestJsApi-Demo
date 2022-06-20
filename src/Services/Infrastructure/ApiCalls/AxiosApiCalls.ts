import IApiCalls from './IApiCalls';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Injectable, Scope } from '@nestjs/common';
import PokerVancApiAuthorizationHeaders from '../../../Models/StaticModels/PokerVancApiAuthorizationHeadersFields';

@Injectable({ scope: Scope.DEFAULT })
class AxiosApiCalls implements IApiCalls {
  public AppApiBaseUrl = this._configService.get('APP_API_BASE_URL');

  public AuthorizationHeaders = {
    [PokerVancApiAuthorizationHeaders.FieldNames.ProviderId]:
      this._configService.get('APP_PROVIDER_ID'),
    [PokerVancApiAuthorizationHeaders.FieldNames.ProviderSignature]:
      this._configService.get('APP_PROVIDER_SIGNATURE'),
    //'Authorization': `Bearer ${tokenBearer}`,
  };

  constructor(private _configService: ConfigService) {}

  async get(url: string, headers?: any): Promise<any> {
    return axios.get(this.makeApiUrl(url), {
      headers: { ...this.AuthorizationHeaders, ...headers },
    });
  }

  async post(url: string, data: object, headers?: any): Promise<any> {
    return axios.post(this.makeApiUrl(url), data, {
      headers: { ...this.AuthorizationHeaders, ...headers },
    });
  }

  async put(url: string, data: object, headers?: any): Promise<any> {
    return axios.put(this.makeApiUrl(url), data, {
      headers: { ...this.AuthorizationHeaders, ...headers },
    });
  }

  async delete(url: string, headers?: any): Promise<any> {
    return axios.delete(this.makeApiUrl(url), {
      headers: { ...this.AuthorizationHeaders, ...headers },
    });
  }

  async patch(url: string, data: object, headers?: any): Promise<any> {
    return axios.patch(this.makeApiUrl(url), data, {
      headers: { ...this.AuthorizationHeaders, ...headers },
    });
  }

  private makeApiUrl(url: string): string {
    return `${this.AppApiBaseUrl}${url}`;
  }
}

export default AxiosApiCalls;
