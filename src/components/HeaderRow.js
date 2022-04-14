import React from 'react'

function HeaderRow() {
  return (
    <div>
        <div className="grid grid-cols-5 grid-rows-1 bg-gray-700 m-0.5 p-0.5 rounded-lg font-bold text-xl">
      <div className="m-0.5 px-1 bg-purple-100">Name</div>
      <div className="m-0.5 px-1 bg-purple-100">SpO2</div>
      <div className="m-0.5 px-1 bg-purple-100">Temperature</div>
      <div className="m-0.5 px-1 bg-purple-100">Heartbeat</div>
      <div className="m-0.5 px-1 bg-purple-100">Condition</div>
    </div>
    </div>
  )
}

export default HeaderRow