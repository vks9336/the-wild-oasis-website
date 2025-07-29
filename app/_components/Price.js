import { getCabinPrice } from '@/app/_lib/data-service';

async function Price({ cabinId }) {
  const { regularPrice, discount } = await getCabinPrice(cabinId);

  return (
    <p className='mt-12 text-3xl flex gap-3 items-baseline'>
      {discount > 0 ? (
        <>
          <span className='text-3xl font-[350]'>
            ${regularPrice - discount}
          </span>
          <span className='line-through font-semibold text-[#4C6B8A]'>
            ${regularPrice}
          </span>
        </>
      ) : (
        <span className='text-3xl font-[350]'>${regularPrice}</span>
      )}
      <span className='text-[#B7C7D7]'>/ night</span>
    </p>
  );
}

export default Price;
