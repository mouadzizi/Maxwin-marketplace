import {db} from '../../API/firebase'

export const fitler = async(name,qte)=>{
    const data = db.collection('posts').limit(qte).where('category.item','==',name).get()

    return await Promise.all((await data).docs.map(d=>{
        return {
            ...d.data(),
            key:d.id
        }
    }))
}
