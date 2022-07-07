export class TokenCreationResponseDto {
  message: string;
  token: string;
  errors?: { [key: string]: any };
}
