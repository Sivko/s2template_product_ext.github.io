import axios from 'axios';

export default async function query(token, setError, setProductsData, id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/vnd.api+json'
    }
  };
  const product = await axios.get(`https://app.salesap.ru/api/v1/entity-products/${id}`, config).catch((e) => setError((prev) => [...prev, { id, type: 'product', data: e }]));
  if (!product) return;
  const deal = await axios.get(`https://app.salesap.ru/api/v1/entity-products/${id}/entity`, config).catch((e) => setError((prev) => [...prev, { id, type: 'entity', data: e }]));
  // return { product: product?.data?.data, deal: deal?.data?.data };
  setProductsData(prev => [...prev, { product: product?.data?.data, deal: deal?.data?.data ?? {} }])
}