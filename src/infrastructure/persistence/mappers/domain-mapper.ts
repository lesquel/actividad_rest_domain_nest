import type { Dish } from '../../../domain/entities/dish.entity.js';
import type { Image } from '../../../domain/entities/image.entity.js';
import type { LayoutObject } from '../../../domain/entities/layout-object.entity.js';
import type { Menu } from '../../../domain/entities/menu.entity.js';
import type { Payment } from '../../../domain/entities/payment.entity.js';
import type { Reservation } from '../../../domain/entities/reservation.entity.js';
import type { Restaurant } from '../../../domain/entities/restaurant.entity.js';
import type { Review } from '../../../domain/entities/review.entity.js';
import type { Section } from '../../../domain/entities/section.entity.js';
import type { Subscription } from '../../../domain/entities/subscription.entity.js';
import type { SubscriptionPlan } from '../../../domain/entities/subscription-plan.entity.js';
import type { DiningTable } from '../../../domain/entities/table.entity.js';
import type { User } from '../../../domain/entities/user.entity.js';
import { DishOrmEntity } from '../entities/dish.orm-entity.js';
import { ImageOrmEntity } from '../entities/image.orm-entity.js';
import { LayoutObjectOrmEntity } from '../entities/layout-object.orm-entity.js';
import { MenuOrmEntity } from '../entities/menu.orm-entity.js';
import { PaymentOrmEntity } from '../entities/payment.orm-entity.js';
import { ReservationOrmEntity } from '../entities/reservation.orm-entity.js';
import { RestaurantOrmEntity } from '../entities/restaurant.orm-entity.js';
import { ReviewOrmEntity } from '../entities/review.orm-entity.js';
import { SectionLayoutObjectOrmEntity } from '../entities/section-layout-object.orm-entity.js';
import { SectionOrmEntity } from '../entities/section.orm-entity.js';
import { SubscriptionOrmEntity } from '../entities/subscription.orm-entity.js';
import { SubscriptionPlanOrmEntity } from '../entities/subscription-plan.orm-entity.js';
import { TableOrmEntity } from '../entities/table.orm-entity.js';
import { UserOrmEntity } from '../entities/user.orm-entity.js';

type RelationDepth = 'none' | 'basic';

interface MapperOptions {
  depth?: RelationDepth;
}

const DEFAULT_OPTIONS: Required<MapperOptions> = {
  depth: 'none',
};

export class UserMapper {
  static toDomain(entity: UserOrmEntity, options: MapperOptions = {}): User {
    const config = { ...DEFAULT_OPTIONS, ...options };
    const domain: User = {
      id: entity.id,
      email: entity.email,
      names: entity.nombres,
      phone: entity.telefono,
    };

    if (config.depth === 'basic') {
      domain.reservations = entity.reservas?.map((reserva) =>
        ReservationMapper.toDomain(reserva, {
          depth: 'none',
        }),
      );
      domain.payments = entity.pagos?.map((pago) =>
        PaymentMapper.toDomain(pago),
      );
      domain.subscriptions = entity.suscripciones?.map((suscripcion) =>
        SubscriptionMapper.toDomain(suscripcion, { depth: 'none' }),
      );
      domain.reviews = entity.resenas?.map((resena) =>
        ReviewMapper.toDomain(resena),
      );
    }

    return domain;
  }

