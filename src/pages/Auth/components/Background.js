import video from '../../../videos/MiamiBeach.mp4'

const Background = () => {
  return (
    <div className='bg-black w-[1920px] h-[1080px] fixed top-0 -z-50'>
      <video className='opacity-50' autoPlay loop muted>
        <source src={video} type="video/mp4"/>
      </video>
    </div>
  );
};

export default Background;
