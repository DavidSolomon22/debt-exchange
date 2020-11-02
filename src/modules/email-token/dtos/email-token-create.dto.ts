export class EmailTokenCreateDto {
  hash: string;
  email: string;
  validTo: Date;
}