export type SpecReport = { spec: string; result: boolean }

export abstract class CompositeSpec<T> {
  public reports: SpecReport[] = []
  abstract isSatisfiedBy(candidate: T): Promise<boolean>
  and(other: CompositeSpec<T>): CompositeSpec<T> {
    return new AndSpec<T>(this, other)
  }
  andNot(other: CompositeSpec<T>): CompositeSpec<T> {
    return new AndNotSpec<T>(this, other)
  }
  or(other: CompositeSpec<T>): CompositeSpec<T> {
    return new OrSpec<T>(this, other)
  }
  orNot(other: CompositeSpec<T>): CompositeSpec<T> {
    return new OrNotSpec<T>(this, other)
  }
  not(): CompositeSpec<T> {
    return new NotSpec<T>(this)
  }
  addReport(spec: CompositeSpec<T>, result: boolean): void {
    this.reports.push({ spec: spec.constructor.name, result })
  }
  getJsonReports(): string {
    return JSON.stringify(this.reports, null, 2)
  }
}

export class AndSpec<T> extends CompositeSpec<T> {
  constructor(private left: CompositeSpec<T>, private right: CompositeSpec<T>) {
    super()
  }
  async isSatisfiedBy(candidate: T): Promise<boolean> {
    const result = (await this.left.isSatisfiedBy(candidate)) && (await this.right.isSatisfiedBy(candidate))
    this.reports = [...this.reports, ...this.left.reports, ...this.right.reports]
    return result
  }
}

export class AndNotSpec<T> extends AndSpec<T> {
  async isSatisfiedBy(candidate: T): Promise<boolean> {
    return (await super.isSatisfiedBy(candidate)) !== true
  }
}

export class OrSpec<T> extends CompositeSpec<T> {
  constructor(private left: CompositeSpec<T>, private right: CompositeSpec<T>) {
    super()
  }
  async isSatisfiedBy(candidate: T): Promise<boolean> {
    const result = (await this.left.isSatisfiedBy(candidate)) || (await this.right.isSatisfiedBy(candidate))
    this.reports = [...this.reports, ...this.left.reports, ...this.right.reports]
    return result
  }
}

export class OrNotSpec<T> extends OrSpec<T> {
  async isSatisfiedBy(candidate: T): Promise<boolean> {
    return (await super.isSatisfiedBy(candidate)) !== true
  }
}

export class NotSpec<T> extends CompositeSpec<T> {
  constructor(private other: CompositeSpec<T>) {
    super()
  }
  async isSatisfiedBy(candidate: T): Promise<boolean> {
    const result = !(await this.other.isSatisfiedBy(candidate))
    this.reports = [...this.reports, ...this.other.reports]
    return result
  }
}

export abstract class Spec<T> extends CompositeSpec<T> {
  async isSatisfiedBy(candidate: T): Promise<boolean> {
    const result = await this.validate(candidate)
    this.addReport(this, result)
    return result
  }

  abstract validate(candidate: T): Promise<boolean>
}
