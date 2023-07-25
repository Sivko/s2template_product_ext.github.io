import './render.css';
import './index.css';
import { useEffect, useState } from 'react';
import query from './query';
import moment from 'moment';
import 'moment/locale/ru';
import ProgressBar from './ProgressBar';
moment.locale('ru')
export default function Render({ setRender, productsId, productsData, setProductsData }) {
  const [completed, setCompleted] = useState(0);
  const [error, setError] = useState([]);

  useEffect(() => {
    // setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);

    /* to PDF */
    function addScript(src) {
      var script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.head.appendChild(script);
    }
    addScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.js');
    document.getElementById('print').addEventListener('click', print)
    const opt = {
      margin: 0.5,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    function print() {
      // eslint-disable-next-line no-undef
      html2pdf()
        .set(opt)
        .from(document.getElementById('document'))
        .save();
    }

    /* End to PDF */

    setError([])
    setProductsData([]);
    const token = new URL(window.location.href).searchParams.get('token') ?? 'O0ApruzXzguScRieilPQnUOPgGnK0BHHvmNgZzit3_g';
    const fetching = (async () => {
      for (let i in productsId) {
        let x = i;
        const res = await query(token, setError, setProductsData, productsId[i])
        // setProductsData(prev => [...prev, res])
        setCompleted(Math.floor(((++x) / productsId.length) * 100))
        await new Promise(r => setTimeout(r, 1000))
      }
    })
    fetching()
  }, []);


  return <>
    <div className="instruments" style={{ opacity: completed < 100 ? 0 : 1 }}>
      <div onClick={() => setRender(false)}>Назад</div>
      <div id="print">Распечатать</div>
    </div>
    {completed < 100 && <ProgressBar bgcolor={"#015692"} completed={completed} />}
    {completed >= 100 && (<>
      <div id="errors" style={{ marginBottom: '20px' }}>
        {!!error.length && <div style={{ color: 'red', margin: '20px 0 10px' }}>Ошибки: </div>}
        {error.map(e => (<div key={Math.random()}>
          {/* {JSON.stringify(e)} */}
          <div>Тип: {e.type}</div>
          <div>ID: {e.id}</div>
          <div>Сообщение: {e.data.message}</div>
          {/* <hr /> */}
        </div>))}
      </div>
      <div id="document">
        {productsData.map(({ product, deal }) => (<div key={Math.random()}>
          <table class="table_one">
            <tbody>
              <tr>
                <td> <b>Дата запуска</b></td>
                <td class="col"> <b>{moment(product?.attributes?.customs['custom-83033'])?.format('DD MMMM YYYY')} </b></td>
              </tr>
              <tr>
                <td><b>Дата отгр. ПЛАН</b></td>
                <td class="col"><b>{moment(product?.attributes?.customs['custom-83036'])?.format('DD MMMM YYYY')}</b></td>
              </tr>
              <tr>
                <td><b>Название </b></td>
                <td class="col2"><b>{product?.attributes?.name} </b></td>
              </tr>
              <tr>
                <td>Описание</td>
                <td class="col2">{product?.attributes?.description ? product?.attributes?.description.replace(/<\/?[^>]+(>|$)/g, "") : ''}</td>
              </tr>
              <tr>
                <td>Кол-во</td>
                <td class="col1">{product?.attributes?.quantity}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table>
            <tbody>
              <tr>
                <td class="none">Статус</td>
                <td class="col2 none">{product?.attributes?.status}</td>
              </tr>
              <tr>
                <td class="none">Заметка для производства</td>
                <td class="col2 none">{product?.attributes?.customs['custom-117097']}</td>
              </tr>
              <tr>
                <td class="none">Объект</td>
                <td class="col2 none">{deal?.attributes?.name} №{deal?.attributes?.number}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table class="table_two">
            <tbody>
              <tr>
                <td>К-1: &nbsp; основ-1 | BR-профиль</td>
                <td class="col2">{product?.attributes?.customs['custom-108662']}</td>
              </tr>
              <tr>
                <td>К-2: &nbsp; основ-2 | BR-загл</td>
                <td class="col2">{product?.attributes?.customs['custom-108663']}</td>
              </tr>
              <tr>
                <td>К-3: &nbsp; Фил SHTA | BR-панель</td>
                <td class="col2">{product?.attributes?.customs['custom-108665']}</td>
              </tr>
              <tr>
                <td>К-4: &nbsp; Трубки | BR-стекло</td>
                <td class="col2">{product?.attributes?.customs['custom-111884']}</td>
              </tr>
              <tr>
                <td>К-5: &nbsp; Разное; BR-стойка</td>
                <td class="col2">{product?.attributes?.customs['custom-111885']}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table class="table_three">
            <tbody>

              <tr>
                <td>СТ-01: &nbsp; Корпуса прямоугольные</td>
                <td class="col2">{product?.attributes?.customs['custom-108664']}</td>
              </tr>
              <tr>
                <td>СТ-02: &nbsp; Корпуса приборов</td>
                <td class="col2">{product?.attributes?.customs['custom-112328']}</td>
              </tr>
              <tr>
                <td>СТ-03: &nbsp; Аморт. BORE</td>
                <td class="col">{product?.attributes?.customs['custom-114316']}</td>
              </tr>
              <tr>
                <td>СТ-04: &nbsp; BORE стойка</td>
                <td class="col">{product?.attributes?.customs['custom-114317']}</td>
              </tr>
              <tr>
                <td>СТ-05: &nbsp; BR-Кронштейны</td>
                <td class="col">{product?.attributes?.customs['custom-114318']}</td>
              </tr>
              <tr>
                <td>СТ-06: &nbsp; Переходники резьбы</td>
                <td class="col">{product?.attributes?.customs['custom-114319']}</td>
              </tr>
              <tr>
                <td>СТ-07: &nbsp; Болт М6х10</td>
                <td class="col">{product?.attributes?.customs['custom-114320']}</td>
              </tr>
              <tr>
                <td>СТ-08: &nbsp; Болт М6х16</td>
                <td class="col">{product?.attributes?.customs['custom-114321']}</td>
              </tr>
              <tr>
                <td>СТ-09: &nbsp; Винты все</td>
                <td class="col">{product?.attributes?.customs['custom-114322']}</td>
              </tr>
              <tr>
                <td>СТ-10: &nbsp; Гайки | Шайбы</td>
                <td class="col">{product?.attributes?.customs['custom-114323']}</td>
              </tr>
              <tr>
                <td>СТ-11: &nbsp; Другое</td>
                <td class="col">{product?.attributes?.customs['custom-114324']}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table class="table_four">
            <tbody>
              <tr>
                <td>ПУ-1: &nbsp; ГЛАВН</td>
                <td class="col">{product?.attributes?.customs['custom-114325']}</td>
              </tr>
              <tr>
                <td>ПУ-2: &nbsp; SENS HT | ПУ SENS-18V | ПУ BOR</td>
                <td class="col">{product?.attributes?.customs['custom-114326']}</td>
              </tr>
              <tr>
                <td>ПУ-3: &nbsp; SENS TC | ПУ SENS-30V | ПУ BOT</td>
                <td class="col">{product?.attributes?.customs['custom-114327']}</td>
              </tr>
              <tr>
                <td>ПУ-4: &nbsp; П/П BOTE</td>
                <td class="col">{product?.attributes?.customs['custom-114328']}</td>
              </tr>
              <tr>
                <td>ПУ-5: &nbsp; П/П BORE</td>
                <td class="col">{product?.attributes?.customs['custom-114329']}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table class="table_five">
            <tbody>
              <tr>
                <td>ЭЛ-01: &nbsp; Сенсор</td>
                <td class="col">{product?.attributes?.customs['custom-114330']}</td>
              </tr>
              <tr>
                <td>ЭЛ-02: &nbsp; Кабель 2-3-пров</td>
                <td class="col">{product?.attributes?.customs['custom-114331']}</td>
              </tr>
              <tr>
                <td>ЭЛ-03: &nbsp; Кабель 4-5-пров</td>
                <td class="col">{product?.attributes?.customs['custom-114332']}</td>
              </tr>
              <tr>
                <td>ЭЛ-04: &nbsp; Гермоввод М12 | Втулка кабеля</td>
                <td class="col">{product?.attributes?.customs['custom-114333']}</td>
              </tr>
              <tr>
                <td>ЭЛ-05: &nbsp; Гермоввод М16</td>
                <td class="col">{product?.attributes?.customs['custom-114334']}</td>
              </tr>
              <tr>
                <td>ЭЛ-06: &nbsp; Разъёмы</td>
                <td class="col">{product?.attributes?.customs['custom-114335']}</td>
              </tr>
              <tr>
                <td>ЭЛ-07: &nbsp; Разъём ряд PLS</td>
                <td class="col">{product?.attributes?.customs['custom-114336']}</td>
              </tr>
              <tr>
                <td>ЭЛ-08: &nbsp; Светодиод</td>
                <td class="col">{product?.attributes?.customs['custom-114337']}</td>
              </tr>
              <tr>
                <td>ЭЛ-09: &nbsp; R-подстр-1 |Клеммы</td>
                <td class="col">{product?.attributes?.customs['custom-114338']}</td>
              </tr>
              <tr>
                <td>ЭЛ-10: &nbsp; R-подстр-2 | Геркон СО2</td>
                <td class="col">{product?.attributes?.customs['custom-114339']}</td>
              </tr>
              <tr>
                <td>ЭЛ-11: &nbsp; Диод | Реле</td>
                <td class="col">{product?.attributes?.customs['custom-114340']}</td>
              </tr>
              <tr>
                <td>ЭЛ-12: &nbsp; Конденсатор CC</td>
                <td class="col">{product?.attributes?.customs['custom-114341']}</td>
              </tr>
              <tr>
                <td>ЭЛ-13: &nbsp; Резистор RC</td>
                <td class="col">{product?.attributes?.customs['custom-114342']}</td>
              </tr>
            </tbody>
          </table>


          <br />
          <table>
            <tbody>

              <tr>
                <td>ID</td>
                <td class="col">{product.id}</td>
              </tr>
            </tbody>
          </table>

          <br />
          <table className='tableFooter html2pdf__page-break'>
            <tbody>
              <tr>
                <td>{product?.attributes?.customs['custom-116884']}</td>
                <td>Подпись
                  <br />
                </td>
                <td>Дата
                  <br />
                </td>
                <td>Примечание
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  {product?.attributes?.customs['custom-116877']}
                </td>
                <td>
                  <br />
                </td>
                <td>
                </td>
                <td>
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  {product?.attributes?.customs['custom-116878']}
                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  {product?.attributes?.customs['custom-116879']}                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  {product?.attributes?.customs['custom-116880']}                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  {product?.attributes?.customs['custom-116881']}                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  {product?.attributes?.customs['custom-116882']}                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  {product?.attributes?.customs['custom-116883']}                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        ))}

        {/* {JSON.stringify(productsData)} */}
      </div>
    </>
    )}
  </>
}