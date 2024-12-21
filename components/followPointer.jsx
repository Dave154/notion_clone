import {motion} from 'framer-motion'
import stringToColor from "@/lib/stringToColor";

const FollowPointer = ({x,y,info}) => {
    const color = stringToColor(info.email || 1)
    return (
        <motion.div className='h-4 w-4 rounded-full absolute z-50'
                    style={{
                        top: y,
                        left: x,
                        pointerEvents: 'none'
                    }}
                    initial={{
                        scale: 1,
                        opacity: 1
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                    }}
                    exit={{
                        scale: 0,
                        opacity: 0,
                    }}
        >
            <svg
                stroke={color}
                fill={color}
                className={`h-6 w-6 text-[${color}] stroke-[${color}]`}
                xmlns="http://www.w3.org/2000/svg"
                x="0px" y="0px"
                width="100"
                height="100"
                viewBox="0 0 80 80">
                <path
                    d="M 22 8.734375 L 22 64.328125 L 36.34375 54.273438 L 45.605469 72.628906 L 54.722656 67.921875 L 45.140625 50.1875 L 63.054688 46.230469 L 61.632813 44.933594 Z M 24 13.265625 L 58.859375 45.109375 L 42.125 48.800781 L 51.996094 67.078125 L 46.480469 69.925781 L 37.089844 51.308594 L 24 60.484375 Z M 28 24 C 27.449219 24 27 24.449219 27 25 C 27 25.550781 27.449219 26 28 26 C 28.550781 26 29 25.550781 29 25 C 29 24.449219 28.550781 24 28 24 Z M 28 28 C 27.449219 28 27 28.449219 27 29 C 27 29.550781 27.449219 30 28 30 C 28.550781 30 29 29.550781 29 29 C 29 28.449219 28.550781 28 28 28 Z M 28 32 C 27.449219 32 27 32.449219 27 33 C 27 33.550781 27.449219 34 28 34 C 28.550781 34 29 33.550781 29 33 C 29 32.449219 28.550781 32 28 32 Z M 28 36 C 27.449219 36 27 36.449219 27 37 C 27 37.550781 27.449219 38 28 38 C 28.550781 38 29 37.550781 29 37 C 29 36.449219 28.550781 36 28 36 Z M 28 40 C 27.449219 40 27 40.449219 27 41 C 27 41.550781 27.449219 42 28 42 C 28.550781 42 29 41.550781 29 41 C 29 40.449219 28.550781 40 28 40 Z M 28 44 C 27.449219 44 27 44.449219 27 45 C 27 45.550781 27.449219 46 28 46 C 28.550781 46 29 45.550781 29 45 C 29 44.449219 28.550781 44 28 44 Z M 28 48 C 27.449219 48 27 48.449219 27 49 C 27 49.550781 27.449219 50 28 50 C 28.550781 50 29 49.550781 29 49 C 29 48.449219 28.550781 48 28 48 Z M 28 52 C 27.449219 52 27 52.449219 27 53 C 27 53.550781 27.449219 54 28 54 C 28.550781 54 29 53.550781 29 53 C 29 52.449219 28.550781 52 28 52 Z"></path>
            </svg>
            <motion.div
                className='px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full'
                style={{
                    backgroundColor:color,
                }}
                initial={{
                    scale: 0.5,
                    opacity: 0
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                exit={{
                    scale: 0.5,
                    opacity: 0,
                }}
            >
                {info.name || info.email}
            </motion.div>
        </motion.div>
    )
}
export default FollowPointer