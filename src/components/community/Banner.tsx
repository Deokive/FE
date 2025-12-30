import banner from "@/assets/images/banner.png";

interface BannerProps {
  image?: string;
}

const Banner = ({ image }: BannerProps) => {
  return (
    <div className="flex justify-center items-center w-full">
      {image && <img src={image} alt="banner" role="img" />}
      {!image && <img src={banner} alt="banner" role="img" />}
    </div>
  );
};

export default Banner;
