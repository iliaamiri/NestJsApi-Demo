import JWTTokenRawDataDTO from '../JWTTokenRawDataDTO';

export default class TokenDic {
  public static AllTokens: Map<string, JWTTokenRawDataDTO> = new Map<
    string,
    JWTTokenRawDataDTO
  >();
}
