export class UserCredentialsDto {
  constructor(
    public readonly userId: number,
    public readonly password: string,
  ) {}
}
