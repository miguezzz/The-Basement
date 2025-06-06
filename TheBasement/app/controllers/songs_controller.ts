import type { HttpContext } from '@adonisjs/core/http'
import Song from '#models/song'
import db from '@adonisjs/lucid/services/db'

export default class SongsController {
  // lista todas as músicas
  async index({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 16

    const payload = request.only(['name'])

    // esse cara sabe buscar em Songs!
    const query = Song.query()

    // se o campo name estiver preenchido, filtra pelo nome
    if (payload.name && payload.name.length > 0) {
      query.where('name', 'like', `%${payload.name}%`)
    }

    // busca as músicas com paginação
    const songs = await query.paginate(page, limit)
    const songsJson = songs.toJSON()

    // return songsJson
    return view.render('pages/songs/index', { songs, songsJson })
  }

  // cria música no banco de dados a partir da API do Spotify
  async store({ request, response }: HttpContext) {
    // pega os dados do formulário
    const payload = request.only(['songId'])

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
    }

    const res = await fetch(`https://api.spotify.com/v1/tracks/${payload.songId}`, options)

    const songData: any = await res.json()

    // cria um novo song usando os dados do formulário e salva no banco de dados
    const song = new Song()
    song.songId = songData.id
    song.name = songData.name
    song.duration = Number.parseFloat((songData.duration_ms / 60000).toFixed(2)) // Convertendo de milissegundos para segundos

    await song.save()

    // retorna o produto criado. mudar depois para adicionar um álbum e não música.
    return response.redirect().toRoute('songs.showid', { id: song.songId })
  }

  // cria uma música (redireciona para a tela de criação)
  async addTrack({ view }: HttpContext) {
    return view.render('pages/songs/addTrack')
  }

  async searchTrack({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 16

    const name = request.input('name', 'null')
    const id = request.input('id', 'null')

    let songs: Song[] = []

    const query = Song.query()

    if (name && name !== 'null') {
      songs = await query.where('name', 'like', `%${name}%`)
    }

    if (id && id !== 'null') {
      songs = await query.where('song_id', 'like', `%${id}%`)
    }

    songs = await query.paginate(page, limit)

    const coverPath = await db
      .from('albums')
      .join('songs', 'albums.album_id', 'songs.album_id')
      .select('albums.cover_path')
      .where('songs.song_id', songs[0].songId)
      .first()

    return view.render('pages/songs/searchTrack', { songs, coverPath })
  }

  // async showTrackByName({ view, params }: HttpContext) {
  //     // busca um Song pelo id ou retorna um erro 404 caso não encontre
  //     const song = await Song.findBy('name', params.name)

  //     // renderiza a view Songs.show com o Song encontrado
  //     return view.render('pages/songs/show', { song })
  // }

  // mostra uma música pelo id
  async showTrackById({ view, params }: HttpContext) {
    // busca um Song pelo id ou retorna um erro 404 caso não encontre
    const song = await Song.findOrFail(params.id)

    // renderiza a view Songs.show com o Song encontrado
    return view.render('pages/songs/show', { song })
  }

  // fazer em outro controller?
  // mostrar página de álbu
}