  static toOrm(domain: User): UserOrmEntity {
    const entity = new UserOrmEntity();
    entity.id = domain.id;
    entity.email = domain.email;
    entity.nombres = domain.names;
    entity.telefono = domain.phone;
    return entity;
  }
}
export class RestaurantMapper {
  static toDomain(
    entity: RestaurantOrmEntity,
    options: MapperOptions = {},
  ): Restaurant {
    const config = { ...DEFAULT_OPTIONS, ...options };
    const domain: Restaurant = {
      id: entity.id,
      name: entity.nombre,
      description: entity.descripcion ?? undefined,
      address: entity.direccion,
      openingHours: entity.horarioAtencion ?? undefined,
      capacity: entity.capacidadTotal,
      // Solo intentar mapear la imagen si está cargada (no undefined)
      image:
        entity.imagen !== undefined && entity.imagen
          ? ImageMapper.toDomain(entity.imagen)
          : null,
    };

    if (config.depth === 'basic') {
      domain.sections = entity.secciones?.map((section) =>
        SectionMapper.toDomain(section, { depth: 'none', restaurant: domain }),
      );
      domain.reservations = entity.reservas?.map((reserva) =>
        ReservationMapper.toDomain(reserva, { depth: 'none' }),
      );
      domain.reviews = entity.resenas?.map((resena) =>
        ReviewMapper.toDomain(resena),
      );
      domain.subscriptions = entity.suscripciones?.map((suscripcion) =>
        SubscriptionMapper.toDomain(suscripcion, { depth: 'none' }),
      );
      domain.menus = entity.menus?.map((menu) =>
        MenuMapper.toDomain(menu, { depth: 'none', restaurant: domain }),
      );
    }

    return domain;
  }

  static toOrm(domain: Restaurant): RestaurantOrmEntity {
    const entity = new RestaurantOrmEntity();
    entity.id = domain.id;
    entity.nombre = domain.name;
    entity.descripcion = domain.description ?? null;
    entity.direccion = domain.address;
    entity.horarioAtencion = domain.openingHours ?? null;
    entity.capacidadTotal = domain.capacity;
    if (domain.image) {
      entity.imagen = ImageMapper.toOrm(domain.image);
    }
    return entity;
  }
}

interface SectionMapperOptions extends MapperOptions {
  restaurant?: Restaurant;
}

export class SectionMapper {
  static toDomain(
    entity: SectionOrmEntity,
    options: SectionMapperOptions = {},
  ): Section {
    const config = { ...DEFAULT_OPTIONS, ...options };
    const restaurantDomain =
      options.restaurant ??
      (entity.restaurante
        ? RestaurantMapper.toDomain(entity.restaurante, { depth: 'none' })
        : undefined);

    if (!restaurantDomain) {
      throw new Error(
        'SectionOrmEntity requires a restaurant relation to map to domain.',
      );
    }

    const domain: Section = {
      id: entity.id,
      restaurant: restaurantDomain,
      name: entity.nombre,
      description: entity.descripcion ?? undefined,
    };
    if (config.depth === 'basic') {
      domain.tables = entity.mesas?.map((mesa) =>
        TableMapper.toDomain(mesa, { depth: 'none', section: domain }),
      );
      domain.layoutObjects = entity.seccionObjetos
        ?.map((sectionObject) =>
          sectionObject.objeto
            ? LayoutObjectMapper.toDomain(sectionObject.objeto, {
                depth: 'none',
              })
            : undefined,
        )
        .filter((obj): obj is LayoutObject => obj !== undefined);
    }

    return domain;
  }

  static toOrm(domain: Section): SectionOrmEntity {
    const entity = new SectionOrmEntity();
    entity.id = domain.id;
    entity.nombre = domain.name;
    entity.descripcion = domain.description ?? null;
    entity.restaurante = RestaurantMapper.toOrm(domain.restaurant);
    return entity;
  }
}

interface TableMapperOptions extends MapperOptions {
  section?: Section;
  restaurant?: Restaurant;
}

export class TableMapper {
  static toDomain(
    entity: TableOrmEntity,
    options: TableMapperOptions = {},
  ): DiningTable {
    const config = { ...DEFAULT_OPTIONS, ...options };
    const sectionDomain =
      options.section ??
      (entity.seccion
        ? SectionMapper.toDomain(entity.seccion, {
            depth: 'none',
            restaurant:
              options.restaurant ??
              (entity.seccion.restaurante
                ? RestaurantMapper.toDomain(entity.seccion.restaurante, {
                    depth: 'none',
                  })
                : undefined),
          })
        : undefined);

    if (!sectionDomain) {
      throw new Error(
        'TableOrmEntity requires a section relation to map to domain.',
      );
    }

    const domain: DiningTable = {
      id: entity.id,
      section: sectionDomain,
      tableNumber: entity.numeroMesa,
      capacity: entity.capacidad,
      positionX: entity.posX,
      positionY: entity.posY,
      width: entity.ancho,
      height: entity.alto,
      image:
        entity.imagen !== undefined && entity.imagen
          ? ImageMapper.toDomain(entity.imagen)
          : null,
    };

    if (config.depth === 'basic') {
      domain.reservations = entity.reservaciones?.map((reserva) =>
        ReservationMapper.toDomain(reserva, {
          depth: 'none',
          restaurant: sectionDomain.restaurant,
          table: domain,
        }),
      );
    }

    return domain;
  }

