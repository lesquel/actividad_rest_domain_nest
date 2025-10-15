import type { Repository } from 'typeorm';

import type {
  BaseRepository,
  PaginationOptions,
} from '../../../domain/repositories/base-repository.js';

type ToDomain<E, D> = (entity: E) => D;
type ToOrm<E, D> = (domain: D) => E;

export class TypeOrmBaseRepository<D, E extends { id: string }>
  implements BaseRepository<D, string>
{
  // Subclasses can override to include needed relations (supports 'a.b.c' paths)
  // Esta propiedad es para todas las relaciones de una entidad x
  protected relations: string[] = [];
  // Constructor de la clase base de tipo orm
  constructor(
    // Instancia de la clase del repositorio de tipo orm (como interactua con la base de datos)
    protected readonly repo: Repository<E>,

    // Función para convertir una entidad de tipo orm a una entidad de dominio
    protected readonly toDomain: ToDomain<E, D>,
    // Función para convertir una entidad de dominio a una entidad de tipo orm

    protected readonly toOrm: ToOrm<E, D>,
  ) {}

  // Método para buscar una entidad por su ID
  async findById(id: string): Promise<D | null> {
    // Busca la entidad en la base de datos
    const entity = await this.repo.findOne({
      where: { id } as any,
      relations: this.relations as any,
    });
    // Si se encuentra, la convierte a dominio y la retorna; si no, retorna null
    return entity ? this.toDomain(entity) : null;
  }
  // Método para buscar todas las entidades con opciones de paginación
  async findAll(options: PaginationOptions = {}): Promise<D[]> {
    // Opciones de paginación
    const { offset = 0, limit = 50 } = options;
    // Busca todas las entidades en la base de datos
    const entities = await this.repo.find({
      skip: offset,
      take: limit,
      relations: this.relations as any,
    });
    // Convierte cada entidad a dominio y retorna la lista

    return entities.map(this.toDomain);
  }

  // Método para crear una nueva entidad
  async create(domain: D): Promise<D> {
    // Convierte la entidad a orm y la guarda en la base de datos
    const entity = this.toOrm(domain);
    // Convierte la entidad a dominio y la retorna
    const saved = await this.repo.save(entity as any);
    // Convierte la entidad a dominio y la retorna
    return this.toDomain(saved);
  }

  // Método para actualizar una entidad existente
  async update(domain: D): Promise<D> {
    // Convierte la entidad a orm y la actualiza en la base de datos
    const entity = this.toOrm(domain);
    // Convierte la entidad a dominio y la retorna
    const saved = await this.repo.save(entity as any);
    // Convierte la entidad a dominio y la retorna
    return this.toDomain(saved);
  }
  // Método para eliminar una entidad por su ID
  async delete(id: string): Promise<void> {
    // Elimina la entidad de la base de datos
    await this.repo.delete({ id } as any);
  }

  // Método para contar el número total de entidades
  async count(): Promise<number> {
    // Contar el número total de entidades en la base de datos
    return this.repo.count();
  }

  // Método para verificar si una entidad existe por su ID
  async exists(id: string): Promise<boolean> {
    // Verifica si la entidad existe en la base de datos
    const c = await this.repo.count({ where: { id } as any });
    // Retorna true si la entidad existe, false en caso contrario
    return c > 0;
  }
}
