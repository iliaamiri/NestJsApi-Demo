export default interface ITokenRepository {
  AddToken(tokenValue: string, tokenObject: any): Promise<boolean>;

  GetToken(tokenValue: string): Promise<undefined | any>;

  RemoveToken(tokenValue: string): Promise<boolean>;

  GetAllTokensValues(): Promise<any[]>;

  GetAllTokensAsMap(): Promise<Map<string, any>>;
}
