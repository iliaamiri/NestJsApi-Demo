import ITokenRepository from './ITokenRepository';
import JWTTokenRawDataDTO from '../../../Models/JWTTokenRawDataDTO';
import { Injectable, Scope } from '@nestjs/common';
import TokenDic from '../../../Models/StaticModels/TokenDic';

@Injectable({ scope: Scope.DEFAULT })
export default class TokenRepository implements ITokenRepository {
  public async AddToken(
    tokenValue: string,
    tokenObject: JWTTokenRawDataDTO,
  ): Promise<boolean> {
    TokenDic.AllTokens.set(tokenValue, tokenObject);
    return true;
  }

  public async GetAllTokensValues(): Promise<JWTTokenRawDataDTO[]> {
    return Array.from(TokenDic.AllTokens.values());
  }

  public async GetAllTokensAsMap(): Promise<Map<string, JWTTokenRawDataDTO>> {
    return TokenDic.AllTokens;
  }

  public async GetToken(
    tokenValue: string,
  ): Promise<false | JWTTokenRawDataDTO> {
    return TokenDic.AllTokens.get(tokenValue) || false;
  }

  public async RemoveToken(tokenValue: string): Promise<boolean> {
    TokenDic.AllTokens.delete(tokenValue);
    return true;
  }
}
