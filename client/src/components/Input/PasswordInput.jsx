import React, { useState } from 'react'
import { FaRegEye , FaRegEyeSlash} from "react-icons/fa";

const PasswordInput = ({value, onChange, placeholder}) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toogelPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
            <input
            value={value}
            onChange={onChange}
            placeholder={placeholder || "Password"}
            type={isShowPassword ? "text" : "password"}
            className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
            />
     {isShowPassword ?  
     <FaRegEyeSlash onClick={()=> toogelPassword()}
     size={22}
     className="text-primary cursor-pointer"/>
     :
     <FaRegEye onClick={()=> toogelPassword()}
     size={22}
     className="text-primary cursor-pointer"/>
     }

    </div>
  )
}

export default PasswordInput