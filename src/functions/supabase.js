import { createClient } from "@supabase/supabase-js"


const supabase = createClient(SUPABASE_URL,SUPABASE_ANON)


export const get_playlist = async (id) => {
    const {data, error} = await supabase
        .from('playlist')
        .select(`
            id,name,
            items:playlist_video (
                id,title,thumb,cda_id,p_order
            )
        `)
        .eq('id', id)

    if(error) return {'code':500, 'msg':"Internal Error", 'data':null}
    if(data.length !== 1) return {'code':404, 'msg':"Not Found", 'data':null}
    return {'code':200, 'msg':"ok", 'data': data[0]}
}