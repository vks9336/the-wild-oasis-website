import Spinner from '../_components/Spinner';

export default function Loading() {
  return (
    <div className=" grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-[#B7C7D7]">Loading cabin data...</p>
    </div>
  );
}
