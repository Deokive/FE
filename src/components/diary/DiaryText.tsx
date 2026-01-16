import Image from "@/assets/images/diaryTextBackground.png";
import Image2 from "@/assets/images/diary_input.png";

type Props = {
  value: string;
  onChange: (value: string) => void;
};
const DiaryText = ({ value, onChange }: Props) => {
  return (
    <div
      className="w-310 h-310 relative"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "original",
        backgroundPosition: "top left",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute bottom-0 right-0">
        <img src={Image2} alt="diary_input" />
      </div>
    </div>
  );
};

export default DiaryText;
