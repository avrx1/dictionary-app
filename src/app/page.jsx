"use client"
import { useEffect, useRef, useState } from "react";
import { RiBook2Line } from "react-icons/ri";
import { HiOutlineMoon, HiRefresh } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { FaCaretRight } from "react-icons/fa";
const api_url = "https://api.dictionaryapi.dev/api/v2/entries/en"


const Home = () => {
  const audio = useRef(null)
  const currentWord = useRef(null)
  
  const [data, setData] = useState([])
  const [lightMode, setLightMode] = useState(false)
  
  useEffect(()=>{
      //document.documentElement.classList.add('dark');

      if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark").matches){
          document.documentElement.classList.add("dark")
          setLightMode(false)
      }

      fetch(`${api_url}/word`)
        .then(res => res.json())
        .then(d => {
          
        console.log(d)
        setData(d)
        }
      )
  }, [] )

  return (
    <div className="">
        <div className="max-w-[800px] mx-auto px-4">

            <nav className="w-full flex items-center justify-between h-16">
              <div>
                <RiBook2Line size={32} />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold mr-2">Serif</p>
                <div 
                  onClick={()=>{
                    setLightMode(p=>!p)
                    document.documentElement.classList.toggle("dark")
                  }}
                  className={`rounded-full w-10  h-5 bg-gray-500  dark:bg-[#A444EC] flex items-center 
                      px-[2px] ${lightMode ? "justify-start":"justify-end"}`}>
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <HiOutlineMoon size={20} />
              </div>
            </nav>

            <div className="bg-gray-400/20 w-full h-12 font-semibold
             rounded-full flex items-center px-4 justify-between gap-4 mt-4">
              <input ref={currentWord}  type="text" className="w-full py-1 outline-none bg-transparent" placeholder="Enter a word"/>
              <CiSearch size={20} className="cursor-pointer"
                onClick={() => {
                  console.log(`${api_url}/${currentWord.current.value}`)
                  fetch(`${api_url}/${currentWord.current.value}`)
                  .then(res => res.json())
                  .then(d => {
                    
                  setData(d)
                  }
                )

                }}
              />
            </div>

            {data && <div></div>}
            {data?.length > 0 && <div className="mt-8">
              <div className="flex justify-between mt-8 items-center ">
                <div><p className="text-4xl font-bold font-serif mb-2">{data[0].word}</p>
                <span className="text-[#A444EC]">{data[0].phonetic}</span>
                </div>
                <div className=" flex items-center justify-center rounded-full  w-14 h-14 bg-[#A444EC]/20 cursor-pointer"
                  onClick={() => {
                    audio.current.play()
                  }}
                >
                  <FaCaretRight size={32} className="ml-1" color={"#A444EC"}/>

                  <audio src={`https://api.dictionaryapi.dev/media/pronunciations/en/${currentWord.current.value}-us.mp3` }ref={audio}>

                  </audio>
                </div>
              </div>


                  
            {data[0].meanings.map(meaning => <div className="mt-16">
              <h3 className="font-serif font-semibold ">{meaning.partOfSpeech}
                  <hr className="float-left"/>
               </h3>

              <h4 className="opacity-70 my-4">Meaning</h4>
              <ul className="list-disc px-8">
                {meaning.definitions.slice(0, 5).map(definition => 
                  <li className="mt-2 marker:text-[0.7rem] marker:text-[#A444EC]">{definition.definition}
                      <br/>
                      {definition.example  && <q className="opacity-60">{definition.example}</q>}
                  </li>)}
              </ul>

              {meaning.synonyms.length > 0 && <div className="mt-4 flex gap-4">
                  <h3 className="opacity-60">Synonyms</h3>
                  <p className="font-semibold text-[#A444EC]">{meaning.synonyms[0]}</p>
                </div>}
            </div>)}

            <hr className="mt-8 mb-3"/>

            <div className="flex gap-3 mb-16">
              <p className="opacity-60">Source</p>
              <a href={data[0].sourceUrls[0]}>{data[0].sourceUrls[0]}</a>
            </div>   
          </div>}


        </div>
    </div>
  )
}

export default Home