  static toOrm(domain: DiningTable): TableOrmEntity {
    const entity = new TableOrmEntity();
    entity.id = domain.id;
    entity.numeroMesa = domain.tableNumber;
    entity.capacidad = domain.capacity;
    entity.posX = domain.positionX;
    entity.posY = domain.positionY;
    entity.ancho = domain.width;
    entity.alto = domain.height;
    entity.seccion = SectionMapper.toOrm(domain.section);
    if (domain.image) {
      entity.imagen = ImageMapper.toOrm(domain.image);
    }
    return entity;
  }
}

export class ImageMapper {
  static toDomain(entity: ImageOrmEntity): Image {
    return {
      id: entity.id,
      url: entity.url,
      title: entity.titulo ?? undefined,
      description: entity.descripcion ?? undefined,
      createdAt: entity.fechaCreacion,
      isActive: entity.esActiva,
    };
  }

  static toOrm(domain: Image): ImageOrmEntity {
    const entity = new ImageOrmEntity();
    entity.id = domain.id;
    entity.url = domain.url;
    entity.titulo = domain.title ?? null;
    entity.descripcion = domain.description ?? null;
    entity.esActiva = domain.isActive;
    entity.fechaCreacion = domain.createdAt;
    return entity;
  }
}

interface LayoutObjectMapperOptions extends MapperOptions {
  restaurant?: Restaurant;
}

export class LayoutObjectMapper {
  static toDomain(
    entity: LayoutObjectOrmEntity,
    options: LayoutObjectMapperOptions = {},
  ): LayoutObject {
    const config = { ...DEFAULT_OPTIONS, ...options };
    const domain: LayoutObject = {
      id: entity.id,
      name: entity.nombre ?? undefined,
      type: entity.tipo ?? undefined,
      positionX: entity.posX,
      positionY: entity.posY,
      width: entity.ancho,
      height: entity.alto,
      image: entity.imagen ? ImageMapper.toDomain(entity.imagen) : null,
    };

    if (config.depth === 'basic') {
      domain.sections = entity.seccionObjetos
        ?.map((sectionObject: SectionLayoutObjectOrmEntity) => {
          if (!sectionObject.seccion) {
            return undefined;
          }

          const restaurantDomain =
            options.restaurant ??
            (sectionObject.seccion.restaurante
              ? RestaurantMapper.toDomain(sectionObject.seccion.restaurante, {
                  depth: 'none',
                })
              : undefined);

          if (!restaurantDomain) {
            throw new Error(
              'SectionLayoutObjectOrmEntity requires a restaurant relation to map to domain.',
            );
          }

          return SectionMapper.toDomain(sectionObject.seccion, {
            depth: 'none',
            restaurant: restaurantDomain,
          });
        })
        .filter((section): section is Section => section !== undefined);
    }

    return domain;
  }

  static toOrm(domain: LayoutObject): LayoutObjectOrmEntity {
    const entity = new LayoutObjectOrmEntity();
    entity.id = domain.id;
    entity.nombre = domain.name ?? null;
    entity.tipo = domain.type ?? null;
    entity.posX = domain.positionX;
    entity.posY = domain.positionY;
    entity.ancho = domain.width;
    entity.alto = domain.height;
    if (domain.image) {
      entity.imagen = ImageMapper.toOrm(domain.image);
    }
    return entity;
  }
}

interface ReservationMapperOptions extends MapperOptions {
  restaurant?: Restaurant;
  table?: DiningTable;
}

