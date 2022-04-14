import React from 'react'

function PatientInfo(props) {
  return (
    
        <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{props.heading}</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {props.info}
                    </td>
                  </tr>
    
  )
}

export default PatientInfo