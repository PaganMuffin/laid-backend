import { createClient } from '@supabase/supabase-js'

const workers_anon = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZGZlNGQ3Zi03NGMxLTQyZGEtYTgwNi0xMjQ0MTA5ZTdlZTQiLCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTYyODQyMzg3NCwiZXhwIjoxOTQzOTk5ODc0fQ.nEv_Uma2uN3QSAj7UkUa_49hTHrtpHBVlgGFHpeEvDA`

export const get_playlist = async (id, ctx) => {
    supabase.auth.setAuth(workers_anon)

    const supabase = createClient(ctx.env.SUPABASE_URL, ctx.env.SUPABASE_ANON)

    let { data, error } = await supabase
        .from('playlist')
        .select(
            `
            id,name,
            items:playlist_video (
                id,title,thumb,cda_id,p_order, author
            )
        `,
        )
        .eq('id', id)

    if (error) return { code: 500, msg: 'Internal Error', data: null }
    if (data.length !== 1) return { code: 404, msg: 'Not Found', data: null }
    data[0].items = data[0].items.sort((a, b) => a.p_order - b.p_order)
    return { code: 200, msg: 'ok', data: data[0] }
}