export class ReservationMapper {
  static toDomain(
    entity: ReservationOrmEntity,
    options: ReservationMapperOptions = {},
  ): Reservation {
    const config = { ...DEFAULT_OPTIONS, ...options };
    const restaurantDomain =
      options.restaurant ??
      (entity.restaurante
        ? RestaurantMapper.toDomain(entity.restaurante, { depth: 'none' })
        : entity.mesa?.seccion?.restaurante
          ? RestaurantMapper.toDomain(entity.mesa.seccion.restaurante, {
              depth: 'none',
            })
          : undefined);

    if (!restaurantDomain) {
      throw new Error(
        'ReservationOrmEntity requires a restaurant relation to map to domain.',
      );
    }

    const tableDomain =
      options.table ??
      (entity.mesa
        ? TableMapper.toDomain(entity.mesa, {
            depth: 'none',
            restaurant: restaurantDomain,
          })
        : undefined);

    if (!tableDomain) {
      throw new Error(
        'ReservationOrmEntity requires a table relation to map to domain.',
      );
    }
    const domain: Reservation = {
      id: entity.id,
      user: UserMapper.toDomain(entity.usuario),
      restaurant: restaurantDomain,
      table: tableDomain,
      reservationDate: new Date(entity.fechaReserva),
      reservationTime: entity.hora,
      guestCount: entity.cantidadPersonas,
      status: entity.estado as Reservation['status'],
      notes: entity.notas ?? undefined,
    };

    if (config.depth === 'basic') {
      domain.payments = entity.pagos?.map((pago) =>
        PaymentMapper.toDomain(pago),
      );
    }

    return domain;
  }

  static toOrm(domain: Reservation): ReservationOrmEntity {
    const entity = new ReservationOrmEntity();
    entity.id = domain.id;
    entity.usuario = UserMapper.toOrm(domain.user);
    entity.restaurante = RestaurantMapper.toOrm(domain.restaurant);
    entity.mesa = TableMapper.toOrm(domain.table);
    entity.fechaReserva = domain.reservationDate.toISOString().slice(0, 10);
    entity.hora = domain.reservationTime;
    entity.cantidadPersonas = domain.guestCount;
    entity.estado = domain.status;
    entity.notas = domain.notes ?? null;
    return entity;
  }
}

export class PaymentMapper {
  static toDomain(entity: PaymentOrmEntity): Payment {
    // Proteger contra relaciones no cargadas
    const reservation = entity.reserva
      ? ReservationMapper.toDomain(entity.reserva, { depth: 'none' })
      : ({
          id: '',
          user: { id: '', email: '', names: '', phone: '' } as User,
          restaurant: {
            id: '',
            name: '',
            address: '',
            capacity: 0,
            image: null,
          } as Restaurant,
          table: {
            id: '',
            section: {
              id: '',
              restaurant: {
                id: '',
                name: '',
                address: '',
                capacity: 0,
                image: null,
              } as Restaurant,
              name: '',
            } as Section,
            tableNumber: 0,
            capacity: 0,
            positionX: 0,
            positionY: 0,
            width: 0,
            height: 0,
            image: null,
          } as DiningTable,
          reservationDate: new Date(),
          reservationTime: '',
          guestCount: 0,
          status: 'PENDING' as const,
        } as Reservation);

    const user = entity.usuario
      ? UserMapper.toDomain(entity.usuario, { depth: 'none' })
      : ({
          id: '',
          email: '',
          names: '',
          phone: '',
        } as User);

    return {
      id: entity.id,
      reservation,
      user,
      amount: Number(entity.monto),
      currency: entity.moneda,
      method: entity.metodo as Payment['method'],
      status: entity.estado as Payment['status'],
      paidAt: entity.fechaPago,
      reference: entity.referencia ?? undefined,
    };
  }

  static toOrm(domain: Payment): PaymentOrmEntity {
    const entity = new PaymentOrmEntity();
    entity.id = domain.id;
    entity.reserva = ReservationMapper.toOrm(domain.reservation);
    entity.usuario = UserMapper.toOrm(domain.user);
    entity.monto = domain.amount;
    entity.moneda = domain.currency;
    entity.metodo = domain.method;
    entity.estado = domain.status;
    entity.fechaPago = domain.paidAt;
    entity.referencia = domain.reference ?? null;
    return entity;
  }
}

