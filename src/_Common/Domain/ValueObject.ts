export abstract class ValueObject {
  same(that?: ValueObject): boolean {
    return this.constructor === that?.constructor && JSON.stringify(this) == JSON.stringify(that)
  }
}
