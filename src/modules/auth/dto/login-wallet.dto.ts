import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginWithWalletDto {
  @ApiProperty({
    required: true,
    example: '0x58EAe4189f42a8F8C66237bF47695d83a012CEE0',
  })
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({
    required: true,
    example:
      '0x34b2ace783a117c6ee2c35264dffc03f955ce244699ef69343a12481be36e4194df22da36499afb45a094b4c720b628d0e0b71b8917d473c0f060aef948c36801b',
  })
  @IsNotEmpty()
  readonly signature: string;

  @ApiProperty({
    required: true,
    example:
      'Sign this message to login with address 0x58EAe4189f42a8F8C66237bF47695d83a012CEE0',
  })
  @IsNotEmpty()
  readonly message: string;
}
