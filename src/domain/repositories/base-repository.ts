export interface PaginationOptions {
  offset?: number;
  limit?: number;
}

export interface BaseRepository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(options?: PaginationOptions): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
  count(): Promise<number>;
  exists(id: ID): Promise<boolean>;
}
