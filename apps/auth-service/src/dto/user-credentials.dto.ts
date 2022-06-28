export class UserCredentialsDto {
  constructor(
    public readonly userId: string,
    public readonly password: string,
  ) {}
}
