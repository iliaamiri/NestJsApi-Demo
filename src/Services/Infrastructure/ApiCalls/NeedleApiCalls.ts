import IApiCalls from './IApiCalls';
import needle from 'needle';
import { ConfigService } from '@nestjs/config';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
class NeedleApiCalls implements IApiCalls {
  public AppApiBaseUrl = this._configService.get('APP_API_BASE_URL');

  public AuthorizationHeaders = {
    'PokerVanc-ProviderId': this._configService.get('APP_PROVIDER_ID'),
    //'Authorization': `Bearer ${tokenBearer}`,
  };

  constructor(private _configService: ConfigService) {}

  async get(url: string, headers?: any): Promise<any> {
    return needle(
      'get',
      this.makeApiUrl(url),
      {},
      {
        headers: { ...this.AuthorizationHeaders, ...headers },
      },
    );
  }

  async post(url: string, data: object, headers?: any): Promise<any> {
    return needle('post', this.makeApiUrl(url), data, {
      json: true,
      headers: { ...this.AuthorizationHeaders, ...headers },
    });
  }

  async put(url: string, data: object, headers?: any): Promise<any> {
    return needle('put', this.makeApiUrl(url), data, {
      json: true,
      headers: { ...this.AuthorizationHeaders, ...headers },
    });
  }

  async delete(url: string, headers?: any): Promise<any> {
    return needle(
      'delete',
      this.makeApiUrl(url),
      {},
      {
        headers: { ...this.AuthorizationHeaders, ...headers },
      },
    );
  }

  async patch(url: string, data: object, headers?: any): Promise<any> {
    return needle('patch', this.makeApiUrl(url), data, {
      json: true,
      headers: { ...this.AuthorizationHeaders, ...headers },
    });
  }

  private makeApiUrl(url: string): string {
    return `${this.AppApiBaseUrl}${url}`;
  }
}

export default NeedleApiCalls;