export class ReviewMapper {
  static toDomain(entity: ReviewOrmEntity): Review {
    // Proteger contra relaciones no cargadas
    const user = entity.usuario
      ? UserMapper.toDomain(entity.usuario, { depth: 'none' })
      : ({
          id: '',
          email: '',
          names: '',
          phone: '',
        } as User);

    const restaurant = entity.restaurante
      ? RestaurantMapper.toDomain(entity.restaurante, { depth: 'none' })
      : ({
          id: '',
          name: '',
          address: '',
          capacity: 0,
          image: null,
        } as Restaurant);

    return {
      id: entity.id,
      user,
      restaurant,
      rating: entity.rating,
      comment: entity.comentario ?? undefined,
      createdAt: entity.fechaCreacion,
    };
  }

  static toOrm(domain: Review): ReviewOrmEntity {
    const entity = new ReviewOrmEntity();
    entity.id = domain.id;
    entity.usuario = UserMapper.toOrm(domain.user);
    entity.restaurante = RestaurantMapper.toOrm(domain.restaurant);
    entity.rating = domain.rating;
    entity.comentario = domain.comment ?? null;
    return entity;
  }
}

export class SubscriptionPlanMapper {
  static toDomain(
    entity: SubscriptionPlanOrmEntity,
    options: MapperOptions = {},
  ): SubscriptionPlan {
    const config = { ...DEFAULT_OPTIONS, ...options };
    const domain: SubscriptionPlan = {
      id: entity.id,
      name: entity.nombre,
      tier: entity.tipo as SubscriptionPlan['tier'],
      price: Number(entity.precio),
      billingCycle: entity.periodo as SubscriptionPlan['billingCycle'],
      status: entity.estado as SubscriptionPlan['status'],
    };

    if (config.depth === 'basic') {
      domain.subscriptions = entity.suscripciones?.map((suscripcion) =>
        SubscriptionMapper.toDomain(suscripcion, { depth: 'none' }),
      );
    }

    return domain;
  }

  static toOrm(domain: SubscriptionPlan): SubscriptionPlanOrmEntity {
    const entity = new SubscriptionPlanOrmEntity();
    entity.id = domain.id;
    entity.nombre = domain.name;
    entity.tipo = domain.tier;
    entity.precio = domain.price;
    entity.periodo = domain.billingCycle;
    entity.estado = domain.status;
    return entity;
  }
}

export class SubscriptionMapper {
  static toDomain(
    entity: SubscriptionOrmEntity,
    options: MapperOptions = {},
  ): Subscription {
    const config = { ...DEFAULT_OPTIONS, ...options };

    // Proteger contra relaciones no cargadas
    const user = entity.usuario
      ? UserMapper.toDomain(entity.usuario, { depth: 'none' })
      : ({
          id: '',
          email: '',
          names: '',
          phone: '',
        } as User);

    const restaurant = entity.restaurante
      ? RestaurantMapper.toDomain(entity.restaurante, { depth: 'none' })
      : ({
          id: '',
          name: '',
          address: '',
          capacity: 0,
          image: null,
        } as Restaurant);

    const plan = entity.plan
      ? SubscriptionPlanMapper.toDomain(entity.plan)
      : ({
          id: '',
          name: '',
          tier: 'BASIC' as const,
          price: 0,
          billingCycle: 'MONTHLY' as const,
          status: 'ACTIVE' as const,
        } as SubscriptionPlan);

    const domain: Subscription = {
      id: entity.id,
      user,
      restaurant,
      plan,
      startsOn: new Date(entity.fechaInicio),
      endsOn: entity.fechaFin ? new Date(entity.fechaFin) : null,
      status: entity.estado as Subscription['status'],
    };

    if (config.depth === 'basic') {
      // no nested relations beyond plan/user/restaurant for now
    }

    return domain;
  }

