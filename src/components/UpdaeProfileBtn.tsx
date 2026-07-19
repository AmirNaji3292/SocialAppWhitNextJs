"use client"

import { useFormStatus } from "react-dom"

function UpdaeProfileBtn() {
    const {pending}=useFormStatus()

  return (
    <div>
        <button className="bg-blue-500 p-2 mt-2 text-white disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={pending}>
            {pending?"Updating...":"Update"}
        </button>
    </div>
  )
}

export default UpdaeProfileBtn