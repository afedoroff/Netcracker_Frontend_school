/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    port: number
    jwtKey: string
    mongo: string
    baseUrl: string
  }
  export const config: Config
  export type Config = IConfig
}
