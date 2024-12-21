import {BlockNoteView} from "@blocknote/shadcn";
import {BlockNoteEditor} from '@blocknote/core'
import {useCreateBlockNote} from '@blocknote/react'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/shadcn/style.css'
import {useSelf} from "@liveblocks/react/suspense";
import stringToColor from "@/lib/stringToColor";
const BlockNote = ({doc,provider,darkMode}) => {
    const userInfo =useSelf(me=>me.info)
    console.log(userInfo)
    const editor=  useCreateBlockNote({
        collaboration:{
            provider,
            fragment: doc.getXmlFragment('document-store'),
            user:{
                name:userInfo?.name,
                color:stringToColor(userInfo?.email)
            }
        }

    })
    return (
        <div className='relative mx-auto  max-w-6xl'>
            <BlockNoteView
                className='min-h-screen'
                editor={editor}
                theme={darkMode ? 'dark':'light'}
            />
        </div>
    )
}
export default BlockNote