import './render.css';
import './index.css';
import { useEffect, useState } from 'react';
import query from './query';


export default function Render({ setRender, productsId, productsData, setProductsData }) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState([]);

  useEffect(() => {
    setError([])
    setProductsData([])
    const fetching = (async () => {
      const res = await query(setError, '26851059')
      setProductsData(prev => [...prev, res])
    })
    fetching()
  }, [])

  return <>
    <div className="instruments">
      <div onClick={() => setRender(false)}>Назад</div>
      <div onClick={() => window.print()}>Распечатать</div>
    </div >
    <div id="errors">
      {error.length && <div style={{ color: 'red', margin: '20px 0 10px' }}>Ошибки: </div>}
      {error.map(e => (<>
        {/* {JSON.stringify(e)} */}
        <div>Тип: {e.type}</div>
        <div>ID: {e.id}</div>
        <div>Сообщение: {e.data.message}</div>
        {/* <hr /> */}
      </>))}
    </div>
    <div id="document">
      {productsData.map(e=> (<>
        название: {e.data.dataname} 
        </>
      ))}
        {JSON.stringify(productsData)}
    </div>
  </>
}