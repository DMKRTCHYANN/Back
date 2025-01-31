import { PaginationService } from './pagination.service';
export declare class PaginationController {
    private readonly paginationService;
    constructor(paginationService: PaginationService);
    getUsers(page?: number, perPage?: number): Promise<{
        data: import("../typeorm/entities/user.entity").UserEntitiy[];
        pagination: {
            total: number;
            page: number;
            perPage: number;
            totalPages: number;
        };
    }>;
}
