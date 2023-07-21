import axios from 'axios';

export default async function query(setError, id) {
  const config = {
    headers: {
      Authorization: `Bearer JvGujjBL8OkQyY22lDSnUOotV5qh0TTpvev35MAbXZM`,
      'Content-Type': 'application/vnd.api+json'
    }
  };
  const res = axios.get(`https://app.salesap.ru/api/v1/entity-products/${id}`, config).catch((e) => setError((prev) => [...prev, { id, type: 'product', data: e }]));
  return res;
  
}