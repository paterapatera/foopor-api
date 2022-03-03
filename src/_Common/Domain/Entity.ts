import { ValueObject } from './ValueObject'

export abstract class Entity {
  abstract id: ValueObject
  same(that?: Entity): boolean {
    return this.id.same(that?.id) || false
  }
}
