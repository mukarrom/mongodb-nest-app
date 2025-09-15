export class CreateUserDto {
    name: string;
    address: {
        street: string;
        city: string;
    };
}
