export type Config = {
  readonly [key: string]: number
}

export type Breakpoint<C extends Config> = {
  breakpoint: keyof C
  maxWidth?: number | null
  minWidth: C[keyof C]
}

export type MediaQuery<C extends Config> = {
  breakpoint: keyof C
  maxWidth: number | null
  minWidth: C[keyof C]
  query: string
}
