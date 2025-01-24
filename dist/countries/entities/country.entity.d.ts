import { UserEntitiy } from '../../typeorm/entities/user.entity';
export declare class Country {
    id: number;
    name: string;
    users: UserEntitiy[];
}
