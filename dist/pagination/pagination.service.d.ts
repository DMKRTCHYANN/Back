import { Repository } from 'typeorm';
import { UserEntitiy } from 'src/typeorm/entities/user.entity';
export declare class PaginationService {
    private userRepository;
    constructor(userRepository: Repository<UserEntitiy>);
    getPaginatedUsers(page?: number | string, perPage?: number | string): Promise<{
        data: UserEntitiy[];
        pagination: {
            total: number;
            page: number;
            perPage: number;
            totalPages: number;
        };
    }>;
}
