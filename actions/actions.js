'use server';
import {auth} from "@/auth";
import {adminDb} from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";

export const createNewDocument = async()=>{
    const session = await auth()
   const user = session?.user
    if(!session || !session.user){
        return;

    }
    const docCollectionRef= adminDb.collection('documents')
    const docRef = await docCollectionRef.add({
        title:'New Doc'
    })
    await adminDb.
    collection('users').
    doc(user.email).
    collection('rooms').
    doc(docRef.id)
        .set({
            userId:user?.email,
            role:'owner',
            created_at:new Date(),
            roomId:docRef.id,
        })
    return {docId:docRef.id}
}


export async function deleteDocument(id) {
  try {
      await adminDb.collection('documents').doc(id).delete()
      const query = await adminDb
          .collectionGroup("rooms")
          .where("roomId", "==" , id)
          .get()

      const batch= adminDb.batch()
      query.docs.map(doc=> batch.delete(doc.ref))

      await batch.commit()
      await liveblocks.deleteRoom(id)

      return {success:true}
  }
  catch (err) {
      console.error(err)
      return {success:false}
  }
}

export async function inviteUserToRoom(id,email) {
    try {
        await adminDb.
        collection('users').
        doc(email).
        collection('rooms').
        doc(id)
            .set({
                userId:email,
                role:'editor',
                created_at:new Date(),
                roomId:id,
            })
        return {success:true}
    }catch (error) {
        console.error(error)
        return {success:false}
    }
}


export async function removeUserFromDocument(roomId,email) {

    try {
        await adminDb.collection('users')
            .doc(email)
            .collection('rooms')
            .doc(roomId)
            .delete()
        return {success:true}
    }catch (error){
        console.error(error)
        return {success:false}
    }
}








