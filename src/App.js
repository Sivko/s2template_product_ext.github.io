import { useEffect, useState } from 'react';
import Render from './Render';

function App() {

  const [stringId, setStringId] = useState('');
  const [productsId, setProductsId] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [render, setRender] = useState(false);

  function hendlerText(e) {
    setStringId(e.target.value.replaceAll('\n', ','))
    // setStringId(e.target.value)
  }

  useEffect(() => {
    const filterProducts = stringId;
    // const filterProducts = productsId;
    console.log(productsId, "filterProducts")
    setProductsId(filterProducts.split(',').filter((e) => !isNaN(e) && e !== ''));
  }, [stringId])


  return (
    <div className="App">
      <div className='container'>
        <h1>Access denied</h1>
        {/* {render === false && (
          <>
            <header className="App-header">
              <p>
                Введите ID вложенных продуктов
                <span style={{ fontSize: '10px' }}>(через запятую)</span>
              </p>
              <textarea style={{ width: '100%', height: '100px', margin: '0 auto' }} value={stringId} onChange={hendlerText}></textarea>
            </header>
            <main>
              <span>Указано {productsId ? productsId?.length : "0"} продуктов</span>
              <div className='button' onClick={() => setRender(true)}>Cформировать</div>
            </main>
          </>
        )}
        {render && <Render productsId={productsId} productsData={productsData}  setProductsData={setProductsData} setRender={setRender} />} */}
      </div>
    </div >
  );
}

export default App;
