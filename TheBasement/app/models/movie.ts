import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Movie extends BaseModel {
  @column({ isPrimary: true, columnName: 'movie_id' })
  declare movieId: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare budget: number

  @column()
  declare revenue: number

  @column()
  declare runtime: number

  @column()
  declare releaseDate: DateTime

  @column({ columnName: 'poster_path' })
  declare posterPath: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
