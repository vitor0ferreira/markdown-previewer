'use client'
import { useEffect, useState } from "react";
import { marked } from "marked";
import { HiArrowsPointingIn } from "react-icons/hi2";
import { RiCodeBoxFill, RiDragMove2Fill, RiFileList3Fill } from "react-icons/ri";

export default function Home() {

  marked.use({
    breaks: true,
  })

  const [fullsizeSettings, setFullsizeSettings] = useState({
    editorIsFullsize: false,
    showEditor: true,
    previewIsFullsize: false,
    showPreview: true,
  })
  
  const [textAreaContent, setTextAreaContent] = useState<string>( )

  const editorSetting = fullsizeSettings.editorIsFullsize ? 'min-h-screen' : 'h-[260px]'
  const showEditor = fullsizeSettings.showEditor ? 'flex' : 'hidden'
  const previewSetting = fullsizeSettings.previewIsFullsize ? 'min-h-screen' : 'min-h-[800px]'
  const showPreview = fullsizeSettings.showPreview ? 'flex' : 'hidden'

  useEffect(()=>{

    async function updatePreview ( ) {
      const previewContent = document.getElementById('preview')
      const lexerContent = textAreaContent ? marked.lexer(textAreaContent) : ''
      if(previewContent)
      previewContent.innerHTML = lexerContent ? marked.parser(lexerContent) : ''
      console.log(previewContent?.innerHTML)
    }

    updatePreview()

  },[textAreaContent])
  

  

  return (
    <main className="min-h-screen h-max p-4 bg-lime-200 flex flex-col gap-6 items-center">

      <section className={`${showEditor} flex-col border-[1px] border-black bg-green-100 shadow-[0px_0px_15px_5px_rgba(0,0,0,0.3)]`}>
        <header className="bg-teal-600 w-full py-2 px-4 flex justify-between items-center border-b-[1px] border-black shadow-[0px_2px_8px_2px_rgba(0,0,0,0.3)]">
          <span className="flex items-center gap-1 font-semibold text-lg">
            <RiCodeBoxFill size={28}/>
            Editor
          </span>
          <button  
            onClick={()=>setFullsizeSettings({
              ...fullsizeSettings,
              showPreview: !fullsizeSettings.showPreview,
              editorIsFullsize: !fullsizeSettings.editorIsFullsize,
            })}
            className="size-fit hover:invert"
          >
            {fullsizeSettings.editorIsFullsize ? 
              (<HiArrowsPointingIn size={28} rotate={60} color="rgb(8, 13, 103)" />) : (<RiDragMove2Fill size={28} rotate={60} color="rgb(8, 13, 103)"  className="rotate-45"/>)
            }
          </button>
        </header>
        <textarea id="editor" defaultValue={textAreaContent} onKeyUp={(e)=>{setTextAreaContent(e.currentTarget.value)}}  className={`min-h-[220px] ${editorSetting} w-[600px] border-[1px] border-black bg-green-100 p-2 focus-within:outline-none text-black text-base shadow-[0px_0px_15px_5px_rgba(0,0,0,0.3)]`}>
            
        </textarea>
      </section>

      <section className={`w-[800px] ${showPreview} flex-col border-[1px] border-black bg-green-100 shadow-[0px_0px_15px_5px_rgba(0,0,0,0.3)]`} >

        <header className="bg-teal-600 w-full py-2 px-4 flex justify-between items-center border-b-[1px] border-black shadow-[0px_2px_8px_2px_rgba(0,0,0,0.3)]">
          <span className="flex items-center gap-2 font-bold text-xl">
            <RiFileList3Fill size={24}/>
            Previewer
          </span>
          <button  
            onClick={()=>setFullsizeSettings({
              ...fullsizeSettings,
              showEditor: !fullsizeSettings.showEditor,
              previewIsFullsize: !fullsizeSettings.previewIsFullsize,
            })}
          className="size-fit hover:invert"
          >
            {fullsizeSettings.previewIsFullsize ? 
              (<HiArrowsPointingIn size={28} rotate={60} color="rgb(8, 13, 103)" />) : (<RiDragMove2Fill size={28} rotate={60} color="rgb(8, 13, 103)"  className="rotate-45"/>)
            }
          </button>
        </header>
        
        <article id="preview" className={`flex-1 flex-col items-center p-2 ${previewSetting} text-black px-4`}>
          
        </article>
      </section>

    </main>
  );
}