  static toOrm(domain: Subscription): SubscriptionOrmEntity {
    const entity = new SubscriptionOrmEntity();
    entity.id = domain.id;
    entity.usuario = UserMapper.toOrm(domain.user);
    entity.restaurante = RestaurantMapper.toOrm(domain.restaurant);
    entity.plan = SubscriptionPlanMapper.toOrm(domain.plan);
    entity.fechaInicio = domain.startsOn.toISOString().slice(0, 10);
    entity.fechaFin = domain.endsOn
      ? domain.endsOn.toISOString().slice(0, 10)
      : null;
    entity.estado = domain.status;
    return entity;
  }
}

interface MenuMapperOptions extends MapperOptions {
  restaurant?: Restaurant;
}

export class MenuMapper {
  static toDomain(
    entity: MenuOrmEntity,
    options: MenuMapperOptions = {},
  ): Menu {
    const config = { ...DEFAULT_OPTIONS, ...options };
    const restaurantDomain =
      options.restaurant ??
      (entity.restaurante
        ? RestaurantMapper.toDomain(entity.restaurante, { depth: 'none' })
        : undefined);

    if (!restaurantDomain) {
      throw new Error(
        'MenuOrmEntity requires a restaurant relation to map to domain.',
      );
    }

    const domain: Menu = {
      id: entity.id,
      restaurant: restaurantDomain,
      name: entity.nombre,
      description: entity.descripcion ?? undefined,
      price: entity.precio ? Number(entity.precio) : undefined,
      coverImageUrl: entity.fotoUrl ?? undefined,
    };

    if (config.depth === 'basic') {
      domain.dishes = entity.platillos?.map((platillo) =>
        DishMapper.toDomain(platillo, {
          depth: 'none',
          menu: domain,
          restaurant: restaurantDomain,
        }),
      );
    }

    return domain;
  }

  static toOrm(domain: Menu): MenuOrmEntity {
    const entity = new MenuOrmEntity();
    entity.id = domain.id;
    entity.restaurante = RestaurantMapper.toOrm(domain.restaurant);
    entity.nombre = domain.name;
    entity.descripcion = domain.description ?? null;
    entity.precio = domain.price ?? null;
    entity.fotoUrl = domain.coverImageUrl ?? null;
    return entity;
  }
}

interface DishMapperOptions extends MapperOptions {
  restaurant?: Restaurant;
  menu?: Menu;
}

export class DishMapper {
  static toDomain(
    entity: DishOrmEntity,
    options: DishMapperOptions = {},
  ): Dish {
    const restaurantDomain =
      options.restaurant ??
      (entity.restaurante
        ? RestaurantMapper.toDomain(entity.restaurante, { depth: 'none' })
        : undefined);

    if (!restaurantDomain) {
      throw new Error(
        'DishOrmEntity requires a restaurant relation to map to domain.',
      );
    }

    const menuDomain =
      options.menu ??
      (entity.menu
        ? MenuMapper.toDomain(entity.menu, {
            depth: 'none',
            restaurant: restaurantDomain,
          })
        : undefined);

    if (!menuDomain) {
      throw new Error(
        'DishOrmEntity requires a menu relation to map to domain.',
      );
    }

    const domain: Dish = {
      id: entity.id,
      restaurant: restaurantDomain,
      menu: menuDomain,
      name: entity.nombre,
      description: entity.descripcion ?? undefined,
      price: Number(entity.precio),
      image:
        entity.imagen !== undefined && entity.imagen
          ? ImageMapper.toDomain(entity.imagen)
          : null,
    };

    return domain;
  }

  static toOrm(domain: Dish): DishOrmEntity {
    const entity = new DishOrmEntity();
    entity.id = domain.id;
    entity.restaurante = RestaurantMapper.toOrm(domain.restaurant);
    entity.menu = MenuMapper.toOrm(domain.menu);
    entity.nombre = domain.name;
    entity.descripcion = domain.description ?? null;
    entity.precio = domain.price;
    entity.imagen = domain.image ? ImageMapper.toOrm(domain.image) : null;
    return entity;
  }
}
