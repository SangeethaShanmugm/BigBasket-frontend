import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../global'
import { Button } from 'antd'
import ReactToPrint, { useReactToPrint } from "react-to-print";

function Bill() {
    const componentRef = React.useRef(null);

    const [billData, setBillData] = useState([])
    const [selectedBills, setSelectedBills] = useState(null)

    const getAllBills = () => {
        axios.get(`${API}/bill/get-bill`)
            .then((res) => {
                console.log(res.data)
                const data = res.data
                setBillData(data)
            })
    }


    useEffect(() => {
        getAllBills()
    }, [])
    console.log(billData)



    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);


    return (
        <div>
            <h1>Bill Details</h1>
            <table className='table table-bordered' ref={componentRef}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>SubTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {billData.map((item) => {
                        return (
                            <tr>
                                <td>{item.customerName}</td>
                                <td>{item.customerPhoneNumber}</td>
                                <td>Rs. {item.subTotal}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <Button type="primary" onClick={handlePrint}>Print Bill</Button>

            {/* <ReactToPrint
                content={reactToPrintContent}
                documentTitle="AwesomeFileName"
                onAfterPrint={handleAfterPrint}
                onBeforeGetContent={handleOnBeforeGetContent}
                onBeforePrint={handleBeforePrint}
                removeAfterPrint
                trigger={reactToPrintTrigger}
            /> */}

        </div>
    )
}

export default Bill